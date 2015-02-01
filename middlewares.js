var express = require('express');
var multer = require('multer');

module.exports = function(app) {
	app.engine('html', require('ejs').renderFile);

	app.use(express.static(__dirname + '/public'));
	app.use(multer({ inMemory: true }));
};
