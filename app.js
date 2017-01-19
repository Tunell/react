'use strict';
var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
var swaggerDoc = require('./swagger.json');
var swaggerTools = require('swagger-tools');
var path = require('path');
let api_key = require('./config/config.json').security.api_key;

// Webpack configuration for react
// IF DEV ENVIRONMENT
if(!process.env.RDS_HOSTNAME) {
    var webpack = require('webpack');
    var config = require("./webpack.config.js");
    var WebpackDevServer = require('webpack-dev-server');
    var compiler = webpack(config);
    var server = new WebpackDevServer(compiler,{
        hot: true,
        stats: { colors: true },
        noInfo: true,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    });
    server.listen(8080);
}

var config = {
    appRoot: __dirname, // required config
    swaggerSecurityHandlers: {
        api_key: function (req, authOrSecDef, scopesOrApiKey, cb) {
            // your security code
            if (api_key === scopesOrApiKey) {
                cb(null);
            } else {
                cb(new Error('access denied!'));
            }
        }
    }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());
    });

    swaggerExpress.register(app);

    // IF PRODUCTION ENVIRONMENT
    if(process.env.RDS_HOSTNAME) {
        app.use(express.static('public'))
        app.get('/', function (req, res) {
            var test = path.resolve('./index.html');
            res.sendFile(test)
        })
    }

    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`
    Webserver running on                http://localhost:8080
    REST API running on                 http://localhost:3000
    API Documentation can be found at   http://localhost:3000/docs
`)
});