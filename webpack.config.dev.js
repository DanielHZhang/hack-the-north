import webpack from 'webpack';
import {join} from 'path';
import ProgressPlugin from 'simple-progress-webpack-plugin';

const OUTPUT_PATH = join(process.cwd(), 'build');
const OUTPUT_PUBLIC_PATH = 'https://localhost/assets/';

export default {
  mode: 'development',
  entry: {
    app: [
      'react-hot-loader/patch',
      '@babel/polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      join(process.cwd(), 'src', 'index.jsx'),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
      },
      {
        test: /\.scss$/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}],
      },
      {
        test: /\.less$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|png|woff|woff2|eot|ttf|svg|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 50000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new ProgressPlugin({format: 'minimal'}),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(join(process.cwd(), 'build', 'vendor.json')),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  node: {
    fs: 'empty',
  },
};
