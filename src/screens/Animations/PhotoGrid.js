import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {images} from '../../assets/imgs';

const PhotoGrid = () => {
  const {width: windowWidth} = Dimensions.get('window');
  const AnimatedImage = Animated.createAnimatedComponent(FastImage);

  // animated values
  const animated = React.useState(new Animated.Value(0))[0];
  const position = React.useState(new Animated.ValueXY(0))[0]; // (x, y)
  const size = React.useState(new Animated.ValueXY(0))[0]; // width, height -> hence XY
  const _X = React.useRef(0),
    _Y = React.useRef(0); // coordinates of the selected image
  const _width = React.useRef(0),
    _height = React.useRef(0); // width and height of the selected image

  const [activeImage, setActiveImage] = React.useState();
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const gridImages = React.useRef([]); // to store the refs to the image
  const viewImageRef = React.useRef(); // shared element image container
  const contentRef = React.useRef();

  // handlers
  const openImageHandlers = index => {
    // extract the size and position of the grid image
    gridImages.current[index].measure((x, y, width, height, pageX, pageY) => {
      // set the position of the shared element
      position.setValue({x: pageX, y: pageY});

      // set the size of the shared element
      size.setValue({x: width, y: height});

      // store the coordinates of the selected image
      _X.current = x;
      _Y.current = y;
      // store the width and height of the selected image
      _width.current = width;
      _height.current = height;

      // set the active image
      setActiveImage(images[index].toString());
      setActiveIndex(index);

      // animate the shared element
      Animated.parallel([
        // animate the position of the shared element
        Animated.spring(position.x, {
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.spring(position.y, {
          toValue: 0,
          useNativeDriver: false,
        }),

        // animate the size of the shared element
        Animated.spring(size.x, {
          toValue: windowWidth,
          useNativeDriver: false,
        }),
        Animated.spring(size.y, {
          toValue: 300,
          useNativeDriver: false,
        }),

        // animated the content details
        Animated.spring(animated, {
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start();
    });
  };

  const handleClose = () => {
    // reverse the animations
    Animated.parallel([
      // animate the position of the shared element back to the grid img
      Animated.spring(position.x, {
        toValue: _X.current,
        useNativeDriver: false,
      }),
      Animated.spring(position.y, {
        toValue: _Y.current,
        useNativeDriver: false,
      }),

      // animate the size of the shared element back to the grid img size
      Animated.spring(size.x, {
        toValue: _width.current,
        useNativeDriver: false,
      }),
      Animated.spring(size.y, {
        toValue: _height.current,
        useNativeDriver: false,
      }),

      // animate the content details
      Animated.spring(animated, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start(() => {
      // reset the values
      setActiveImage(null);
      setActiveIndex(-1);
    });
  };

  // interpolations
  const contentY = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0], // keeping the content hidden by default
  });

  // styles
  const activeIndexStyle = {
    opacity: activeImage ? 0 : 1, // hide the selected image in the photo grid
  };
  const activeImageStyle = {
    top: position.y,
    left: position.x,
    width: size.x,
    height: size.y,
    opacity: activeImage ? 1 : 0,
  };
  const animtedContentStyles = {
    opacity: animated,
    transform: [
      {
        translateY: contentY,
      },
    ],
  };
  const animatedClose = {
    opacity: activeImage ? 1 : 0,
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.grid}>
          {images.map((src, index) => {
            const style = index === activeIndex ? activeIndexStyle : undefined;

            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => openImageHandlers(index)}>
                <AnimatedImage
                  source={src}
                  style={[styles.gridImage, style]}
                  resizeMode="cover"
                  ref={image => (gridImages.current[index] = image)}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>

      {/* Details Modal */}
      <View
        style={StyleSheet.absoluteFill}
        pointerEvents={activeImage ? 'auto' : 'none'}>
        {/* the modal will be touchable only when the image is active */}
        <View
          style={styles.topContent}
          ref={image => (viewImageRef.current = image)}>
          <AnimatedImage
            key={activeImage}
            source={activeImage}
            resizeMode="cover"
            style={[styles.viewImage, activeImageStyle]}
          />
        </View>
        <Animated.View
          style={[styles.content, animtedContentStyles]}
          ref={textContent => (contentRef.current = textContent)}>
          <Text style={styles.title}>The best noodles in the world 🍜</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            lobortis interdum porttitor. Nam lorem justo, aliquam id feugiat
            quis, malesuada sit amet massa. Sed fringilla lorem sit amet metus
            convallis, et vulputate mauris convallis. Donec venenatis tincidunt
            elit, sed molestie massa. Fusce scelerisque nulla vitae mollis
            lobortis. Ut bibendum risus ac rutrum lacinia. Proin vel viverra
            tellus, et venenatis massa. Maecenas ac gravida purus, in porttitor
            nulla. Integer vitae dui tincidunt, blandit felis eu, fermentum
            lorem. Mauris condimentum, lorem id convallis fringilla, purus orci
            viverra metus, eget finibus neque turpis sed turpis.
          </Text>
        </Animated.View>
        <TouchableWithoutFeedback onPress={handleClose}>
          <Animated.View style={[styles.close, animatedClose]}>
            <Text style={styles.closeText}>X</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    width: '33.3%',
    height: 200,
  },
  viewImage: {
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topContent: {
    flex: 1,
  },
  content: {
    flex: 2,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeText: {
    backgroundColor: 'transparent',
    fontSize: 28,
    color: '#FFF',
  },
});

export {PhotoGrid};
