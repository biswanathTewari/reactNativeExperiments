import React from 'react';
import {Pressable, Animated, StyleSheet, Text} from 'react-native';

const Scale = () => {
  const animatedVal = React.useState(new Animated.Value(1))[0]; // 1 is the default scale

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 2, // -2 for flipping animation
      duration: 1000,
    }).start();
  };

  const animatedStyles = {
    transform: [
      {
        scaleX: animatedVal,
      },
      {
        scaleY: animatedVal,
      },
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

export {Scale};
