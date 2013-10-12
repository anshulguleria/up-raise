
/*
 * GET login page.
 */

exports.login = function(req, res){
	var error = req.flash('error');
	console.log(error);
  res.render('login', { error: error});
};