exports.display = function(req, res){
  res.render('admin/departments', { title: 'Department Listing' ,  department: req.user });
};

var Department = require('../../models/department');	

exports.list = function(req, res) {
	
	Department.find({ companyId: req.user.companyId }, function(err, departments) {

		return res.send({ departments: departments });	
	});

};

exports.create = function(req, res) {
	
	var department  = new Department(req.body.department);
	
	department.companyId = req.user.companyId;

	department.isEnabled = true;
	
	department.save(function(err) {
		if(err) throw err;
		res.send({department: department});
	});
};

exports.update = function(req, res) {
	var Department = require('../../models/department');
	
	var department  = req.body.department;
	var id = req.param('id');

	
	Department.findOneAndUpdate({_id: id},{$set: department },function(err, doc) {
		if(err) throw err;
		res.send({department: doc });
	});	
};

exports.delete = function(req, res) {
	var Department = require('../../models/department');
	
	var id = req.param('id');

	Department.findOneAndUpdate({_id: id},{$set: {isEnabled: false} },function(err, doc) {
		if(err) throw err;
		res.send(null);
	});	
};