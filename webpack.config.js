module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!(stardust))/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [
          'transform-decorators-legacy',
        ],
        presets: ['es2015', 'react', 'stage-1'],
      },
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};


