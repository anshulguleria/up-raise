
/*
 * GET goals page.
 */

exports.display = function(req, res){
  res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user, 
  	goals: {
  		cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013' },
		status: 'pending'
				
  	}
  	, view: 'self' });
};

exports.list = function(req, res) {
	var KRA = require('../models/reviewDocument');
	var Goal = require('../models/goal');

	KRA.find({ userId: req.user._id}, function(err, doc) { 
		if(err) throw err;

		if(!doc || doc.length == 0) {
			doc = new KRA({ userId: req.user._id, type: 'draft'});
			doc.save(function(err) { 
				if(err) throw err;
				
				return res.send({reviewdocuments: [ doc ]});

			});
			
		} else {
			var allGoals = [];

			for (var i = doc.length - 1; i >= 0; i--) {
				console.log(doc[i]);
				allGoals = allGoals.concat(doc[i].goals);
			};
			console.log(allGoals);
			if(allGoals.length > 0) {			
				console.log('getting goals');
				Goal.find({_id: { $in: allGoals } }, function(err, goals) {
					if(err) throw err;

					return res.send({ reviewdocuments:  doc , goals: goals });	
				});
			} else {
				console.log('no goals array');
				return res.send({ reviewdocuments:  doc });	
			}
			
		}
	});
	
};

exports.put = function(req, res) {
	console.log(req.body);

	var mongoose = require('mongoose')
	   ,Schema = mongoose.Schema
	   ,ObjectId = Schema.ObjectId;

	var ReviewDocument = require('../models/reviewDocument');
	var kra  = req.body.reviewdocument;
	
	console.log(req.param('id'));	
	
	var id = req.param('id');
	
	ReviewDocument.findOneAndUpdate({ _id: id }, {$set: kra}, function(err, doc) {
		if(err) throw err;

		if(kra.type == 'request') {
			//send email
		};
		return res.send({reviewdocument: doc});
	});
	res.send({});
};


exports.delete = function(req, res) {
	console.log(req.body);


	var ReviewDocument = require('../models/reviewDocument');
	var Goal = require('../models/goal');
	var item  = req.param('id');
	console.log(item);
	
	ReviewDocument.findOne({_id: item}, function(err, doc) {
		if(err) throw err;
		if(doc) {
			doc.goals.forEach(function(item){
				console.log('goal id: ' + item);
				Goal.remove({_id: item}, function(err){});
			});
		} 
	});

	ReviewDocument.remove({_id: item}, function(err) {
		if(err) throw err;
		res.send(null);
	});	
	
};