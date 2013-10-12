
/*
 * GET dashboard page.
 */

exports.display = function(req, res){
	console.log(req.user);
  	res.render('dashboard', { user: req.user });
};