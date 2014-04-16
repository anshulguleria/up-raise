exports.display = function(req, res){
  res.render('admin/cycles', { title: 'Cycle Listing' ,  user: req.user });
};

var Cycle = require('../../models/cycle');	

exports.list = function(req, res) {
	
	Cycle.find({ companyId: req.user.companyId })
	.sort({startDate: -1})
	.exec(function(err, cycles) {

		return res.send({ cycles: cycles });	
	});

};

exports.create = function(req, res) {
	
	var cycle  = new Cycle(req.body.cycle);
	
	cycle.companyId = req.user.companyId;

	cycle.isEnabled = true;
	
	cycle.save(function(err) {
		if(err) throw err;
		res.send({cycle: cycle});
	});
};

exports.update = function(req, res) {
	var Cycle = require('../../models/cycle');
	
	var cycle  = req.body.cycle;
	var id = req.param('id');


	Cycle.findOneAndUpdate({_id: id},{$set: cycle },function(err, doc) {
		if(err) throw err;
		res.send({cycle: doc });
	});	

};

exports.delete = function(req, res) {
	var Cycle = require('../../models/cycle');
	
	var id = req.param('id');


Cycle.remove({ _id: id }, function(err,doc) {
    if (!err) {
            res.send(true);
    }
    else {
            throw err;
    }
});
};