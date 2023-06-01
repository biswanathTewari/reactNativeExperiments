module.exports = function (api) {
  // api.cache(false);
  const isIOS = api.caller(caller => {
    return caller?.platform === 'ios';
  });

  const plugins = [
    ['./plugins/use-shared-value.plugin.js'],
    ['react-native-reanimated/plugin'],
  ];

  if (!isIOS) {
    plugins.unshift(['./plugins/use-animated-style.plugin.js']);
  }

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins,
  };
};
