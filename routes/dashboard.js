
/*
 * GET dashboard page.
 */

exports.display = function(req, res){
	res.render('dashboard', { title: 'My Dash',  user: req.user });
};

exports.list = function(req, res) {
	var KRA = require('../models/reviewDocument');
	var Goal = require('../models/goal');
	var User = require('../models/user');
	var Note = require('../models/note');
	var Cycle = require('../models/cycle');
	var dashgoals = [];
	var teamusers = [];
	var dashnotes = [];
	var goalids = [];
	var noteids = [];
	var teamuserids = [];
	var kra = {};

	KRA.find({ userId: req.user._id}).sort({updatedOn: -1}).execFind(function(err, doc) { 
		if(err) throw err;

		if(doc && doc.length > 0) {

			kra = doc[0];

			if(doc[0].goals.length > 0) {		
				goalids = doc[0].goals;
				Goal.find({_id: { $in: doc[0].goals } }, function(err, g) {
					if(err) throw err;
					dashgoals = g;					
				});
			}		
			
		}

		User.find({managerId: req.user._id}).sort({firstName: 1}).execFind( function(err, users) {
			if(err) throw err;
			if(users && users.length > 0) {
				for (var i = 0 ; i < users.length; i++) {
					var user = users[i];
					var item = { 
						name: user.firstName + ' ' + user.lastName,
						userId: user._id,
						_id: user._id
						};
					teamuserids.push(user._id);
					
					KRA.find({ userId: user._id},function(err, success){ 
						if(err) throw err;
						item.areGoalsSet = (success != null); 

						console.log(item.areGoalsSet);

						if(item.areGoalsSet) {

							Cycle.find({ _id : success.cycleId }, function(err, cycles) { 
								if(err) throw err;
								if(cycles && cycles.length > 0) {
									item.appraisalDueDate = cycles[0].end;
									var moment = require('moment');
									item.isAppraisalDue = moment(appraisalDueDate).diff(new Date(), 'days') < 30;
								}
							});
						}

						teamusers.push(item);
					});
				}
			}
				
		

			Note.find({ userId: req.user._id}).sort({ addedOn: -1 }).execFind(function(err, notes) {
				if(err) throw err;
				dashnotes = notes;
				for (var i = 0; i < notes.length; i++) {
					 noteids.push(notes[i]._id);
				};

				var responseObj = {
					_id: req.user._id,
					name: req.user.firstName + ' ' + req.user.lastName,
					reviewdocument: kra._id,
					teamusers: teamuserids,
					notes: noteids
				};

				return res.send({dashboards: [ responseObj ], reviewdocuments: [kra], goals: dashgoals, notes: dashnotes, teamusers: teamusers });
			});

		});

		//return res.send({dashboards: [] });
	});
	
};