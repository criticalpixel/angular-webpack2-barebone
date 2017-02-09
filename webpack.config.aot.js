const path = require('path');
const webpack = require('webpack');
//plugins
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  entry: {
    main: "./src/main.aot.ts",
    polyfills: "./src/polyfills.aot.ts"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
  	extensions: ['.js', '.ts', '.json'],
  	 modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [path.resolve(__dirname, 'src/index.html')]
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
    new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['main']
    }),
    new AotPlugin({
      tsConfigPath: './tsconfig.aot.json',
      entryModule: path.resolve(__dirname, 'src/app/app.module#AppModule')
    }),
    new HtmlWebpackPlugin({
    	template: 'src/index.html',
    	chunksSortMode: 'dependency',
    	inject:'head'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            screw_ie8: true,
            warnings: false
        },
        mangle: {
            screw_i8: true
        }
    })
  ],
  devServer: {
    port: 4200,
    historyApiFallback:true
  }
};