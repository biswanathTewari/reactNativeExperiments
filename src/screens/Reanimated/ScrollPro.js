import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {ScrollPage} from '../../Components';

const WORDS = ['hello', 'there', "I'm friday!"];

export const ScrollPro = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        pagingEnabled
        scrollEventThrottle={16}
        horizontal
        style={styles.scroll}>
        {WORDS.map((item, index) => (
          <ScrollPage title={item} scrollX={translateX} index={index} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});
