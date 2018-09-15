const webpack = require('webpack');
const path = require('path');

const OUTPUT_PATH = path.join(process.cwd(), 'build');
const OUTPUT_PUBLIC_PATH = 'https://localhost/assets/';


/**
 * Webpack configuration for common vendor bundle, using DllPlugin for long-term
 * bundle caching of vendor files. Only needs to be rebuilt when updating dependencies.
 */
module.exports = {
  mode: 'development', // Can be changed to production for minification
  context: process.cwd(), // Use current working directory
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'axios',
      'antd',
      'core-js',
    ],
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(OUTPUT_PATH, '[name].json'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // Ignore moment locale modules
  ],
};
