package com.svend.plugins.udp.socket;

import android.util.Log;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.MulticastSocket;
import java.net.NetworkInterface;
import java.net.SocketAddress;
import java.net.SocketException;
import java.net.StandardSocketOptions;
import java.nio.ByteBuffer;
import java.nio.channels.DatagramChannel;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import org.json.JSONException;

interface ReceiveCallback {
    void receive(byte[] data, int socketId, String address, int port);

    void receiveError(int code, String message);
}

public class UdpSocket {

    private static final String LOG_TAG = "CapacitorUdpPlugin";
    private final int socketId;
    private final DatagramChannel channel;
    private final BlockingQueue<UdpSendPacket> sendPackets = new LinkedBlockingQueue<>();
    private final Set<String> multicastGroups = new HashSet<>();
    public boolean isBound;
    public InetAddress ipv4Address;
    public InetAddress ipv6Address;
    private MulticastSocket multicastSocket;
    private SelectionKey key;
    private boolean paused;
    private DatagramPacket pausedMulticastPacket;
    private String name;
    private int bufferSize;
    private MulticastReadThread multicastReadThread;
    private boolean multicastLoopback;
    private final NetworkInterface networkInterface;

    private ReceiveCallback receiveCallback;

    UdpSocket(int socketId, JSObject properties) throws JSONException, IOException {
        this.socketId = socketId;
        this.ipv4Address = Utils.getIPAddress(true);
        this.ipv6Address = Utils.getIPAddress(false);
        this.networkInterface = Utils.getNetworkInterface();
        channel = DatagramChannel.open();
        channel.configureBlocking(false);
        channel.setOption(StandardSocketOptions.IP_MULTICAST_IF, this.networkInterface);
        multicastSocket = null;

        // set socket default options
        paused = false;
        bufferSize = 4096;
        name = "";

        multicastReadThread = null;
        multicastLoopback = true;

        isBound = false;

        setProperties(properties);
        setBufferSize();
    }

    public void setReceiveCallback(ReceiveCallback callback) {
        this.receiveCallback = callback;
    }

    // Only call this method on selector thread
    void addInterestSet(int interestSet) {
        if (key != null && key.isValid()) {
            key.interestOps(key.interestOps() | interestSet);
            key.selector().wakeup();
        }
    }

    // Only call this method on selector thread
    void removeInterestSet(int interestSet) {
        if (key != null && key.isValid()) {
            key.interestOps(key.interestOps() & ~interestSet);
            key.selector().wakeup();
        }
    }

    int getSocketId() {
        return socketId;
    }

    void register(Selector selector, int interestSets) throws IOException {
        key = channel.register(selector, interestSets, this);
    }

    void setProperties(JSObject properties) throws JSONException, SocketException {
        if (!properties.isNull("name")) name = properties.getString("name");

        if (!properties.isNull("bufferSize")) {
            bufferSize = properties.getInt("bufferSize");
            setBufferSize();
        }
    }

    void setBufferSize() throws SocketException {
        channel.socket().setSendBufferSize(bufferSize);
        channel.socket().setReceiveBufferSize(bufferSize);
    }

    private void sendMulticastPacket(DatagramPacket packet) {
        byte[] out = packet.getData();

        // Truncate the buffer if the message was shorter than it.
        if (packet.getLength() != out.length) {
            byte[] temp = new byte[packet.getLength()];
            if (packet.getLength() >= 0) System.arraycopy(out, 0, temp, 0, packet.getLength());
            out = temp;
        }

        if (this.receiveCallback != null) {
            this.receiveCallback.receive(out, socketId, packet.getAddress().getHostAddress(), packet.getPort());
        }
    }

    private void bindMulticastSocket() throws SocketException {
        multicastSocket.bind(new InetSocketAddress(channel.socket().getLocalPort()));

        if (!paused) {
            multicastReadThread = new MulticastReadThread(multicastSocket, this);
            multicastReadThread.start();
        }
    }

    // Upgrade the normal datagram socket to multicast socket. All incoming
    // packet will be received on the multicast read thread. There is no way to
    // downgrade the same socket back to a normal datagram socket.
    private void upgradeToMulticastSocket() throws IOException {
        if (multicastSocket == null) {
            multicastSocket = new MulticastSocket(null);
            multicastSocket.setReuseAddress(true);
            multicastSocket.setLoopbackMode(false);

            if (channel.socket().isBound()) {
                bindMulticastSocket();
            }
        }
    }

    private void resumeMulticastSocket() {
        if (pausedMulticastPacket != null) {
            sendMulticastPacket(pausedMulticastPacket);
            pausedMulticastPacket = null;
        }

        if (multicastSocket != null && multicastReadThread == null) {
            multicastReadThread = new MulticastReadThread(multicastSocket, this);
            multicastReadThread.start();
        }
    }

    void setPaused(boolean paused) {
        this.paused = paused;
        if (!this.paused) {
            resumeMulticastSocket();
        }
    }

    void addSendPacket(String address, int port, byte[] data, PluginCall call) throws InterruptedException {
        UdpSendPacket sendPacket = new UdpSendPacket(address, port, data, call);
        sendPackets.put(sendPacket);
    }

    void bind(String address, int port) throws SocketException {
        channel.socket().setReuseAddress(true);
        channel.socket().bind(new InetSocketAddress(port));

        if (multicastSocket != null) {
            bindMulticastSocket();
        }
    }

