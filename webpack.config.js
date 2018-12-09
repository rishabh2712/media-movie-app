const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './src/scripts/app.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
    }]
  },
  optimization: {
		// We no not want to minimize our code.
		minimize: false
	},
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  devServer: {
    contentBase: '/',
    hot: true,
    index: './index.html',
    historyApiFallback: {
      index: './index.html'
    } 
  }
};