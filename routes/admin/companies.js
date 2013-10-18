exports.display = function(req, res){
  res.render('admin/companies', { title: 'Company Listing' ,  user: req.user });
};

exports.list = function(req, res) {
	var Company = require('../../models/company');

	Company.find({ isEnabled: true }, function(err, doc) { 
		if(err) throw err;

		console.log(doc);
	
		return res.send({ companys: doc });	
	});
};

exports.create = function(req, res) {
	var Company = require('../../models/company');
	
	var company  = new Company(req.body.company);
	company.isEnabled = true;
	company.save(function(err) {
		if(err) throw err;
		res.send({company: company});
	});
};

exports.update = function(req, res) {
	var Company = require('../../models/company');
	
	var company  = req.body.company;
	var id = req.param('id');

	
	Company.findOneAndUpdate({_id: id},{$set: company },function(err, doc) {
		if(err) throw err;
		res.send({company: doc });
	});	
};

exports.delete = function(req, res) {
	var Company = require('../../models/company');
	
	var id = req.param('id');

	Company.findOneAndUpdate({_id: id},{$set: {isEnabled: false} },function(err, doc) {
		if(err) throw err;
		res.send(null);
	});	
};
