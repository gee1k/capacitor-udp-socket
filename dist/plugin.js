var capacitorUdpSocket = (function (exports, core) {
    'use strict';

    const UdpSocket = core.registerPlugin('UdpSocket', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.UdpSocketWeb()),
    });

    class UdpSocketWeb extends core.WebPlugin {
        create(options) {
            console.log('create', options);
            return Promise.reject('Method not implemented in web');
        }
        update(options) {
            console.log('update', options);
            return Promise.reject('Method not implemented in web');
        }
        setPaused(options) {
            console.log('setPaused', options);
            return Promise.reject('Method not implemented in web');
        }
        bind(options) {
            console.log('bind', options);
            return Promise.reject('Method not implemented in web');
        }
        send(options) {
            console.log('send', options);
            return Promise.reject('Method not implemented in web');
        }
        closeAllSockets() {
            console.log('closeAllSockets');
            return Promise.reject('Method not implemented in web');
        }
        close(options) {
            console.log('close', options);
            return Promise.reject('Method not implemented in web');
        }
        getInfo(options) {
            console.log('getInfo', options);
            return Promise.reject('Method not implemented in web');
        }
        getSockets() {
            console.log('getSockets');
            return Promise.reject('Method not implemented in web');
        }
        joinGroup(options) {
            console.log('joinGroup', options);
            return Promise.reject('Method not implemented in web');
        }
        leaveGroup(options) {
            console.log('leaveGroup', options);
            return Promise.reject('Method not implemented in web');
        }
        setMulticastTimeToLive(options) {
            console.log('setMulticastTimeToLive', options);
            return Promise.reject('Method not implemented in web');
        }
        setBroadcast(options) {
            console.log('setBroadcast', options);
            return Promise.reject('Method not implemented in web');
        }
        setMulticastLoopbackMode(options) {
            console.log('setMulticastLoopbackMode', options);
            return Promise.reject('Method not implemented in web');
        }
        getJoinedGroups() {
            console.log('getJoinedGroups');
            return Promise.reject('Method not implemented in web');
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        UdpSocketWeb: UdpSocketWeb
    });

    exports.UdpSocket = UdpSocket;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
