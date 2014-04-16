
/*
 * GET performance diary page.
 */

exports.view = function(req, res){
	var cycle = { startDate:'', endDate: ''};
		
	if(req.param('id')) {
		var User = require('../models/user');
		var PerfDiary = require('../models/perfDiary');
		var Cycle = require('../models/cycle');
		var async = require('async');

		


		PerfDiary.findOne({_id: req.param('id')}, function(err, doc) { 
			if(err) throw err;

			if(doc && req.param('id') != doc.userId) {
				var user = {};

				async.parallel([
						function(callback) {
							User.findOne({_id : doc.userId}, function(err, userItem) {
								if(err) return callback(err);
								user = userItem;
								return callback();
							});
						},
						function(callback) {
							Cycle.findOne({_id: doc.cycleId}, function(err, cycleItem) {
								if(err) return callback(err);								
								
								if(cycleItem) {
									var moment = require('moment');
									cycle.startDate = moment(cycleItem.startDate).format('MMM YY');
									cycle.endDate = moment(cycleItem.endDate).format('MMM YY');
								}

								return callback();
							});
						}
					], 
					function(err) { 
							if(err) throw err;
								
							return res.render('perfdiary', { title: 'Diary' ,  user: req.user, employee: user, 
							  		cycle: cycle
									,view: 'other' });
				});

			}else {
				return  res.render('perfdiary', { title: 'My Diary' ,  user: req.user, employee: req.user, cycle: cycle, view: 'self' });
			}
		});
	}
	else {
		return  res.render('perfdiary', { title: 'My Diary' ,  user: req.user, employee: req.user, cycle: cycle, view: 'self' });
	}
};

exports.displayForUser = function(req, res) {
	var PerfDiary = require('../models/perfDiary');
	var userId = req.param('userId');
	PerfDiary.findOne({userId: userId}, function(err, doc) {
			if(err) throw err;
			if(doc) {
				return res.redirect('/perfdiary/' + doc._id + '#/' + doc._id);
			} else if(userId == req.user._id) {

				return res.redirect('/perfdiary');
			} else {
				return res.redirect('/perfdiary#/notfound');
			}
	});

	
};

exports.post = function(req, res) {

	var PerfDiary = require('../models/perfDiary');
	
	var Cycle = require('../models/cycle');
			
	var diary  = new PerfDiary(req.body.perfdiary);

	diary.userId = req.user._id;

	Cycle.findOne({ companyId: req.user.companyId})
		.sort({startDate: -1})
		.exec( function(err, cycleItem) {
			if(err) throw err;
		
			if(cycleItem) {
				diary.cycleId = cycleItem._id;
			}

			diary.save(function(err) {
				if(err) throw err;
				return res.send({perfdiary: diary});
			});
		});
			
};

exports.list = function(req, res) {

	var PerfDiary = require('../models/perfDiary');
	var DiaryItem = require('../models/diaryItem');

	var userId = '';

	if(req.param('id')) {
		id = req.param('id');
	
		PerfDiary.find({ _id: id}, function(err, doc) {
			if(err) throw err;

			var allItems = [];

			for (var i = doc.length - 1; i >= 0; i--) {
				allItems= allItems.concat(doc[i].diaryitems);
			}
			if(allItems.length > 0) {
				DiaryItem.find({_id: { $in: allItems } }).lean().exec(function(err, items) {
					if(err) throw err;
					//var itemsObj = items.toObject();
					items.forEach(function(item) {
						item.canEdit = item.addedBy.toString() == req.user._id;
						
					});
					return res.send({ perfdiaries:  doc , diaryitems: items });
				});
			} else {
				return res.send({ perfdiaries:  doc });
			}
			
		});
	} else {
		return res.send(null);
	}
	
};


exports.put = function(req, res) {
	

	var mongoose = require('mongoose')
	   ,Schema = mongoose.Schema
	   ,ObjectId = Schema.ObjectId;

	var PerfDiary = require('../models/perfDiary');
	var perfdiary  = req.body.perfdiary;
	
	
	var id = req.param('id');
	
	PerfDiary.findOneAndUpdate({ _id: id }, {$set: perfdiary}, function(err, doc) {
		if(err) throw err;

		return res.send({perfdiary: doc});
	});
	res.send({});
};
