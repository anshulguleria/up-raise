exports.display = function(req, res){
  res.render('admin/companysetup', { title: 'Company Setup' ,  user: req.user });
};