import { registerPlugin } from '@capacitor/core';

import type { UdpSocketPlugin } from './definitions';

const UdpSocket = registerPlugin<UdpSocketPlugin>('UdpSocket', {
  web: () => import('./web').then(m => new m.UdpSocketWeb()),
});

export * from './definitions';
export { UdpSocket };
