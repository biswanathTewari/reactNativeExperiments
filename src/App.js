import React from 'react';
import {SafeAreaView} from 'react-native';

import {TinderCards} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TinderCards />
    </SafeAreaView>
  );
};

export default App;
