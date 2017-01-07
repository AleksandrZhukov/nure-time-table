const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const postcssImport = require('postcss-import');
const discardComments = require('postcss-discard-comments');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');

const isProd = process.env.NODE_ENV === 'production';

const PLUGINS = [
  new ExtractTextPlugin('app.css', { allChunks: true }),
  new ProgressBarPlugin({ format: `build [${chalk.green(':bar')}] ${chalk.green.bold(':percent')} (:elapseds)`, clear: false }),
  new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } }),
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.jade'
  })
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
  context: path.resolve(__dirname, 'app'),
  entry: isProd
    ? ['babel-polyfill', './index.js']
    : ['webpack-dev-server/client?http://0.0.0.0:3000', 'babel-polyfill', './index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/'
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
        include: [path.resolve(__dirname, 'app')]
      },
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[local]_[hash:base64:5]!postcss?sourceMap')
      },
      {
        test: /\.jade$/,
        loader: 'pug'
      }
    ]
  },
  postcss: function(webpack) {
    return [
      postcssImport({ addDependencyTo: webpack }),
      precss,
      autoprefixer,
      discardComments({ removeAll: true })
    ];
  },
  devServer: {
    port: 3000,
    inline: true,
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3003',
        secure: false
      }
    },
    stats: {
      colors: true,
    }
  }
};
