var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'HostelsAPI';

var plugins = [];
var outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /(\.jsx|\.js)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
