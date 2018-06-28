/*******************************
 * Import Required Modules
 ****************************/
var express = require('express');
var bodyParser = require('body-parser');
var path = require("path")
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemDB = require('./modules/mem-db')

/*******************************
 * Require Configuration
 ****************************/
var conf = require('./conf');

/*******************************
 * MongoDB Initializaion
 ****************************/

app.use(bodyParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
/*
//For Static Files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/webapps'));
app.use(layout());*/


app.use(cookieParser());
app.use(session({secret: "openkey"}));


app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,__setXHR_');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = require('http').Server(app);
var memdb = new MemDB(conf)
memdb.connect(function(db) {
    server.listen(conf['web']['port'], function() {
        console.log('API running on localhost:' + conf['web']['port'])
    });
    app.db = db;
    app.conf = conf;
    //Initializing the web routes
    var Routes = require('./routes/http-routes');
    new Routes(app);
});