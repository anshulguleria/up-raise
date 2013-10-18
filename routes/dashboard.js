
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

	console.log('user id ' + req.user._id);
	KRA.find({ userId: req.user._id}).sort({updatedOn: -1}).execFind(function(err, doc) { 
		if(err) throw err;

		console.log('kras ' + doc);
		if(doc && doc.length > 0) {


			if(doc[0].goals.length > 0) {		
				goalids = doc[0].goals;
				console.log('getting goals');
				Goal.find({_id: { $in: doc[0].goals } }, function(err, g) {
					if(err) throw err;
					console.log('goals ' + g);
					dashgoals = g;					
				});
			}		
			
		}

		User.find({manager: req.user._id}).sort({firstName: 1}).execFind( function(err, users) {
			if(err) throw err;
			console.log('team users ' + users);
			if(users && users.length > 0) {
				for (var i = 0 ; i < users.length; i++) {
					var user = users[i];
					var item = { 
						name: user.firstName + ' ' + user.lastName,
						userId: user._id
						};
					
					KRA.find({ userId: user._id},function(err, success){ 
						if(err) throw err;
						item.areGoalsSet =  !err && success; 

						console.log('teamuser goals ' + success);
						if(item.areGoalsSet) {

							Cycle.find({ _id : success.cycleId }, function(err, cycles) { 
								if(err) throw err;
								if(cycles && cycles.length > 0) {
									item.appraisalDueDate = cycles[0].end;
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

				var responseObj = {
					_id: req.user._id,
					name: req.user.firstName + ' ' + req.user.lastName,
					goals: goalids,
					teamusers: teamusers,
					notes: dashnotes
				};

				console.log('response' + responseObj);
				return res.send({dashboards: [ responseObj], goals: dashgoals });
			});

		});

		//return res.send({dashboards: [] });
	});
	
};