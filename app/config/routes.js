var fs = require('fs');

module.exports = function (app, express) {

  // Serves static content like CSS and JavaScript
	app.use(express.static(__dirname + '/../wwwroot/assets'));

  // This binds up all of the api data endpoints
  fs.readdirSync('app/api').forEach(function (file) {
    require('../api/' + file.replace('.js', ''))(app);
  });

  app.get('/', function(req, res) {
    res.render('home');
  });
};
