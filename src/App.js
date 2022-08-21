import React from 'react';
import {SafeAreaView} from 'react-native';

import {Landing} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Landing />
    </SafeAreaView>
  );
};

export default App;
