var MailParser = require('mailparser').MailParser;

module.exports = {
	index: function index(req, res) {
		res.render('index.html');
	},

	read: function read(req, res) {
		var mailparser = new MailParser();
		mailparser.on('end', function(email) {
			res.json(email);
		});

		mailparser.write(req.files.file.buffer.toString());
		mailparser.end();
	}
};
