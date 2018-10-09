'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../demo/src/index.js'),
  output: {
    path: path.join(__dirname, '/../demo/public'),
    filename: 'main.[hash].js'
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../demo/src/index.html'),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: defaultSettings.getDefaultModules()
});

module.exports = config;