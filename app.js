var express             = require('express'),
    app                 = express(),
    router              = express.Router(),
    bodyParser          = require('body-parser'),
    methodOverride      = require('method-override'),
    mysql               = require('mysql');

app.use(express.static(__dirname + '/public/'));

app.use(bodyParser.urlencoded({'extended': 'true'}));                        //parse application/x-www-form-urlencoded

app.use(bodyParser.json());                                                  //parse application/json

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));              //parse application/vnd.api+json as json

app.use(methodOverride());

//Routes

require('./config/routes.js')(app, router, mysql);

app.listen(80);
console.log("Connected at port: 8000")