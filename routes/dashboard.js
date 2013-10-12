
/*
 * GET dashboard page.
 */

exports.display = function(req, res){
	res.render('dashboard', { title: 'My Dash',  user: req.user });
};