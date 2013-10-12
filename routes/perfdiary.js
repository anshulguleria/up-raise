
/*
 * GET performance diary page.
 */

exports.view = function(req, res){
  res.render('perfdiary', { title: 'My Diary' ,  user: req.user });
};