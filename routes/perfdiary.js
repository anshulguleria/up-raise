
/*
 * GET performance diary page.
 */

exports.view = function(req, res){
	if(req.param('id')) {
		var User = require('../models/user');
		var PerfDiary = require('../models/perfDiary');
		PerfDiary.findOne({_id: req.param('id')}, function(err, doc) { 
			if(err) throw err;

			if(req.param('id') != doc.userId) {

				User.findOne({_id : doc.userId}, function(err, user) {
					if(err) throw err;

					return res.render('perfdiary', { title: 'Diary' ,  user: req.user, employee: user, 
				  		cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013'}
				  		,view: 'other' });
				});
			}else {
				return  res.render('perfdiary', { title: 'My Diary' ,  user: req.user, employee: req.user, cycle: { startDate: 'Apr 2013', 
					endDate: 'Sept 2013' }, view: 'self' });
			}			
		});
	}
	else {
		return  res.render('perfdiary', { title: 'My Diary' ,  user: req.user, employee: req.user, cycle: { startDate: 'Apr 2013', 
		endDate: 'Sept 2013' }, view: 'self' });	
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
	
	var diary  = new PerfDiary(req.body.perfdiary);

	diary.userId = req.user._id;
	
	diary.save(function(err) {
		if(err) throw err;
		return res.send({perfdiary: diary});
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
			};
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