    // This method can be only called by selector thread.
    void dequeueSend() {
        if (sendPackets.peek() == null) {
            removeInterestSet(SelectionKey.OP_WRITE);
            return;
        }

        UdpSendPacket sendPacket = null;
        try {
            sendPacket = sendPackets.take();
            JSObject ret = new JSObject();
            int bytesSent = channel.send(sendPacket.data, sendPacket.address);
            ret.put("bytesSent", bytesSent);
            if (sendPacket.call != null) sendPacket.call.resolve(ret);
        } catch (InterruptedException ignored) {} catch (IOException e) {
            if (sendPacket.call != null) sendPacket.call.reject(e.getMessage());
        }
    }

    void close() throws IOException {
        if (key != null && channel.isRegistered()) key.cancel();

        channel.close();

        if (multicastSocket != null) {
            multicastSocket.close();
            multicastSocket = null;
        }

        if (multicastReadThread != null) {
            multicastReadThread.cancel();
            multicastReadThread = null;
        }
    }

    JSObject getInfo() {
        JSObject info = new JSObject();
        info.put("socketId", socketId);
        info.put("bufferSize", bufferSize);
        info.put("name", name);
        info.put("paused", paused);
        if (channel.socket().getLocalAddress() != null) {
            info.put("localAddress", channel.socket().getLocalAddress().getHostAddress());
            info.put("localPort", channel.socket().getLocalPort());
        }
        return info;
    }

    void joinGroup(String address) throws IOException {
        upgradeToMulticastSocket();

        if (multicastGroups.contains(address)) {
            Log.e(LOG_TAG, "Attempted to join an already joined multicast group.");
            return;
        }

        multicastGroups.add(address);
        multicastSocket.joinGroup(new InetSocketAddress(InetAddress.getByName(address), channel.socket().getLocalPort()), networkInterface);
    }

    void leaveGroup(String address) throws IOException {
        if (multicastGroups.contains(address)) {
            multicastGroups.remove(address);
            multicastSocket.leaveGroup(InetAddress.getByName(address));
        }
    }

    void setMulticastTimeToLive(int ttl) throws IOException {
        upgradeToMulticastSocket();
        multicastSocket.setTimeToLive(ttl);
    }

    void setMulticastLoopbackMode(boolean enabled, PluginCall call) throws IOException {
        upgradeToMulticastSocket();
        multicastSocket.setLoopbackMode(!enabled);
        multicastLoopback = enabled;
        JSObject ret = new JSObject();
        ret.put("enabled", !multicastSocket.getLoopbackMode());
        call.resolve(ret);
    }

    void setBroadcast(boolean enabled) throws IOException {
        channel.socket().setBroadcast(enabled);
    }

    public Collection<String> getJoinedGroups() {
        return multicastGroups;
    }

    // This method can be only called by selector thread.
    void read() {
        if (paused) {
            // Remove read interests to avoid seletor wakeup when readable.
            removeInterestSet(SelectionKey.OP_READ);
            return;
        }

        ByteBuffer recvBuffer = ByteBuffer.allocate(bufferSize);
        recvBuffer.clear();

        try {
            InetSocketAddress address = (InetSocketAddress) channel.receive(recvBuffer);

            recvBuffer.flip();
            byte[] recvBytes = new byte[recvBuffer.limit()];
            recvBuffer.get(recvBytes);
            if (Objects.requireNonNull(address.getAddress().getHostAddress()).contains(":") && multicastSocket != null) {
                return;
            }
            if (this.receiveCallback != null) {
                this.receiveCallback.receive(recvBytes, socketId, address.getAddress().getHostAddress(), address.getPort());
            }
        } catch (IOException e) {
            if (this.receiveCallback != null) {
                this.receiveCallback.receiveError(-2, e.getMessage());
            }
        }
    }

    private static class UdpSendPacket {

        final SocketAddress address;
        final PluginCall call;
        final ByteBuffer data;

        UdpSendPacket(String address, int port, byte[] data, PluginCall call) {
            this.address = new InetSocketAddress(address, port);
            this.data = ByteBuffer.wrap(data);
            this.call = call;
        }
    }

    private class MulticastReadThread extends Thread {

        private final MulticastSocket socket;

        private final UdpSocket udpSocket;

        MulticastReadThread(MulticastSocket socket, UdpSocket udpSocket) {
            this.socket = socket;
            this.udpSocket = udpSocket;
        }

        public void run() {
            while (!Thread.currentThread().isInterrupted()) {
                if (paused) {
                    // Terminate the thread if the socket is paused
                    multicastReadThread = null;
                    return;
                }
                try {
                    byte[] out = new byte[socket.getReceiveBufferSize()];
                    DatagramPacket packet = new DatagramPacket(out, out.length);
                    socket.receive(packet);
                    if (!multicastLoopback) {
                        String fromAddress = packet.getAddress().getHostAddress();
                        String ip4 = ipv4Address.getHostAddress();
                        String ip6 = ipv6Address.getHostAddress();

                        assert fromAddress != null;
                        if (fromAddress.equalsIgnoreCase(ip4) || fromAddress.equalsIgnoreCase(ip6)) {
                            continue;
                        }
                    }
                    if (paused) {
                        pausedMulticastPacket = packet;
                    } else {
                        sendMulticastPacket(packet);
                    }
                } catch (IOException e) {
                    if (this.udpSocket.receiveCallback != null) {
                        this.udpSocket.receiveCallback.receiveError(-2, e.getMessage());
                    }
                }
            }
        }

        public void cancel() {
            interrupt();
        }
    }
}
