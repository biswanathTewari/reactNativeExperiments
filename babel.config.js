module.exports = function (api) {
  api.cache(false);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ['./babel-plugin-shared-value.js'],
      ['./babel-plugin-animated-styles.js'],
      ['react-native-reanimated/plugin'],
    ],
  };
};
