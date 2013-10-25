exports.display = function(req, res){
  res.render('admin/teams', { title: 'Team Listing' ,  user: req.user });
};

var Team = require('../../models/team');	

exports.list = function(req, res) {
	
	Team.find({ companyId: req.user.companyId }, function(err, teams) {

		return res.send({ teams: teams });	
	});

};

exports.create = function(req, res) {
	
	var team  = new Team(req.body.team);
	
	team.companyId = req.user.companyId;

	team.isEnabled = true;
	
	team.save(function(err) {
		if(err) throw err;
		res.send({team: team});
	});
};

exports.update = function(req, res) {
	var Team = require('../../models/team');
	
	var team  = req.body.team;
	var id = req.param('id');

	
	Team.findOneAndUpdate({_id: id},{$set: team },function(err, doc) {
		if(err) throw err;
		res.send({team: doc });
	});	
};

exports.delete = function(req, res) {
	var Team = require('../../models/team');
	
	var id = req.param('id');

	Team.findOneAndUpdate({_id: id},{$set: {isEnabled: false} },function(err, doc) {
		if(err) throw err;
		res.send(null);
	});	
};