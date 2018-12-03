const webpack = require('webpack')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname + '/src/index.ts'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'react-seo.min.js',
    libraryTarget: 'umd',
    library: 'react-seo',
  },
  // entry: {
  //   'react-seo': './src/index.ts',
  //   'react-seo.min': './src/index.ts'
  // },
  // output: {
  //   path: path.resolve(__dirname, '_bundles'),
  //   filename: '[name].js',
  //   libraryTarget: 'umd',
  //   library: 'react-seo',
  //   umdNamedDefine: true
  // },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin({
      ANALYTICS_VERSION: '1.0.0',
    }),
    new UglifyJSPlugin({
      // minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,
    })
  ],
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  module: {
    rules: [
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
