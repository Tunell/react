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
        publicPath: 'http://localhost:8080/'
    },
		devtool: 'eval',

    plugins: [
	    new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
        extensions : ['.jsx', '.webpack.js', '.web.js', '.js']
    },
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
        { test: /\.json$/, loader: 'json' }
      ]
    }
}];