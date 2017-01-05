const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const routes = require('./routes/route');

if (process.env.NODE_ENV != 'production'){
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

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes);

//TODO: ADD BASIC AUTH TO GET HOME ADDRESS

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest materials.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:8080');
});

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, "./index.html"));
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
})