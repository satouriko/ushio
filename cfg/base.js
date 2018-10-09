'use strict';
const webpack = require('webpack');
const path = require('path');
const defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
const additionalPaths = [];

module.exports = {
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'ushio.js',
    library: 'Ushio',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {}
};