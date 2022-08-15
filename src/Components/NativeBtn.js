import React from 'react';
import {NativeModules, Button} from 'react-native';

const NativeBtn = () => {
  const {MyLogger} = NativeModules;

  const onPress = () => {
    MyLogger.myEventLog('trying briding', 'jsInvokedNativeEvent');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export {NativeBtn};
