import React from 'react';
import {Pressable, Animated, StyleSheet, Text} from 'react-native';

const Rotation = () => {
  const animatedVal = React.useState(new Animated.Value(0))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  const interpolateX = animatedVal.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const interpolateY = animatedVal.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '0deg', '360deg'],
  });

  const animatedStyles = {
    transform: [
      {rotateX: interpolateX}, // rotate around the y-axis
      {rotateY: interpolateY}, // rotate around the x-axis
    ],
  };

  return (
    <Pressable onPress={animateIt}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text>I am a flipper</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
});

export {Rotation};
