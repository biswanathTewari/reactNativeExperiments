import React from 'react';
import {Pressable, Animated, StyleSheet, Easing as Eased} from 'react-native';

const Easing = () => {
  const animatedVal = React.useState(new Animated.Value(0))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 300,
      duration: 500,
      //easing: Eased.back(5),
      //easing: Eased.bounce,
      //easing: Eased.elastic(3),
    }).start();
  };

  const translateStyle = {
    transform: [
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

export {Easing};
