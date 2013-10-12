
exports.display = function(req, res){
	var error = req.flash('error');
  	res.render('login', { error: error});
};

exports.logout = function(req, res) {
	req.logout();
  	res.redirect('/login');
};