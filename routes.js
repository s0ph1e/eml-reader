var ctrl = require('./controllers/index');

module.exports = function(app) {
	app.get('/', ctrl.index);
	app.post('/read', ctrl.read);
};
