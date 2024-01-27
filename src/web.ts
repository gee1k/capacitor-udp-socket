import { WebPlugin } from '@capacitor/core';

import type { UdpSocketPlugin } from './definitions';

export class UdpSocketWeb extends WebPlugin implements UdpSocketPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
