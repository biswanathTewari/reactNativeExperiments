import React from 'react';
import {SafeAreaView} from 'react-native';

import {Opacity} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Opacity />
    </SafeAreaView>
  );
};

export default App;
