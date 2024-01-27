# capacitor-udp-socket

A UDP Socket Plugin for capacitor

Thanks [@unitree-czk](https://github.com/unitree-czk/capacitor-udp)

## Install

```bash
npm install capacitor-udp-socket
npx cap sync
```

## API

<docgen-index>

* [`create(...)`](#create)
* [`update(...)`](#update)
* [`bind(...)`](#bind)
* [`send(...)`](#send)
* [`close(...)`](#close)
* [`closeAllSockets()`](#closeallsockets)
* [`setBroadcast(...)`](#setbroadcast)
* [`setPaused(...)`](#setpaused)
* [`getInfo(...)`](#getinfo)
* [`getSockets()`](#getsockets)
* [`joinGroup(...)`](#joingroup)
* [`leaveGroup(...)`](#leavegroup)
* [`getJoinedGroups()`](#getjoinedgroups)
* [`setMulticastTimeToLive(...)`](#setmulticasttimetolive)
* [`setMulticastLoopbackMode(...)`](#setmulticastloopbackmode)
* [`addListener('receive', ...)`](#addlistenerreceive)
* [`addListener('receiveError', ...)`](#addlistenerreceiveerror)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

UDP socket plugin for Capacitor.

Only available on Android and iOS.

### create(...)

```typescript
create(options?: CreateOptions | undefined) => Promise<CreateResult>
```

Create a socket for udp, and you can create more than one differentiated by the socket id.

Only available on Android and iOS.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#createoptions">CreateOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#createresult">CreateResult</a>&gt;</code>

**Since:** 5.0.0

--------------------


### update(...)

```typescript
update(options: UpdateOptions) => Promise<void>
```

Update the socket info including socket name and buffer size.

Only available on Android and iOS.

| Param         | Type                                                    |
| ------------- | ------------------------------------------------------- |
| **`options`** | <code><a href="#updateoptions">UpdateOptions</a></code> |

**Since:** 5.0.0

--------------------


### bind(...)

```typescript
bind(options: BindOptions) => Promise<void>
```

You need to bind a socket before sending and receiving data.

Only available on Android and iOS.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#bindoptions">BindOptions</a></code> |

**Since:** 5.0.0

--------------------


### send(...)

```typescript
send(options: SendOptions) => Promise<void>
```

Send udp data

Only available on Android and iOS.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#sendoptions">SendOptions</a></code> |

**Since:** 5.0.0

--------------------


### close(...)

```typescript
close(options: CloseOptions) => Promise<void>
```

Close one socket

Only available on Android and iOS.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#closeoptions">CloseOptions</a></code> |

**Since:** 5.0.0

--------------------


### closeAllSockets()

```typescript
closeAllSockets() => Promise<void>
```

Close All Sockets

Only available on Android and iOS.

**Since:** 5.0.0

--------------------


### setBroadcast(...)

```typescript
setBroadcast(options: SetBroadcastOptions) => Promise<void>
```

After enabling broadcasting, you can send data with target address 255.255.255.255.

Only available on Android and iOS.

| Param         | Type                                                                |
| ------------- | ------------------------------------------------------------------- |
| **`options`** | <code><a href="#setbroadcastoptions">SetBroadcastOptions</a></code> |

**Since:** 5.0.0

--------------------


### setPaused(...)

```typescript
setPaused(options: SetPausedOptions) => Promise<void>
```

Pause receiving data.

Only available on Android and iOS.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#setpausedoptions">SetPausedOptions</a></code> |

**Since:** 5.0.0

--------------------


### getInfo(...)

```typescript
getInfo(options: InfoOptions) => Promise<InfoResult>
```

Get Socket information

Only available on Android and iOS.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#infooptions">InfoOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#inforesult">InfoResult</a>&gt;</code>

**Since:** 5.0.0

--------------------


### getSockets()

```typescript
getSockets() => Promise<GetSocketsResult>
```

Obtain all the sockets available.

Only available on Android and iOS.

**Returns:** <code>Promise&lt;<a href="#getsocketsresult">GetSocketsResult</a>&gt;</code>

**Since:** 5.0.0

--------------------


### joinGroup(...)

```typescript
joinGroup(options: JoinGroupOptions) => Promise<void>
```

Join a particular group address. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".

Only available on Android and iOS.

| Param         | Type                                                          |
| ------------- | ------------------------------------------------------------- |
| **`options`** | <code><a href="#joingroupoptions">JoinGroupOptions</a></code> |

**Since:** 5.0.0

--------------------


### leaveGroup(...)

```typescript
leaveGroup(options: LeaveGroupOptions) => Promise<void>
```

Leave a particular group address. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08".

Only available on Android and iOS.

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#leavegroupoptions">LeaveGroupOptions</a></code> |

**Since:** 5.0.0

--------------------


### getJoinedGroups()

```typescript
getJoinedGroups() => Promise<GetJoinedGroupsResult>
```

Get joined groups

Only available on Android and iOS.

**Returns:** <code>Promise&lt;<a href="#getjoinedgroupsresult">GetJoinedGroupsResult</a>&gt;</code>

**Since:** 5.0.0

--------------------


### setMulticastTimeToLive(...)

```typescript
setMulticastTimeToLive(options: SetMulticastTimeToLiveOptions) => Promise<void>
```

Set the time to live (TTL) for multicast packets

Only available on Android and iOS.

| Param         | Type                                                                                    |
| ------------- | --------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setmulticasttimetoliveoptions">SetMulticastTimeToLiveOptions</a></code> |

**Since:** 5.0.0

--------------------


### setMulticastLoopbackMode(...)

```typescript
setMulticastLoopbackMode(options: SetMulticastLoopbackModeOptions) => Promise<void>
```

Set whether to enable multicast loopback mode

Only available on Android and iOS.

| Param         | Type                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#setmulticastloopbackmodeoptions">SetMulticastLoopbackModeOptions</a></code> |

**Since:** 5.0.0

--------------------


### addListener('receive', ...)

```typescript
addListener(eventName: 'receive', listenerFunc: (event: ReceiveEvent) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listening for data reception events

Only available on Android and iOS.

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'receive'</code>                                                    |
| **`listenerFunc`** | <code>(event: <a href="#receiveevent">ReceiveEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 5.0.0

--------------------


### addListener('receiveError', ...)

```typescript
addListener(eventName: 'receiveError', listenerFunc: (event: ReceiveEvent) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listening for data reception exception events

Only available on Android and iOS.

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'receiveError'</code>                                               |
| **`listenerFunc`** | <code>(event: <a href="#receiveevent">ReceiveEvent</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt; & <a href="#pluginlistenerhandle">PluginListenerHandle</a></code>

**Since:** 5.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all native listeners for this plugin

Only available on Android and iOS.

**Since:** 5.0.0

--------------------


### Interfaces


#### CreateResult

Result of creating a UDP socket

| Prop           | Type                | Description          |
| -------------- | ------------------- | -------------------- |
| **`socketId`** | <code>number</code> | The id of the socket |
| **`ipv4`**     | <code>string</code> | ipv4 address         |
| **`ipv6`**     | <code>string</code> | ipv6 address         |


#### CreateOptions

Parameters for creating a UDP socket

| Prop             | Type                                                 |
| ---------------- | ---------------------------------------------------- |
| **`properties`** | <code>{ name?: string; bufferSize?: number; }</code> |


#### UpdateOptions

Parameters for updating a UDP socket

| Prop             | Type                                                 | Description          |
| ---------------- | ---------------------------------------------------- | -------------------- |
| **`socketId`**   | <code>number</code>                                  | The id of the socket |
| **`properties`** | <code>{ name?: string; bufferSize?: number; }</code> |                      |


#### BindOptions

Parameters for binding a UDP socket

| Prop           | Type                | Description                                                                                 |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| **`socketId`** | <code>number</code> | The id of the socket                                                                        |
| **`address`**  | <code>string</code> | The address to bind to. If not specified, the socket will be bound to the wildcard address. |
| **`port`**     | <code>number</code> | The port to bind to.                                                                        |


#### SendOptions

Parameters for sending data

| Prop           | Type                | Description                     |
| -------------- | ------------------- | ------------------------------- |
| **`socketId`** | <code>number</code> | The id of the socket            |
| **`address`**  | <code>string</code> | The address of the remote host. |
| **`port`**     | <code>number</code> | The port of the remote host.    |
| **`buffer`**   | <code>string</code> | The data to send.               |


#### CloseOptions

Parameters for closing a UDP socket

| Prop           | Type                | Description          |
| -------------- | ------------------- | -------------------- |
| **`socketId`** | <code>number</code> | The id of the socket |


#### SetBroadcastOptions

Parameters for settings broadcast mode

| Prop           | Type                 | Description                       |
| -------------- | -------------------- | --------------------------------- |
| **`socketId`** | <code>number</code>  | The id of the socket              |
| **`enabled`**  | <code>boolean</code> | Whether to enable broadcast mode. |


#### SetPausedOptions

Parameters for binding a UDP socket

| Prop           | Type                 | Description                     |
| -------------- | -------------------- | ------------------------------- |
| **`socketId`** | <code>number</code>  | The id of the socket            |
| **`paused`**   | <code>boolean</code> | Whether to pause receiving data |


#### InfoResult

Result of getting information about a UDP socket

| Prop               | Type                        | Description                                                                        |
| ------------------ | --------------------------- | ---------------------------------------------------------------------------------- |
| **`socketId`**     | <code>number</code>         | The id of the socket                                                               |
| **`name`**         | <code>string \| null</code> | The name of the socket, which can be used to distinguish between multiple sockets. |
| **`bufferSize`**   | <code>number</code>         | The size of the buffer used to receive data.                                       |
| **`paused`**       | <code>boolean</code>        | Whether data reception has been suspended。                                         |
| **`localAddress`** | <code>string</code>         | The address to which the socket is bound.                                          |
| **`localPort`**    | <code>number</code>         | The port to which the socket is bound.                                             |


#### InfoOptions

Parameters for getting information about a UDP socket

| Prop           | Type                | Description          |
| -------------- | ------------------- | -------------------- |
| **`socketId`** | <code>number</code> | The id of the socket |


#### GetSocketsResult

Parameters for getting information about all UDP sockets

| Prop          | Type                      | Description             |
| ------------- | ------------------------- | ----------------------- |
| **`sockets`** | <code>InfoResult[]</code> | The list of UDP sockets |


#### JoinGroupOptions

Parameters for joining a multicast group

| Prop           | Type                | Description                                                                                                     |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **`socketId`** | <code>number</code> | The id of the socket                                                                                            |
| **`address`**  | <code>string</code> | The address of the multicast group to join. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08". |


#### LeaveGroupOptions

Parameters for leaving a multicast group

| Prop           | Type                | Description                                                                                                      |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **`socketId`** | <code>number</code> | The id of the socket                                                                                             |
| **`address`**  | <code>string</code> | The address of the multicast group to leave. For IPv4, it's like "238.12.12.12". For IPv6, it's like "ff02::08". |


#### GetJoinedGroupsResult

Parameters for getting joined multicast groups

| Prop         | Type                  | Description                           |
| ------------ | --------------------- | ------------------------------------- |
| **`groups`** | <code>[string]</code> | The list of multicast group addresses |


#### SetMulticastTimeToLiveOptions

Parameters for setting multicast time to live

| Prop           | Type                | Description             |
| -------------- | ------------------- | ----------------------- |
| **`socketId`** | <code>number</code> | The id of the socket    |
| **`ttl`**      | <code>number</code> | The time to live value. |


#### SetMulticastLoopbackModeOptions

Parameters for setting multicast loopback mode

| Prop           | Type                 | Description                                |
| -------------- | -------------------- | ------------------------------------------ |
| **`socketId`** | <code>number</code>  | The id of the socket                       |
| **`enabled`**  | <code>boolean</code> | Whether to enable multicast loopback mode. |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### ReceiveEvent

Result of receiving data

| Prop                | Type                | Description                     |
| ------------------- | ------------------- | ------------------------------- |
| **`socketId`**      | <code>number</code> | The id of the socket            |
| **`buffer`**        | <code>string</code> | The data received.              |
| **`remoteAddress`** | <code>string</code> | The address of the remote host. |
| **`remotePort`**    | <code>number</code> | The port of the remote host.    |
| **`error`**         | <code>string</code> | Error message                   |

</docgen-api>
