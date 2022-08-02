import React from 'react';
import {Pressable, Animated, StyleSheet} from 'react-native';

const Translate = () => {
  const animatedVal = React.useState(new Animated.Value(0))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 300, // -300 for moving up left diagonal
      duration: 1000,
    }).start(() => {
      // this is the callback, after the animation is done
      animatedVal.setValue(0); // reset to 0 without animation
    });
  };

  const translateStyle = {
    transform: [
      {
        translateX: animatedVal,
      },
      {
        translateY: animatedVal,
      },
    ],
  };

  return (
    <Pressable onPress={animateIt}>
      <Animated.View style={[styles.box, translateStyle]}></Animated.View>
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

export {Translate};
