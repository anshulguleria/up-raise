
/*
 * GET appraisals-history page.
 */

exports.history = function(req, res){
  res.render('history', { title: 'My Appraisals' });
};