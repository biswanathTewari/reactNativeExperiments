import React from 'react';
import {SafeAreaView} from 'react-native';

import {MessengerPopups} from './screens';

const App = () => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <MessengerPopups />
    </SafeAreaView>
  );
};

export default App;
