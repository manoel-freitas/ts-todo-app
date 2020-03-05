const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.NODE_ENV

const plugins = []

if (mode === 'production') {
  plugins.push(new CopyPlugin([
    { from: 'app.css', to: 'app.css' },
  ]))
  plugins.push(new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, 'dist/index.html'),
    template: 'index.html',
    inject: true,
    // minify: {
    //   removeComments: true,
    //   collapseWhitespace: true,
    //   removeAttributeQuotes: true
    // },
    chunksSortMode: 'dependency'
  }))
}

if (mode === 'development') {
  plugins.push(new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  }))
}

module.exports = {
  mode,
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: mode === 'production' ? '' : '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins
};