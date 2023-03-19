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
  SendOptions,
  SetBroadcastOptions,
  SetMulticastLoopbackModeOptions,
  SetMulticastTimeToLiveOptions,
  SetPausedOptions,
  UdpSocketPlugin,
  UpdateOptions,
} from './definitions';

export class UdpSocketWeb extends WebPlugin implements UdpSocketPlugin {
  create(options?: CreateOptions): Promise<CreateResult> {
    console.log('create', options);
    return Promise.reject('Method not implemented in web');
  }
  update(options: UpdateOptions): Promise<void> {
    console.log('update', options);
    return Promise.reject('Method not implemented in web');
  }
  setPaused(options: SetPausedOptions): Promise<void> {
    console.log('setPaused', options);
    return Promise.reject('Method not implemented in web');
  }
  bind(options: BindOptions): Promise<void> {
    console.log('bind', options);
    return Promise.reject('Method not implemented in web');
  }
  send(options: SendOptions): Promise<void> {
    console.log('send', options);
    return Promise.reject('Method not implemented in web');
  }
  closeAllSockets(): Promise<void> {
    console.log('closeAllSockets');
    return Promise.reject('Method not implemented in web');
  }
  close(options: CloseOptions): Promise<void> {
    console.log('close', options);
    return Promise.reject('Method not implemented in web');
  }
  getInfo(options: InfoOptions): Promise<InfoResult> {
    console.log('getInfo', options);
    return Promise.reject('Method not implemented in web');
  }
  getSockets(): Promise<GetSocketsResult> {
    console.log('getSockets');
    return Promise.reject('Method not implemented in web');
  }
  joinGroup(options: JoinGroupOptions): Promise<void> {
    console.log('joinGroup', options);
    return Promise.reject('Method not implemented in web');
  }
  leaveGroup(options: LeaveGroupOptions): Promise<void> {
    console.log('leaveGroup', options);
    return Promise.reject('Method not implemented in web');
  }
  setMulticastTimeToLive(
    options: SetMulticastTimeToLiveOptions,
  ): Promise<void> {
    console.log('setMulticastTimeToLive', options);
    return Promise.reject('Method not implemented in web');
  }
  setBroadcast(options: SetBroadcastOptions): Promise<void> {
    console.log('setBroadcast', options);
    return Promise.reject('Method not implemented in web');
  }
  setMulticastLoopbackMode(
    options: SetMulticastLoopbackModeOptions,
  ): Promise<void> {
    console.log('setMulticastLoopbackMode', options);
    return Promise.reject('Method not implemented in web');
  }
  getJoinedGroups(): Promise<GetJoinedGroupsResult> {
    console.log('getJoinedGroups');
    return Promise.reject('Method not implemented in web');
  }
}
