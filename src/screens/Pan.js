import React, {useRef} from 'react';
import {StyleSheet, PanResponder, Animated, Text} from 'react-native';

const Pan = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const centerPan = useRef(new Animated.ValueXY()).current;

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

  const centerRensponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, // should we start panning?
      onPanResponderGrant: () => {
        centerPan.setOffset({
          x: centerPan.x._value,
          y: centerPan.y._value,
        });
        //centerPan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: (_, gestures) => {
        centerPan.setValue({x: gestures.dx, y: gestures.dy});
      },
      onPanResponderRelease: () => {
        Animated.spring(centerPan, {
          toValue: {x: 0, y: 0}, // we can create tinder like card by adjusting the spring values
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const rotate = centerPan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  const opacity = centerPan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.5, 1, 0.5],
  });
  return (
    <>
      <Animated.View
        style={[
          style.ball,
          {transform: [{translateX: pan.x}, {translateY: pan.y}]},
        ]}
        {...panResponder.panHandlers} //destructuring panResponder's evennt Handlers
      >
        <Text>I can move freely</Text>
      </Animated.View>
      <Animated.View
        style={[
          style.box,
          {
            transform: [
              {translateX: centerPan.x},
              {
                translateY: centerPan.y,
              },
              {rotate: rotate},
            ],
            opacity: opacity,
          },
        ]}
        {...centerRensponder.panHandlers}>
        <Text>Fixed to center</Text>
      </Animated.View>
    </>
  );
};

const style = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 125,
    height: 125,
    backgroundColor: 'blue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {Pan};
