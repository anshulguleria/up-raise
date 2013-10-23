
/*
 * GET team listing page.
 */

exports.display = function(req, res){
  res.render('team', { title: 'Team' ,  user: req.user });
};

exports.list = function(req, res) {
	var KRA = require('../models/reviewDocument');
	var User = require('../models/user');
	var Cycle = require('../models/cycle');
	var teamusers = [];
	var async = require('async');

	User.find({managerId: req.user._id}).sort({firstName: 1}).execFind( function(err, users) {
		if(err) throw err;

		if(users && users.length > 0) {
			
			console.log('found users ' + users.length);
			var userfuncs = [];

			for (var i = 0 ; i < users.length; i++) {
				var user = users[i];
				var item = { 
					name: user.firstName + ' ' + user.lastName,
					userId: user._id,
					_id: user._id
					};
				
				userfuncs.push(function(callback) { 
					KRA.find({ userId: user._id},function(err, success){ 
						if(err) callback(err);

						item.areGoalsSet = (success != null); 

						if(item.areGoalsSet) {

							Cycle.findOne({ _id : success.cycleId }, function(err, cycle) { 
								if(err) throw err;
								
								if(cycle) {
									item.appraisalDueDate = cycle.end;
									var moment = require('moment');
									item.isAppraisalDue = moment(appraisalDueDate).diff(new Date(), 'days') < 30;
								}
							});
						}

						teamusers.push(item);
						callback();
					});
				});
			}

			async.parallel(userfuncs, function(err) {
				
				if(err) throw err;

				return res.send({teamusers: teamusers});
			});
			
		}else {

			return res.send({teamusers: teamusers});	
		}
			
	});
};