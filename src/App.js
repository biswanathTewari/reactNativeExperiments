import React from 'react';
import {SafeAreaView} from 'react-native';

import {Pan} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pan />
    </SafeAreaView>
  );
};

export default App;
