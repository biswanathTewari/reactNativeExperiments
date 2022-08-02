import React from 'react';
import {Pressable, Animated, StyleSheet, Text} from 'react-native';

const Positioned = () => {
  const animatedVal = React.useState(new Animated.Value(0))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 200,
      duration: 1000,
    }).start();
  };

  const animatedStyles = {
    top: animatedVal,
    left: animatedVal,
  };

  return (
    <Pressable onPress={animateIt}>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text>I am a big text. I am a big text. I am a big text.</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'tomato',
  },
});

export {Positioned};
