import type { PluginListenerHandle } from '@capacitor/core';

/**
 * UDP socket plugin for Capacitor.
 *
 * Only available on Android and iOS.
 */
export interface UdpSocketPlugin {
  /**
   * Create a socket for udp, and you can create more than one differentiated by the socket id.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  create(options?: CreateOptions): Promise<CreateResult>;

  /**
   * Update the socket info including socket name and buffer size.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  update(options: UpdateOptions): Promise<void>;

  /**
   * You need to bind a socket before sending and receiving data.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  bind(options: BindOptions): Promise<void>;

  /**
   * Send udp data
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  send(options: SendOptions): Promise<void>;

  /**
   * Close one socket
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  close(options: CloseOptions): Promise<void>;

  /**
   * Close All Sockets
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  closeAllSockets(): Promise<void>;

  /**
   * After enabling broadcasting, you can send data with target address 255.255.255.255.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  setBroadcast(options: SetBroadcastOptions): Promise<void>;

  /**
   * Pause receiving data.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  setPaused(options: SetPausedOptions): Promise<void>;

  /**
   * Get Socket information
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  getInfo(options: InfoOptions): Promise<InfoResult>;

  /**
   * Obtain all the sockets available.
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  getSockets(): Promise<GetSocketsResult>;

  /**
   * Join a particular group address. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  joinGroup(options: JoinGroupOptions): Promise<void>;

  /**
   * Leave a particular group address. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  leaveGroup(options: LeaveGroupOptions): Promise<void>;

  /**
   * Get joined groups
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  getJoinedGroups(): Promise<GetJoinedGroupsResult>;

  /**
   * Set the time to live (TTL) for multicast packets
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  setMulticastTimeToLive(options: SetMulticastTimeToLiveOptions): Promise<void>;

  /**
   * Set whether to enable multicast loopback mode
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  setMulticastLoopbackMode(
    options: SetMulticastLoopbackModeOptions,
  ): Promise<void>;

  /**
   * Listening for data reception events
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  addListener(
    eventName: 'receive',
    listenerFunc: (event: ReceiveEvent) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;

  /**
   * Listening for data reception exception events
   *
   * Only available on Android and iOS.
   *
   * @since 5.0.0
   */
  addListener(
    eventName: 'receiveError',
    listenerFunc: (event: ReceiveEvent) => void,
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}

// types

/**
 * Parameters for creating a UDP socket
 *
 * @since 5.0.0
 */
export interface CreateOptions {
  properties?: {
    /**
     * The name of the socket, which can be used to distinguish between multiple sockets.
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. The default value is 4096.
     */
    bufferSize?: number;
  };
}

/**
 * Result of creating a UDP socket
 *
 * @since 5.0.0
 */
export interface CreateResult {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * ipv4 address
   */
  ipv4: string;
  /**
   * ipv6 address
   */
  ipv6: string;
}

/**
 * Parameters for updating a UDP socket
 *
 * @since 5.0.0
 */
export interface UpdateOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  properties: {
    /**
     * The name of the socket, which can be used to distinguish between multiple sockets.
     */
    name?: string;
    /**
     * The size of the buffer used to receive data. The default value is 4096.
     */
    bufferSize?: number;
  };
}

/**
 * Parameters for binding a UDP socket
 *
 * @since 5.0.0
 */
export interface SetPausedOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * Whether to pause receiving data
   */
  paused: boolean;
}

/**
 * Parameters for binding a UDP socket
 *
 * @since 5.0.0
 */
export interface BindOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The address to bind to. If not specified, the socket will be bound to the wildcard address.
   */
  address?: string;
  /**
   * The port to bind to.
   */
  port: number;
}

/**
 * Parameters for sending data
 *
 * @since 5.0.0
 */
export interface SendOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The address of the remote host.
   */
  address: string;
  /**
   * The port of the remote host.
   */
  port: number;
  /**
   * The data to send.
   */
  buffer: string;
}

/**
 * Parameters for closing a UDP socket
 *
 * @since 5.0.0
 */
export interface CloseOptions {
  /**
   * The id of the socket
   */
  socketId: number;
}

/**
 * Parameters for getting information about a UDP socket
 *
 * @since 5.0.0
 */
export interface InfoOptions {
  /**
   * The id of the socket
   */
  socketId: number;
}

/**
 * Result of getting information about a UDP socket
 *
 * @since 5.0.0
 */
export interface InfoResult {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The name of the socket, which can be used to distinguish between multiple sockets.
   */
  name: string | null;
  /**
   * The size of the buffer used to receive data.
   */
  bufferSize: number;
  /**
   * Whether data reception has been suspended。
   */
  paused: boolean;
  /**
   * The address to which the socket is bound.
   */
  localAddress?: string;
  /**
   * The port to which the socket is bound.
   */
  localPort?: number;
}

/**
 * Parameters for getting information about all UDP sockets
 *
 * @since 5.0.0
 */
export interface GetSocketsResult {
  /**
   * The list of UDP sockets
   */
  sockets: InfoResult[];
}

/**
 * Parameters for joining a multicast group
 *
 * @since 5.0.0
 */
export interface JoinGroupOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The address of the multicast group to join.
   * For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".
   */
  address: string;
}

/**
 * Parameters for leaving a multicast group
 *
 * @since 5.0.0
 */
export interface LeaveGroupOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The address of the multicast group to leave.
   * For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".
   */
  address: string;
}

/**
 * Parameters for setting multicast time to live
 *
 * @since 5.0.0
 */
export interface SetMulticastTimeToLiveOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The time to live value.
   */
  ttl: number;
}

/**
 * Parameters for settings broadcast mode
 *
 * @since 5.0.0
 */
export interface SetBroadcastOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * Whether to enable broadcast mode.
   */
  enabled: boolean;
}

/**
 * Parameters for setting multicast loopback mode
 *
 * @since 5.0.0
 */
export interface SetMulticastLoopbackModeOptions {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * Whether to enable multicast loopback mode.
   */
  enabled: boolean;
}

/**
 * Parameters for getting joined multicast groups
 *
 * @since 5.0.0
 */
export interface GetJoinedGroupsResult {
  /**
   * The list of multicast group addresses
   */
  groups: [string];
}

/**
 * Result of receiving data
 *
 * @since 5.0.0
 */
export interface ReceiveEvent {
  /**
   * The id of the socket
   */
  socketId: number;
  /**
   * The data received.
   */
  buffer?: string;
  /**
   * The address of the remote host.
   */
  remoteAddress?: string;
  /**
   * The port of the remote host.
   */
  remotePort?: number;
  /**
   * Error message
   */
  error?: string;
}
