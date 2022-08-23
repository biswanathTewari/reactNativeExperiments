import React from 'react';
import {View, Animated, StyleSheet, ScrollView} from 'react-native';

const Eventbased = () => {
  const anime = React.useState(new Animated.Value(0))[0];

  const bgColor = anime.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['red', 'blue', 'green'],
  });

  const animatedStyle = {
    backgroundColor: bgColor,
  };

  const onScrollhandler = event => {
    const y = event.nativeEvent.contentOffset.y;
    Animated.timing(anime, {
      toValue: y,
      duration: 0,
    }).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16} // 16ms = 60fps
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: anime,
              },
            },
          },
        ])}>
        <Animated.View style={[styles.box, animatedStyle]}></Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  box: {
    width: '100%',
    height: 1000,
    backgroundColor: 'blue',
  },
});

export {Eventbased};
