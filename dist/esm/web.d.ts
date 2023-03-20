import { WebPlugin } from '@capacitor/core';
import type { BindOptions, CloseOptions, CreateOptions, CreateResult, GetJoinedGroupsResult, GetSocketsResult, InfoOptions, InfoResult, JoinGroupOptions, LeaveGroupOptions, SendOptions, SetBroadcastOptions, SetMulticastLoopbackModeOptions, SetMulticastTimeToLiveOptions, SetPausedOptions, UdpSocketPlugin, UpdateOptions } from './definitions';
export declare class UdpSocketWeb extends WebPlugin implements UdpSocketPlugin {
    create(options?: CreateOptions): Promise<CreateResult>;
    update(options: UpdateOptions): Promise<void>;
    setPaused(options: SetPausedOptions): Promise<void>;
    bind(options: BindOptions): Promise<void>;
    send(options: SendOptions): Promise<void>;
    closeAllSockets(): Promise<void>;
    close(options: CloseOptions): Promise<void>;
    getInfo(options: InfoOptions): Promise<InfoResult>;
    getSockets(): Promise<GetSocketsResult>;
    joinGroup(options: JoinGroupOptions): Promise<void>;
    leaveGroup(options: LeaveGroupOptions): Promise<void>;
    setMulticastTimeToLive(options: SetMulticastTimeToLiveOptions): Promise<void>;
    setBroadcast(options: SetBroadcastOptions): Promise<void>;
    setMulticastLoopbackMode(options: SetMulticastLoopbackModeOptions): Promise<void>;
    getJoinedGroups(): Promise<GetJoinedGroupsResult>;
}
