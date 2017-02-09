'use strict';

const helpers = require('./helpers');
const webpack = require('webpack');
//plugins
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  entry: {
    main: "./src/main.ts",
    polyfills: "./src/polyfills.ts"
  },
  output: {
    path: helpers.root('dist'),
    filename: "[name].bundle.js",
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
  	extensions: ['.js', '.ts', '.json'],
  	 modules: [helpers.root('src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    // This enables tree shaking of the vendor modules
    new CommonsChunkPlugin({
            name: 'polyfills',
            chunks: ['polyfills']
        }),
    new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules\//.test(module.resource)
    }),
    new CheckerPlugin(),
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src') // location of your src
    ),
    new HtmlWebpackPlugin({
    	template: 'src/index.html',
    	chunksSortMode: 'dependency',
    	inject:'head'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    // new UglifyJsPlugin({
    //     beautify: false,
    //     comments: false,
    //     compress: {
    //         screw_ie8: true,
    //         warnings: false
    //     },
    //     mangle: {
    //         screw_i8: true
    //     }
    // })
  ],
};