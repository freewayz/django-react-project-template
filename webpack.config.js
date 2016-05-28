var path          = require('path')
var webpack       = require('webpack')
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,
  entry: './project_name/static/js/index',
  output: {
    path: path.resolve('./project_name/static/bundles'),
    filename: '[name].js',
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  }
}
