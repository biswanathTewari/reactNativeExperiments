import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ColorPicker = ({colors, start, end, style, maxWidth, onColorChange}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const derivedX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      maxWidth - CIRCLE_PICKER_SIZE,
    );
  });

  const onGestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.x = derivedX.value;
      withSequence(
        (scale.value = withSpring(1.2)),
        (translateY.value = withSpring(-CIRCLE_PICKER_SIZE)),
      );
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd: () => {
      withSequence(
        (scale.value = withSpring(1)),
        (translateY.value = withSpring(0)),
      );
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: derivedX.value},
        {translateY: translateY.value},
        {scaleX: scale.value},
        {scaleY: scale.value},
      ],
    };
  });

  const rBgStyle = useAnimatedStyle(() => {
    const inputRange = colors.map(
      (_, index) => (index / colors.length) * maxWidth,
    );

    const bgColor = interpolateColor(translateX.value, inputRange, colors);

    onColorChange?.(bgColor);

    return {
      backgroundColor: bgColor,
    };
  });

  return (
    <Animated.View style={{justifyContent: 'center'}}>
      <LinearGradient colors={colors} start={start} end={end} style={style} />
      <PanGestureHandler onGestureEvent={onGestureHandler}>
        <Animated.View style={[styles.picker, rStyle]}>
          <Animated.View style={[styles.internalPicker, rBgStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2;

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1.0,
    borderColor: 'rgba(0,0,0,0.2)',
  },
});

export {ColorPicker};
