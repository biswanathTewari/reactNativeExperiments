import React from 'react';
import {SafeAreaView} from 'react-native';

import {PhotoGrid} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <PhotoGrid />
    </SafeAreaView>
  );
};

export default App;
