package com.svend.plugins.capacitor.udp.socket;

import android.util.Log;

public class UdpSocket {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
