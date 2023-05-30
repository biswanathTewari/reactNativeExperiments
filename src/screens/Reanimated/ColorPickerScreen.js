import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {ColorPicker} from '../../Components';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0,0,0,0.9)';

const {width} = Dimensions.get('window');

const CIRCLE_SIZE = width * 0.8;
const PICKER_WIDTH = width * 0.9;

export function ColorPickerScreen() {
  const bgColor = useSharedValue(COLORS[0]);

  const handleColorChange = React.useCallback(
    color => {
      'worklet';
      bgColor.value = color;
    },
    [bgColor],
  );

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: bgColor.value,
    };
  });
  return (
    <>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          colors={COLORS}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.gradient}
          maxWidth={PICKER_WIDTH}
          onColorChange={handleColorChange}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  gradient: {height: 40, width: PICKER_WIDTH, borderRadius: 20},
});
