
/*
 * GET goals page.
 */

exports.list = function(req, res) {
	var Goal = require('../models/goal');

	console.log(req.param('ids'));

	var ids = req.param('ids').join(',');

	console.log(ids);
	
	Goal.find({ _id: { $in: [ids] } }, function(err, doc) { 
		if(err) throw err;

		console.log(doc);
	
		return res.send({ goals: [ doc ] });	
	});
	
};

exports.put = function(req, res) {
	var Goal = require('../models/goal');
	var goal  = req.body.goal;
	var id = req.param('id');

	console.log('goal is ');
	console.log(goal);
	Goal.findOneAndUpdate({_id: id},{$set: goal },function(err, doc) {
		if(err) throw err;
		res.send({goal: doc});
	});	
};

exports.delete = function(req, res) {
	
	var Goal = require('../models/goal');
	var goal  = req.param('id');
	console.log('goal is ');
	console.log(goal);
	Goal.remove({_id: goal}, function(err) {
		if(err) throw err;
		res.send(null);
	});	
};

exports.post = function(req, res) {
	var Goal = require('../models/goal');
	var goal  = new Goal(req.body.goal);
	goal.save(function(err) {
		if(err) throw err;
		res.send({goal: goal});
	});	
};
