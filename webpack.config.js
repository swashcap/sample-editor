'use strict';

var PATHS = {
  app: __dirname + '/app',
  bower: __dirname + '/bower_components'
};

module.exports = {
  context: PATHS.app,
  entry: {
    app: ['./scripts/app.js']
  },
  output: {
    path: PATHS.app,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jsx-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
