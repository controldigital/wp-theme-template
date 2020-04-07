const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/js/script.js',
  output: {
    filename: './dist/script.js',
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
                ['@babel/preset-env']
            ]
         }
        }
      },
    ]
  },
};