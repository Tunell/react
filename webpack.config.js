// webpack.config.js
var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    /** DEV CONFIG **/
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/app.js'
    ],
    output: {
        path: __dirname,
        filename: 'target/bundle.js',
        library: 'MyApp',
        publicPath: 'http://localhost:8080/'
    },
        devtool: 'eval',
        debug: true,
    
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
        new webpack.NoErrorsPlugin(), // recommanded by webpack
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve:{
        extensions : ['', '.jsx', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.less$/,
            loaders: [
                'style?sourceMap',
                'css?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
                'autoprefixer',
                'less?strictMath'
            ]
        },
        { test: /\.json$/, loader: 'json' }
      ]
    }
},
{
    /** PROD CONFIG **/
    entry: [
        'promise-polyfill',
        'whatwg-fetch',
        './src/app.js',
    ],
    output: {
        path: __dirname,
        filename: 'target/bundle.js',
        library: 'MyApp'
    },
        devtool: 'source-map',

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(), // recommanded by webpack
        new webpack.NoErrorsPlugin(), // recommanded by webpack
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.UglifyJsPlugin({mangle:false, warnings:false}),
        new ExtractTextPlugin('target/app.css', {
            allChunks: true
        })
    ],
    resolve:{
        extensions : ['', '.jsx', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel'
        },
        {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                'style?sourceMap',
                'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer!less?strictMath'
            )
        },
        { test: /\.json$/, loader: 'json' }
      ]
    }
}];