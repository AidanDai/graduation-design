const path = require('path')
const webpack = require('webpack')

const buildPath = path.resolve(__dirname, '../assets')
const vendors = ['react', 'react-dom', 'antd', 'whatwg-fetch', 'moment']

module.exports = {
  entry: { 
    lib: vendors 
  },
  output: {
    path: buildPath,
    filename: 'javascripts/library/core.js',
    library: 'core',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(buildPath, 'javascripts/library/manifest.json'),
      context: path.resolve(__dirname, '../')
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    })
  ],
  context: path.join(__dirname, '../'),
  stats: 'errors-only',
  devtool: 'source-map',

  cache: true,
  watch: false
};