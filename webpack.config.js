const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'my-lib': './src/index.ts',
    'my-lib.min': './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      ANALYTICS_VERSION: '1.0.0',
      API_URL: process.env.WA_URL || 'https://ueu06c6kc0.execute-api.eu-west-1.amazonaws.com/prod'
    }),
    new UglifyJSPlugin({
      // minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        declaration: false,
      }
    }]
  }
}
