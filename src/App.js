import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {ScrollPro} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GestureHandlerRootView style={{flex: 1, width: '100%'}}>
        <ScrollPro />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
