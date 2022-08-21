package com.reactnativeexperiments;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class MyLoggerModule extends ReactContextBaseJavaModule {

// constructor
  public MyLoggerModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  // returns the module name
  @Override
  public String getName() {
    return "MyLogger";
  }

  @ReactMethod
  public void myEventLog(String message, String event) {
    System.out.println("Android event log:" +  " " + message + " " + event);
  }
}