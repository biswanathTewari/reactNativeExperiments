import React from 'react';
import {SafeAreaView} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {ZoomImage} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GestureHandlerRootView style={{flex: 1, width: '100%'}}>
        <ZoomImage />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
