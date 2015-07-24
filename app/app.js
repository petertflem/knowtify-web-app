var port = process.env.PORT || 5000;
var mongoose = require('mongoose');

/* Initialize the app */
var express = require('express');
var app = express();
var server = require("http").Server(app);

/* Connect to the database */
//mongoose.connect(require('./config/database').url);

/* Run the config */
require('./config/middleware')(app);
require('./config/routes')(app, express);

/* View engine and view directory */
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

/* Start the server */
server.listen(port);

// TEST
require('./services/loging-stream').init(server);
