/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');
var path    = require('path');

module.exports = {

  output: {
    publicPath: path.resolve(__dirname, '../public'),
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js'
  },

  debug: false,
  devtool: false,
  entry: path.resolve(__dirname, '../src/client.js'),

  stats: {
    colors: true,
    reasons: false
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],

  resolve: {
    extensions: ['', '.js','.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, '../components'),
          path.resolve(__dirname, '../core'),
          path.resolve(__dirname, '../routes'),
          path.resolve(__dirname, '../transport'),
          path.resolve(__dirname, '../functions.js'),
          path.resolve(__dirname, '../src/client.js'),
        ],
        query: {
          presets: ['es2015','react','stage-0'],
          plugins: ["transform-runtime"],
          cacheDirectory: true
        }
      },
      {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }
  ]
  }
};
