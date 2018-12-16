const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname + '/src/index.ts'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'react-seo-meta-tags.js',
    libraryTarget: 'umd',
    library: 'react-seo-meta-tags',
  //   umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  // plugins: [
  //   new UglifyJSPlugin({
  //     // minimize: true,
  //     sourceMap: true,
  //     include: /\.min\.js$/,
  //   })
  // ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        query: {
          declaration: false,
        }
      },
    ]
  }
}
