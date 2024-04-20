import type { PluginListenerHandle } from '@capacitor/core';
import { WebPlugin } from '@capacitor/core';

import type {
  BindOptions,
  CloseOptions,
  CreateOptions,
  CreateResult,
  GetJoinedGroupsResult,
  GetSocketsResult,
  InfoOptions,
  InfoResult,
  JoinGroupOptions,
  LeaveGroupOptions,
  ReceiveEvent,
  SendOptions,
  SendResult,
  SetBroadcastOptions,
  SetMulticastLoopbackModeOptions,
  SetMulticastTimeToLiveOptions,
  SetPausedOptions,
  UdpSocketPlugin,
  UpdateOptions,
} from './definitions';

export class UdpSocketWeb extends WebPlugin implements UdpSocketPlugin {
  async create(options?: CreateOptions): Promise<CreateResult> {
    console.log('create', options);
    throw new Error('Method not implemented.');
  }
  async update(options: UpdateOptions): Promise<void> {
    console.log('update', options);
    throw new Error('Method not implemented.');
  }
  async setPaused(options: SetPausedOptions): Promise<void> {
    console.log('setPaused', options);
    throw new Error('Method not implemented.');
  }
  async bind(options: BindOptions): Promise<void> {
    console.log('bind', options);
    throw new Error('Method not implemented.');
  }
  async send(options: SendOptions): Promise<SendResult> {
    console.log('send', options);
    throw new Error('Method not implemented.');
  }
  async closeAllSockets(): Promise<void> {
    console.log('closeAllSockets');
    throw new Error('Method not implemented.');
  }
  async close(options: CloseOptions): Promise<void> {
    console.log('close', options);
    throw new Error('Method not implemented.');
  }
  async getInfo(options: InfoOptions): Promise<InfoResult> {
    console.log('getInfo', options);
    throw new Error('Method not implemented.');
  }
  async getSockets(): Promise<GetSocketsResult> {
    console.log('getSockets');
    throw new Error('Method not implemented.');
  }
  async joinGroup(options: JoinGroupOptions): Promise<void> {
    console.log('joinGroup', options);
    throw new Error('Method not implemented.');
  }
  async leaveGroup(options: LeaveGroupOptions): Promise<void> {
    console.log('leaveGroup', options);
    throw new Error('Method not implemented.');
  }
  async setMulticastTimeToLive(
    options: SetMulticastTimeToLiveOptions,
  ): Promise<void> {
    console.log('setMulticastTimeToLive', options);
    throw new Error('Method not implemented.');
  }
  async setBroadcast(options: SetBroadcastOptions): Promise<void> {
    console.log('setBroadcast', options);
    throw new Error('Method not implemented.');
  }
  async setMulticastLoopbackMode(
    options: SetMulticastLoopbackModeOptions,
  ): Promise<void> {
    console.log('setMulticastLoopbackMode', options);
    throw new Error('Method not implemented.');
  }
  async getJoinedGroups(): Promise<GetJoinedGroupsResult> {
    console.log('getJoinedGroups');
    throw new Error('Method not implemented.');
  }

  addListener(
    eventName: 'receive' | 'receiveError',
    listenerFunc: (event: ReceiveEvent) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    console.log('addListener', eventName, listenerFunc);
    throw new Error('Method not implemented.');
  }
}
