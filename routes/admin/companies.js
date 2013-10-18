exports.display = function(req, res){
  res.render('admin/companies', { title: 'Company Listing' ,  user: req.user });
};

exports.list = function(req, res) {
	var Company = require('../../models/company');

	Company.find({}, function(err, doc) { 
		if(err) throw err;

		console.log(doc);
	
		return res.send({ companys: doc });	
	});
};

exports.create = function(req, res) {
	var Company = require('../../models/company');
	
	var company  = new Company(req.body.company);
	console.log('company is ');
	console.log(company);
	company.save(function(err) {
		if(err) throw err;
		res.send({company: company});
	});
};
