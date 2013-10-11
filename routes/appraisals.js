
/*
 * GET appraisals-history page.
 */

exports.history = function(req, res){
  res.render('history', { title: 'My Appraisals' });
};

exports.self =  function(req, res){
  res.render('self-appraisal', { title: 'Appraisal Details' });
};

exports.view =  function(req, res){
  res.render('view-appraisal', { title: 'Appraisal Details' });
};