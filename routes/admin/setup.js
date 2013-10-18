exports.display = function(req, res){
  res.render('admin/companies', { title: 'Company Listing' ,  user: req.user });
};