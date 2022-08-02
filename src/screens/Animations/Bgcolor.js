import React from 'react';
import {Pressable, Animated, StyleSheet, Text} from 'react-native';

const Bgcolor = () => {
  const animatedVal = React.useState(new Animated.Value(0))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 2,
      duration: 1000,
    }).start();
  };

  // since we cannot animate string value directly, we need to use interpolate
  const interpolatedValue = animatedVal.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['orange', '#f00', '#0f0'],
  });

  const animatedStyles = {
    backgroundColor: interpolatedValue,
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

export {Bgcolor};
