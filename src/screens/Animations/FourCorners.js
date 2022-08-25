import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';

const FourCorners = () => {
  const animated = React.useState(new Animated.ValueXY())[0];
  let boxH, boxW, height, width;

  const getDimensions = e => {
    boxH = e.nativeEvent.layout.height;
    boxW = e.nativeEvent.layout.width;
  };

  const containerDimensions = e => {
    const {width: w, height: h} = e.nativeEvent.layout;
    width = w;
    height = h;
  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.spring(animated.y, {
        toValue: height - boxH,
        useNativeDriver: true,
      }),
      Animated.spring(animated.x, {
        toValue: width - boxW,
        useNativeDriver: true,
      }),
      Animated.spring(animated.y, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(animated.x, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animatedStyles = {
    transform: animated.getTranslateTransform(),
  };

  return (
    <View style={styles.container} onLayout={containerDimensions}>
      <TouchableWithoutFeedback
        onLayout={getDimensions}
        onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export {FourCorners};
