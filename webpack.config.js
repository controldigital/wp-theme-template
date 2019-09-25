const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/script.js',
  output: {
    filename: './dist/js/script.js',
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
							[
								'@babel/preset-env', {
									useBuiltIns: "usage",
									corejs: 3,
								}
							]
						]
         }
        }
      },
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/js/components'),
      Modules: path.resolve(__dirname, 'src/js/modules'),
      Utilities: path.resolve(__dirname, 'src/js/utilities'),
      Vendor: path.resolve(__dirname, 'src/js/vendor')
    }
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      }),
    ]
  }
};