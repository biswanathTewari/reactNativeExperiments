import React from 'react';
import {SafeAreaView} from 'react-native';

import {ProgressBtn} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ProgressBtn />
    </SafeAreaView>
  );
};

export default App;
