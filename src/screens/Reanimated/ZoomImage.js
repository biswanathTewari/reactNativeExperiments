import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const ZoomImage = () => {
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const imageUri =
    'https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80';

  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // NOTE: the transform effects are synchronous
        {translateX: focalX.value},
        {translateY: focalY.value}, // transforming the image according to the focal point, but it is not centered
        {translateX: -width / 2},
        {translateY: -height / 2}, // shifting the image to center it
        {scale: scale.value},
        {translateX: -focalX.value}, // reversing the transform back to original
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const focalStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={{flex: 1}}>
        <AnimatedImage
          style={[{flex: 1}, imageStyle]}
          source={{uri: imageUri}}
        />
        <Animated.View style={[styles.focalPoint, focalStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export {ZoomImage};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});
