import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

import {SRK, KRK, LalSingh, KiaraImg, KabirSingh} from '../../assets/imgs';

const swipeThreshold = 120;
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const TinderCards = () => {
  const [profiles, setProfiles] = React.useState([
    {
      name: 'Shah Rukh Khan',
      img: SRK,
      text: 'Naam toh sunna hi hoga, Pathaan coming soon',
    },
    {
      name: 'Kamal R Khan',
      img: KRK,
      text: "I destroyed Amir Khan's career, now my next target is SRK 😈",
    },
    {
      name: 'Lal Singh',
      img: LalSingh,
      text: 'Hoji, sada naam Lal Singh ji, KRK ko maro ji',
    },
    {
      name: 'Kiara Advani',
      img: KiaraImg,
      text: "You're next girrlfriend 😍",
    },
    {
      name: 'Kabir Singh',
      img: KabirSingh,
      text: 'Vo meri kuri hain 🤬🤬🤬',
    },
  ]);
  const animatedValue = React.useState(new Animated.ValueXY(0))[0];
  const cardOpacity = React.useState(new Animated.Value(1))[0];
  const nextCardScale = React.useState(new Animated.Value(0.9))[0];

  const nextHandler = () => {
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(nextCardScale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setProfiles(prev => prev.slice(1));

      // reset the animated values
      cardOpacity.setValue(1);
      nextCardScale.setValue(0.9);
      animatedValue.setValue({x: 0, y: 0});
    });
  };

  const dragHandler = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true, // should we start panning?

      //^ onPanResponderGrant: is not needed since, we wont be restarting the gesture
      //^ even if we do restart the gesture, it will be starting from the beginning

      onPanResponderMove: (_, gestures) => {
        animatedValue.setValue({x: gestures.dx, y: gestures.dy});
      },

      onPanResponderRelease: (_, {dx, vx, vy}) => {
        let velocity;

        if (vx >= 0) velocity = clamp(vx, 3, 5);
        else velocity = clamp(Math.abs(vx), 3, 5) * -1;

        if (Math.abs(dx) > swipeThreshold) {
          Animated.decay(animatedValue, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98,
            useNativeDriver: false,
          }).start(() => nextHandler());
        } else {
          Animated.spring(animatedValue, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const imageOpacity = animatedValue.x.interpolate({
    inputRange: [-swipeThreshold, 0, swipeThreshold],
    outputRange: [0.5, 1, 0.5],
    extrapolate: 'clamp',
  });

  const cardRotation = animatedValue.x.interpolate({
    inputRange: [-swipeThreshold, 0, swipeThreshold],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const yupOpacity = animatedValue.x.interpolate({
    inputRange: [0, swipeThreshold],
    outputRange: [0, 1],
  });

  const nopeOpacity = animatedValue.x.interpolate({
    inputRange: [-swipeThreshold, 0],
    outputRange: [1, 0],
  });

  const yupScale = animatedValue.x.interpolate({
    inputRange: [0, swipeThreshold],
    outputRange: [0.5, 1],
    extrapolate: 'clamp',
  });
  const nopeScale = animatedValue.x.interpolate({
    inputRange: [-swipeThreshold, 0],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const animatedYupStyles = {
    opacity: yupOpacity,
    transform: [{scale: yupScale}, {rotate: '-30deg'}],
  };

  const animatedNopeStyles = {
    opacity: nopeOpacity,
    transform: [{scale: nopeScale}, {rotate: '30deg'}],
  };

  const swipeNope = () => {
    Animated.timing(animatedValue, {
      toValue: {x: -swipeThreshold, y: 0},
      duration: 300,
      useNativeDriver: false,
    }).start(nextHandler);
  };

  const swipeYup = () => {
    Animated.timing(animatedValue, {
      toValue: {x: swipeThreshold, y: 0},
      duration: 300,
      useNativeDriver: false,
    }).start(nextHandler);
  };

  const cardStyle = {
    opacity: cardOpacity,
    transform: [
      {rotate: cardRotation},
      ...animatedValue.getTranslateTransform(),
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {profiles
          .slice(0, 2)
          .reverse()
          .map(({name, img, text}, index, items) => {
            const n = items.length - 1;
            const isLast = index === n;
            const isSecondToLast = index === n - 1;

            const cardStyles = isLast ? cardStyle : {}; // active card with pan responder
            const gestureHandler = isLast ? dragHandler : {};
            const imageStyle = isLast ? {opacity: imageOpacity} : {};

            const nextCardStyle = isSecondToLast
              ? {transform: [{scale: nextCardScale}]}
              : {};

            return (
              <Animated.View
                key={index}
                style={[styles.card, cardStyles, nextCardStyle]}
                {...gestureHandler.panHandlers}>
                <Animated.Image
                  source={img}
                  style={[styles.image, imageStyle]}
                  resizeMode="cover"
                />
                <View style={styles.lowerText}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.profileText}>{text}</Text>
                </View>

                {isLast && (
                  <Animated.View style={[styles.nope, animatedNopeStyles]}>
                    <Text style={styles.nopeText}>Nope!</Text>
                  </Animated.View>
                )}

                {isLast && (
                  <Animated.View style={[styles.yup, animatedYupStyles]}>
                    <Text style={styles.yupText}>Yup!</Text>
                  </Animated.View>
                )}
              </Animated.View>
            );
          })}
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity
          onPress={swipeNope}
          style={[styles.button, styles.nopeButton]}>
          <Text style={styles.nopeText}>NO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={swipeYup}
          style={[styles.button, styles.yupButton]}>
          <Text style={styles.yupText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'pink',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 400,
    height: 600,
    position: 'absolute',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#FFF',
    overflow: 'hidden',
  },
  lowerText: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 5,
  },
  image: {
    width: null,
    height: null,
    borderRadius: 10,
    flex: 6,
  },
  profileText: {
    fontSize: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  yup: {
    borderColor: 'green',
    borderWidth: 3,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: 'transparent',
  },
  yupText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 3,
    position: 'absolute',
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
  },
  nopeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {x: 0, y: 0},
    shadowRadius: 5,
    borderWidth: 2,
  },
  yupButton: {
    shadowColor: 'green',
  },
  nopeButton: {
    shadowColor: 'red',
  },
});

export {TinderCards};
