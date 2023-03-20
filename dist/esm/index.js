import { registerPlugin } from '@capacitor/core';
const UdpSocket = registerPlugin('UdpSocket', {
    web: () => import('./web').then(m => new m.UdpSocketWeb()),
});
export * from './definitions';
export { UdpSocket };
//# sourceMappingURL=index.js.map