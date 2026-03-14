module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@app': './src/app',
          '@screens': './src/screens',
          '@features': './src/features',
          '@entities': './src/entities',
          '@shared': './src/shared',
          '@widgets': './src/widgets',
          '@processes': './src/processes',
        },
      },
    ],
  ],
};
