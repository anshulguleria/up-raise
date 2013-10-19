exports.create = function(req, res) {
	console.log(req.body);
	var Note = require('../models/note');
	var note  = new Note(req.body.note);
	note.userId = req.user._id;
	note.save(function(err) {
		if(err) throw err;
		res.send({note : note});
	});	
};

exports.delete = function(req, res) {
	
	var Note = require('../models/note');
	var note  = req.param('id');
	Note.remove({_id: note}, function(err) {
		if(err) throw err;
		res.send(null);
	});	
};
