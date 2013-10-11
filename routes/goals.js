
/*
 * GET goals page.
 */

exports.list = function(req, res){
  res.render('goals', { title: 'Goals' });
};