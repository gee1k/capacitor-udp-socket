import Foundation
import CocoaAsyncSocket

typealias onReceivedHandlerHandler = (_ data: [String: Any]) -> Void

@objc public class UdpSocket: NSObject {
    let socketId: Int

    var name: String
    var bufferSize: NSNumber
    var paused: Bool
    var socket: GCDAsyncUdpSocket?

    var broadcastEnabled: Bool
    var isBound: Bool
    var multicastGroup: Set<String>

    var onReceivedHandler: onReceivedHandlerHandler?
    var onReceivedErrorHandler: onReceivedHandlerHandler?

    init(id: Int, properties: [String: Any]?) {
        self.socketId = id
        self.bufferSize = 4096
        self.name = ""
        self.paused = false
        self.multicastGroup = Set<String>()
        self.broadcastEnabled = false
        self.isBound = false

        super.init()

        self.socket = GCDAsyncUdpSocket.init(delegate: self, delegateQueue: DispatchQueue.main)

        try? self.socket?.enableBroadcast(false)
        try? self.socket?.enableReusePort(true)

        self.setProperties(properties ?? [String: Any]())
    }

    public func getInfo() -> [String: Any] {
        let localAddress = socket?.localHost()
        let localPort = socket?.localPort()
        var socketInfo: [String: Any] = ["socketId": socketId, "name": name, "bufferSize": bufferSize, "paused": paused]
        if localAddress != nil {
            socketInfo["localAddress"] =  localAddress
            socketInfo["localPort"]  = localPort
        }
        return socketInfo
    }

    public func setProperties(_ properties: [String: Any]) {
        name = properties["name"] as? String ?? name
        bufferSize = properties["bufferSize"] as? NSNumber ?? bufferSize
        if bufferSize.intValue > UINT16_MAX {
            socket?.setMaxSendBufferSize(UInt16.max)
        } else {
            socket?.setMaxSendBufferSize(bufferSize.uint16Value)
        }

        if socket?.isIPv4() ?? false {
            if bufferSize.intValue > UINT16_MAX {
                socket?.setMaxReceiveIPv4BufferSize(UInt16.max)
            } else {
                socket?.setMaxReceiveIPv4BufferSize(bufferSize.uint16Value)
            }
        }

        if socket?.isIPv6() ?? false {
            if bufferSize.intValue > UINT32_MAX {
                socket?.setMaxReceiveIPv6BufferSize(UInt32.max)
            } else {
                socket?.setMaxReceiveIPv6BufferSize(bufferSize.uint32Value)
            }
        }
    }

    public func setPaused(_ paused: Bool) {
        self.paused = paused
        if paused {
            socket?.pauseReceiving()
        } else {
            try? socket?.beginReceiving()
        }
    }

    public func bind(_ port: Int, address: String?) throws {
        var addr = address?.trimmingCharacters(in: .whitespacesAndNewlines) ?? nil
        if (addr?.isEmpty ?? false) || addr == "0.0.0.0" {
            addr = nil
        }

        try socket?.bind(toPort: UInt16(port), interface: addr )

        if !paused {
            try socket?.beginReceiving()
        }

        isBound = true
    }

    public func send(_ data: Data, address: String, port: Int) throws {
        var address = address.trimmingCharacters(in: .whitespacesAndNewlines)

        if port < 0 || address.isEmpty {
            throw SocketsError.Error("Invalid Argument")
        }

        if !isBound {
            throw SocketsError.Error("Not bound yet")
        }

        if !broadcastEnabled && address == "255.255.255.255" {
            throw SocketsError.Error("Broadcast not allowed")
        }

        if address.contains(":") && !address.contains("%") {
            address = address + "%en0"
        }
        socket?.send(data, toHost: address, port: UInt16(port), withTimeout: -1, tag: -1)
    }

    public func setBroadcast(_ enabled: Bool) throws {
        try socket?.enableBroadcast(enabled)
        broadcastEnabled = enabled
    }

    public func joinGroup(_ address: String) throws {
        if multicastGroup.contains(address) {
            throw SocketsError.Error("Already bound")
        }
        do {
            try socket?.joinMulticastGroup(address, onInterface: "en0")
            multicastGroup.insert(address)
        } catch {
            throw SocketsError.Error("joinGroup error")
        }
    }

    public func leaveGroup(_ address: String) throws {
        if !multicastGroup.contains(address) {
            return
        }
        do {
            try socket?.leaveMulticastGroup(address, onInterface: "en0")
            multicastGroup.remove(address )
        } catch {
            throw SocketsError.Error("joinGroup error")
        }

    }

    public func closeSocket() {
        let isClosed = socket?.isClosed() ?? true
        if !isClosed {
            socket?.closeAfterSending()
        }
    }
}

// delegate
extension UdpSocket: GCDAsyncUdpSocketDelegate {

    public func udpSocket(_ sock: GCDAsyncUdpSocket, didReceive data: Data, fromAddress address: Data, withFilterContext filterContext: Any?) {
        var ret = [String: Any]()
        ret["socketId"] = self.socketId
        ret["remoteAddress"] = GCDAsyncUdpSocket.host(fromAddress: address)
        ret["remotePort"] = GCDAsyncUdpSocket.port(fromAddress: address)
        ret["buffer"] = data.base64EncodedString()

        onReceivedHandler?(ret)
    }

    public func udpSocketDidClose(_ sock: GCDAsyncUdpSocket, withError error: Error?) {
        var ret = [String: Any]()
        ret["socketId"] = self.socketId
        ret["error"] = error?.localizedDescription ?? "socket closed"

        onReceivedErrorHandler?(ret)
    }
}
