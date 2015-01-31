var express = require('express');
var addMiddlewares = require('./middlewares');
var addRoutes = require('./routes');

var app = express();
addMiddlewares(app);
addRoutes(app);

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port)
});