module.exports = {
  entry: "./public/js/main.jsx",
  output: {
    filename: "./public/js/bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  watch: true



}
