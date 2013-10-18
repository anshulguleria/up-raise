exports.create = function(req, res) {
	console.log(req.body);
	var Note = require('../models/note');
	var note  = new Note(req.body.note);
	note.userId = req.user._id;
	console.log('note is ');
	console.log(note);
	note.save(function(err) {
		if(err) throw err;
		res.send({note : note});
	});	
};