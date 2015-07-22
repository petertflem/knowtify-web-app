var port = process.env.PORT || 5000;
var mongoose = require('mongoose');

/* Initialize the app */
var app = require('express')();
var server = require("http").createServer(app);

/* Connect to the database */
//mongoose.connect(require('./config/database').url);

/* View engine and view directory */
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

/* Initialize the routes */
require('./config/routes').initialize(app);

/* Start the server */
server.listen(port);

// TEST
require('./services/wws').init(server);
