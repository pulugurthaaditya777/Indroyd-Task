const path = require('path');

module.exports = {
  entry: './src/index.js',  // Adjust this based on your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "fs": false,  // If you don't need 'fs', you can set it to false
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Use .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Ensure you have Babel configured
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // Load CSS files
      },
    ],
  },
  devtool: 'source-map',  // Helpful for debugging
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
  },
};
