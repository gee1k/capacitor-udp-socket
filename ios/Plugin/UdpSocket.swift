import Foundation

@objc public class UdpSocket: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
