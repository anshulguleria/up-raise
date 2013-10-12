
/*
 * GET goals page.
 */

exports.list = function(req, res){
  res.render('goals', { title: 'Goals' ,  user: req.user, employee: req.user, 
  	cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013' }, view: 'self' });
};