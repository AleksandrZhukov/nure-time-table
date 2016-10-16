const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');
const discardComments = require('postcss-discard-comments');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const PLUGINS = [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('app.css', { allChunks: true, disable: !isProd }),
  new ProgressBarPlugin({ clear: false }),
  new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV)} })
];

if (isProd) {
  PLUGINS.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  )
}

module.exports = {
  devtool: isProd ? undefined : 'cheap-module-eval-source-map',
  entry: isProd ? ['babel-polyfill', './app/index']: ['webpack-hot-middleware/client', 'babel-polyfill', './app/index'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js'
  },
  plugins: PLUGINS,
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
          path.resolve(__dirname, 'app')
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
      precss,
      autoprefixer,
      discardComments({removeAll: true})
    ];
  }
};