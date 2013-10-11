
/*
 * GET team listing page.
 */

exports.list = function(req, res){
  res.render('team', { title: 'Team' });
};