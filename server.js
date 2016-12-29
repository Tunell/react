
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

var DATABASE = path.join(__dirname, 'materials.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



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


app.get('/api/used-materials', function(req, res) {
    // USER SPECIFIED IN URL PARAM
    // GET COMPLETE ALL USED MATERIALS FOR SPECIFIED USER

    fs.readFile(DATABASE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/used-materials', function(req, res) {

    // ADD A NEW USED MATERIAL

    fs.readFile(DATABASE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var materials = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.
        var newUsedMaterial = {
            Material_id: req.body.Material_id,
            User_id: req.body.User_id,
            amount: req.body.amount,
            comment: req.body.comment
        };
        materials.push(newUsedMaterial);
        fs.writeFile(DATABASE, JSON.stringify(materials, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(materials);
        });
    });
});

// FOR ALL POSTS:
//      ADD PUT (CHANGE THE USED MATERIAL) AND DELETE!!!


app.get('/api/raw-materials', function(req, res) {
    // USER SPECIFIED IN URL PARAM
    // GET COMPLETE CONSTRUCTIONPART, FOR SPECIFIED USER

  fs.readFile(DATABASE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/raw-materials', function(req, res) {

    // ADMIN ADD A NEW RAW MATERIAL
    // ADD TO BOTH RAW MATERIAL TABLE AND MATERIALS TABLE!

  fs.readFile(DATABASE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var materials = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.


    var newRawMaterial = {
        User_id: req.body.User_id,
        name: req.body.name,
        unit: req.body.unit
    };
    materials.push(newRawMaterial);
    fs.writeFile(DATABASE, JSON.stringify(materials, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(materials);
    });
  });
});


app.get('/api/materials', function(req, res) {
    // USER SPECIFIED IN URL PARAM
    // GET COMPLETE CONSTRUCTIONPART, FOR SPECIFIED USER

    fs.readFile(DATABASE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/api/materials', function(req, res) {

    // ADD A NEW MATERIAL/CONSTRUCTION PART
    // ONLY MATERIALS

    fs.readFile(DATABASE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var materials = JSON.parse(data);
        // NOTE: In a real implementation, we would likely rely on a database or
        // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
        // treat Date.now() as unique-enough for our purposes.


        // MATERIAL COMPOSITION ALSO HAS RECYCLE CLASS ID!!
        var newMaterial = {
						id: Date.now(),
            User_id: req.body.User_id,
            name: req.body.name,
            unit: req.body.unit,
            materialComposition: req.body.materialComposition,
        };
        materials.push(newMaterial);
        fs.writeFile(DATABASE, JSON.stringify(materials, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(materials);
        });
    });
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