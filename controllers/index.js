var MailParser = require('mailparser').MailParser;

module.exports = {
	index: function index(req, res) {
		res.render('index.html');
	},

	read: function read(req, res) {
		var mailparser = new MailParser();
		
		if (req.files.file.mimetype == 'message/rfc822') {
                	mailparser.on('end', function(email) {
                        	res.json(email);
                       	});
                       	mailparser.write(req.files.file.buffer.toString());
               	} else {
                		res.json({ text: '', headers:{ eml_error:'eml_error' } });
                       		mailparser.write('');
		}
		
		mailparser.end();
	}
};
