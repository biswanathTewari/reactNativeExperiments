import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;

export const ScrollPage = ({title, scrollX, index}) => {
  // formula which needs clamp
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    // scale and border radius
    const scale = interpolate(scrollX.value, inputRange, [0, 1, 0], {
      extrapolate: Extrapolate.CLAMP,
    });

    const borderRadius = interpolate(
      scrollX.value,
      inputRange,
      [0, SIZE / 2, 0],
      {
        extrapolate: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{scale}],
      borderRadius: borderRadius,
    };
  }, []);

  const rTextStyle = useAnimatedStyle(() => {
    // opacity and translateX
    const opacity = interpolate(scrollX.value, inputRange, [0, 1, 0], {
      extrapolate: Extrapolate.CLAMP,
    });

    const translateY = interpolate(
      scrollX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{translateY}],
    };
  }, []);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0,0,256, 0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[styles.textContainer, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 60,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  textContainer: {position: 'absolute'},
});
