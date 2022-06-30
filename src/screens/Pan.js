import React, {useRef} from 'react';
import {StyleSheet, PanResponder, Animated} from 'react-native';

const Pan = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, // should we start panning?

      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      }, // kinda like init function, takes the current position of the pan and sets it as the offset

      onPanResponderMove: (_, gestures) => {
        pan.setValue({x: gestures.dx, y: gestures.dy});
      }, // this func tracks the delta values, and updates the pan object's position values

      onPanResponderRelease: () => {
        //* Before
        // value -> contains the new delta values, the distance moved
        // offset -> contains the initial values, the distance moved before the gesture started

        pan.flattenOffset();

        //* After
        // value = offset + value
        // offset = 0; // reset the offset to 0

        // why are using the offset?
        // because the value is the delta value, and the offset is the initial value
        // we need a new variable(offset) to store the previous value as the current value is
        // storing the delta values
      },
    }),
  ).current;
  return (
    <Animated.View
      style={[
        style.ball,
        {transform: [{translateX: pan.x}, {translateY: pan.y}]},
      ]}
      {...panResponder.panHandlers} //destructuring panResponder's evennt Handlers
    ></Animated.View>
  );
};

const style = StyleSheet.create({
  ball: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 25,
  },
});

export {Pan};
