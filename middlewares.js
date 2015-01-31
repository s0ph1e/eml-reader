var express = require('express');
var expressHbs = require('express3-handlebars');
var multer = require('multer');

module.exports = function(app) {
	app.engine('hbs', expressHbs({ extname: 'hbs' }));
	app.set('view engine', 'hbs');

	app.use(express.static(__dirname + '/public'));
	app.use(multer({ inMemory: true }));
};
