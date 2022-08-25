import React from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const ProgressBtn = () => {
  const animated = React.useState(new Animated.Value(0))[0];
  const opacity = React.useState(new Animated.Value(1))[0];

  const btnWidth = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const btnColor = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ff0000', '#00ff00'],
    extrapolate: 'clamp',
  });

  const handlePress = () => {
    // reset the animation
    animated.setValue(0);
    opacity.setValue(1);

    Animated.timing(animated, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const progressStyles = {
    opacity: opacity,
    width: btnWidth,
    backgroundColor: btnColor,
    bottom: 0,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.button}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progress, progressStyles]} />
          </View>
          <Text style={styles.buttonText}>Get it!</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#e6537d',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 10,
    overflow: 'hidden',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    backgroundColor: 'transparent',
  },
  progress: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  opacityBackground: {
    // for a more premium look use this
    backgroundColor: 'rgba(255,255,255,.5)',
  },
});

export {ProgressBtn};
