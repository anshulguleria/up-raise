
/*
 * GET appraisals-history page.
 */

exports.history = function(req, res){
  res.render('history', { title: 'My Appraisals' ,  user: req.user });
};

exports.self =  function(req, res){
  res.render('self-appraisal', { title: 'Appraisal Details',  user: req.user });
};

exports.view =  function(req, res){
  res.render('view-appraisal', { title: 'Appraisal Details' ,  user: req.user });
};

exports.review =  function(req, res){
  res.render('review-appraisal', { title: 'Review Appraisal' ,  user: req.user });
};