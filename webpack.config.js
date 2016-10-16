const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
var postcssImport = require('postcss-import');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './app/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css', { allChunks: true, disable: !isProd }),
    new ProgressBarPlugin({ clear: false }),
    new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV)} })
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'app'],
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, "app")
        ]
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[local]_[hash:base64:5]!postcss?sourceMap')
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      precss, autoprefixer
    ];
  }
};