exports.display = function(req, res){
  res.render('admin/permissions', { title: 'Permission Listing' ,  user: req.user });
};

var Permission = require('../../models/permission');	

exports.list = function(req, res) {
	
	Permission.find(function(err, permissions) {

		return res.send({ permissions: permissions });	
	});

};
/*
exports.create = function(req, res) {
	
	var role  = new Role(req.body.role);
	
	role.companyId = req.user.companyId;

	role.isEnabled = true;
	
	role.save(function(err) {
		if(err) throw err;
		res.send({role: role});
	});
};

exports.update = function(req, res) {
	var Role = require('../../models/role');
	
	var role  = req.body.role;
	var id = req.param('id');

	
	Role.findOneAndUpdate({_id: id},{$set: role },function(err, doc) {
		if(err) throw err;
		res.send({role: doc });
	});	
};

exports.delete = function(req, res) {
	var Role = require('../../models/role');
	
	var id = req.param('id');

	Role.findOneAndUpdate({_id: id},{$set: {isEnabled: false} },function(err, doc) {
		if(err) throw err;
		res.send(null);
	});	
};*/