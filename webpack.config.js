// webpack.config.js
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
  /** DEV CONFIG **/
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/app.js'
  ],
  output: {
    path: __dirname + "/public",
    filename: 'bundle.js',
    library: 'MyApp',
    publicPath: '/'
  },
  devtool: 'eval',

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/cptable/)
  ],
  resolve:{
    extensions : ['.jsx', '.webpack.js', '.web.js', '.js']
  },
  externals: [
    {  "./cptable": "var cptable",  "./jszip": "jszip" }
  ],
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader:'style-loader',
            query:{ sourceMap : true }
          },
          {
            loader:'css-loader',
            query:{
              sourceMap : true,
              modules : true,
              importLoaders : 2,
              localIdentName : '[name]__[local]___[hash:base64:5]'
            }
          },
          'autoprefixer-loader',
          {
            loader:'less-loader',
            query:{ strictMath : true }
          }
        ]
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.(jpg|png|gif|jpeg|eot|woff|ttf|svg)$/,
        use: "file-loader?name=[path][name].[ext]?[hash]"
      }
    ]
  }
}];