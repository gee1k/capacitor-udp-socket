package com.svend.plugins.udp.socket;

import android.util.Log;

public class UdpSocket {

    public String echo(String value) {
        Log.i("Echo", value);
        return value;
    }
}
