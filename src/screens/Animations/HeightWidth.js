import React from 'react';
import {Pressable, Animated, StyleSheet, Text} from 'react-native';

const HeightWidth = () => {
  const animatedVal = React.useState(new Animated.Value(150))[0];

  const animateIt = () => {
    Animated.timing(animatedVal, {
      toValue: 200,
      duration: 1000,
    }).start();
  };

  const animatedStyles = {
    height: animatedVal,
    width: animatedVal,
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
    // width: 200,
    // height: 200,
    backgroundColor: 'tomato',
  },
});

export {HeightWidth};
