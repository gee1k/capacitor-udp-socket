package com.svend.plugins.udp.socket;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;

public class Utils {

    public static NetworkInterface getNetworkInterface() {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                if (addrs.size() < 2) continue;
                if (addrs.get(0).isLoopbackAddress()) continue;
                return intf;
            }
        } catch (Exception ignored) {} // for now eat exceptions
        return null;
    }

    public static InetAddress getIPAddress(boolean useIPv4) {
        try {
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                if (addrs.size() < 2) continue;
                for (InetAddress addr : addrs) {
                    if (!addr.isLoopbackAddress()) {
                        String sAddr = addr.getHostAddress();
                        boolean isIPv4 = sAddr.indexOf(':') < 0;
                        if (useIPv4) {
                            if (isIPv4) return addr;
                        } else {
                            if (!isIPv4) {
                                return addr;
                            }
                        }
                    }
                }
            }
        } catch (Exception ignored) {} // for now eat exceptions
        return InetAddress.getLoopbackAddress();
    }
}
