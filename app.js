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
        historyApiFallback: true,
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

app.use(function(req, res, next) {
    var authHeader = req.headers.authorization;

    // Check to see if the header exists
    // If not, return the challenge header and code
    if (authHeader === undefined) {
        res.header('WWW-Authenticate', 'Basic realm="Please sign in."');
        res.status(401).end();
        return;
    }

    // Split the header and grab the base64 encoded username:password
    var encodedHeader = authHeader.split(' ')[1];

    // Base64 decode the username:password string
    var decodedHeader = new Buffer(encodedHeader, 'base64').toString();

    var username = decodedHeader.split(':')[0];
    var password = decodedHeader.split(':')[1];

    // These could be environment variables
    // Check the credentials...
    if (username == 'hubben' && password == 'kunskapsnavet') {
        // and pass control on to our routes
        next();
    } else {
        res.header('WWW-Authenticate', 'Basic realm="Please sign in."');
        res.status(401).end('Incorrect login');
        //res.status(403).end('Incorrect login');
    }
});


SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    // install middleware
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());

			app.use(express.static('public'));

	    app.use(function (req, res, next) {
		    res.status(404);

		    // respond with html page
		    if (req.accepts('html')) {
			    res.sendFile(path.join(__dirname, "./index.html"));
			    return;
		    }

		    // respond with json
		    if (req.accepts('json')) {
			    res.send({error: 'Not found'});
			    return;
		    }

		    // default to plain-text. send()
		    res.type('txt').send('Not found');

	    });
    });

	swaggerExpress.register(app);

    // IF PRODUCTION ENVIRONMENT
    if(process.env.RDS_HOSTNAME) {
			app.use(express.static('public'));
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