#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(UdpSocketPlugin, "UdpSocket",
    CAP_PLUGIN_METHOD(create, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(update, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(bind, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(send, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(close, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(closeAllSockets, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(setPaused, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(getInfo, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(getSockets, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(setBroadcast, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(joinGroup, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(leaveGroup, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(getJoinedGroups, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(setMulticastTimeToLive, CAPPluginReturnNone);
    CAP_PLUGIN_METHOD(setMulticastLoopbackMode, CAPPluginReturnNone);
)
