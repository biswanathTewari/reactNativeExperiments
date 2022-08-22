import React, {useRef} from 'react';
import {StyleSheet, PanResponder, Animated, Text} from 'react-native';

const Decay = () => {
  const centerPan = useRef(new Animated.ValueXY()).current;

  const centerRensponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true, // should we start panning?
      onPanResponderGrant: () => {
        // centerPan.setOffset({
        //   x: centerPan.x._value,
        //   y: centerPan.y._value,
        // });
        // centerPan.setValue({x: 0, y: 0});
        centerPan.extractOffset();
      },
      onPanResponderMove: (_, gestures) => {
        centerPan.setValue({x: gestures.dx, y: gestures.dy});
      },
      onPanResponderRelease: (e, {vx, vy}) => {
        Animated.decay(centerPan, {
          velocity: {x: vx, y: vy},
          deceleration: 0.999,
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

export {Decay};
