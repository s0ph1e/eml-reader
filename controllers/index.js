module.exports = {
	index: function index(req, res) {
		res.render('index');
	},

	read: function read(req, res) {
		res.json(req.files);
	}
};
