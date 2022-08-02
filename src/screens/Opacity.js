import React from 'react';
import {Pressable, Animated, StyleSheet} from 'react-native';

const Opacity = () => {
  const animatedOpacity = React.useState(new Animated.Value(1))[0];

  const animateIt = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0,
      duration: 500,
    }).start(() => {
      // this is the callback, after the animation is done
      setTimeout(() => {
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 500,
        }).start();
      }, 1000);
    });
  };

  return (
    <Pressable onPress={animateIt}>
      <Animated.View
        style={[styles.box, {opacity: animatedOpacity}]}></Animated.View>
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

export {Opacity};
