
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

	KRA.findOne({ userId: req.user._id}, function(err, doc) { 
		if(err) throw err;

		if(!doc) {
			doc = new KRA({ userId: req.user._id});
			doc.save(function(err) { 
				if(err) throw err;
				
				KRA.findOne({ userId: req.user._id}, function(err, doc) { 
					if(err) throw err;

					if(!doc) {
						res.send({});
						return;
					}

					return res.send({reviewdocuments: [ doc ]});

				});
			});			
		} else {
			Goal.find({_id: { $in: doc.goals } }, function(err, goals) {
				if(err) throw err;

				return res.send({ reviewdocuments: [ doc ] , goals: goals });	
			})
			
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
	console.log('kra is ');
	console.log(kra);
	
	ReviewDocument.update({ _id: id }, {$set: kra}, function(err) {
		if(err) throw err;
		return res.send({reviewdocument: kra});
	});
	res.send({});
};