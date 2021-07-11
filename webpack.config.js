module.exports = {
  target: 'web',
  entry: {
    'lib/bundle': './src/index.js',
    'example/dist/bundle': './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname 
  },
  module: {
    rules: [
      {
        test: /\.shader$/i,
        use: 'raw-loader',
      },
    ]
  }
}