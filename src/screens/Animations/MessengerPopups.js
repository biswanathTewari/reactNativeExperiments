import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
  Image,
  Text,
} from 'react-native';

import {SRK, KRK, LalSingh, MessengerIcon} from '../../assets/imgs';

const getMaxTranslationX = (deviceWidth, objectWidth) => {
  // moving left is negative, moving right is positive
  // hence left most end is -(deviceWidth/2) coords
  const maxXScale = deviceWidth / 2;

  // translating X moves the object considering its center coordinates,
  // so we need to subtract half the width of the object to get the maximum translation
  const maxTranslationX = maxXScale - objectWidth / 2;

  return maxTranslationX;
};

const MessengerPopups = () => {
  const popHeads = React.useState([
    {
      img: SRK,
      animatedValue: new Animated.ValueXY(0),
    },
    {
      img: LalSingh,
      animatedValue: new Animated.ValueXY(0),
    },
    {
      img: KRK,
      animatedValue: new Animated.ValueXY(0),
    },
  ])[0];
  let width;

  const containerDimensions = e => {
    const {width: w} = e.nativeEvent.layout;
    width = w;
  };

  const dragHandler = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true, // should we start panning?

      // extractOffset from all the pop heads
      onPanResponderGrant: () => {
        popHeads.map(({animatedValue}) => {
          animatedValue.extractOffset();
          animatedValue.setValue({x: 0, y: 0});
        });
      },

      onPanResponderMove: (_, gestures) => {
        // first lets make the 1st pop head draggable
        popHeads[0].animatedValue.setValue({x: gestures.dx, y: gestures.dy});

        // now lets make the other popHeads flow the 1st popHead with a stagger effect
        popHeads.slice(1).map(({animatedValue}, index) => {
          return Animated.sequence([
            Animated.delay(index * 100),
            Animated.spring(animatedValue, {
              toValue: {x: gestures.dx, y: gestures.dy},
            }),
          ]).start();
        });
      },

      onPanResponderRelease: () => {
        const getToTheNearestEnd = () => {
          popHeads[0].animatedValue.flattenOffset();
          popHeads[1].animatedValue.flattenOffset();
          popHeads[2].animatedValue.flattenOffset();

          const x = popHeads[0].animatedValue.x._value;
          const y = popHeads[0].animatedValue.y._value;

          let maxTranslationX = getMaxTranslationX(width, 100); // hard coding the popHead width for now
          maxTranslationX = maxTranslationX - 5; // taking account for the margin

          let toX = 0;
          if (x > 0)
            toX = maxTranslationX; // to the rightEnd, if on the right side
          else toX = -maxTranslationX; // to the leftEnd, if on the left side

          popHeads.map(({animatedValue}) => {
            return Animated.spring(animatedValue, {
              toValue: {x: toX, y: y},
            }).start();
          });
        };

        setTimeout(() => getToTheNearestEnd(), popHeads.length * 100); // wait for all the gestures to finish
      },
    }),
  ).current;

  return (
    <View style={styles.container} onLayout={containerDimensions}>
      <View>
        <Image source={MessengerIcon} style={styles.icon} />
        <Text style={styles.text}>Messenger</Text>
      </View>
      {popHeads
        .slice(0)
        .reverse()
        .map((popHead, index) => {
          if (index === 2)
            return (
              <Animated.Image
                key={'' + index}
                source={popHead.img}
                style={[
                  styles.head,
                  {transform: popHead.animatedValue.getTranslateTransform()},
                ]}
                {...dragHandler.panHandlers}
              />
            );
          return (
            <Animated.Image
              key={'' + index}
              source={popHead.img}
              style={[
                styles.head,
                {transform: popHead.animatedValue.getTranslateTransform()},
              ]}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  head: {
    height: 100,
    width: 100,
    borderRadius: 50,
    position: 'absolute',
  },
  icon: {
    height: 180,
    width: 180,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

export {MessengerPopups};
