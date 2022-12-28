import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Canvas, Circle} from '@shopify/react-native-skia';

const GeekyAnts = () => {
  return (
    <View style={styles.container}>
      <Canvas style={{flex: 1}}>
        <Circle cx={100} cy={100} r={100} color="red" />
      </Canvas>
    </View>
  );
};

export {GeekyAnts};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
