exports.post = function(req, res) {
	var DiaryItem = require('../models/diaryItem');
	var diaryitem  = new DiaryItem(req.body.diaryitem);
	diaryitem.addedBy = req.user._id;
	diaryitem.addedByName = req.user.firstName + ' ' + req.user.lastName;
	diaryitem.addedOn = new Date();
	diaryitem.save(function(err) {
		if(err) throw err;
		var item  = diaryitem.toObject();
		item.canEdit = diaryitem.addedBy.toString() == req.user._id;

		res.send({diaryitem: item});
	});	
};

exports.put = function(req, res) {
	var DiaryItem = require('../models/diaryItem');
	var diaryitem  = req.body.diaryitem;
	var id = req.param('id');

	DiaryItem.findOneAndUpdate({_id: id},{$set: diaryitem }).lean().exec(function(err, doc) {
		if(err) throw err;
		doc.canEdit = doc.addedBy.toString() == req.user._id;
		res.send({diaryitem: doc});
	});	
};

exports.delete = function(req, res) {
	
	var DiaryItem = require('../models/diaryItem');
	var diaryitem  = req.param('id');
	DiaryItem.remove({_id: diaryitem}, function(err) {
		if(err) throw err;
		res.send(null);
	});	
};
