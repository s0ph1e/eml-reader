var express = require('express');
var addMiddlewares = require('./middlewares');
var addRoutes = require('./routes');

var app = express();
addMiddlewares(app);
addRoutes(app);

var server = app.listen(process.env.PORT || 3000, '0.0.0.0', function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Eml Reader app listening at http://%s:%s', host, port);
});

process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})
