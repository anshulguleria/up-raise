
/*
 * GET goals page.
 */

exports.display = function(req, res){
  res.render('goals', { title: 'Goals' ,  user: req.user, employee: req.user, 
  	goals: {
  		cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013' },
		status: 'pending'

				
  	}
  	, view: 'self' });
};

exports.list = function(req, res) {
	var Goal = require('../models/goal');

	console.log(req.param('ids'));

	var ids = req.param('ids').join(',');

	console.log(ids);
	
	Goal.find({ _id: { $in: [ids] } }, function(err, doc) { 
		if(err) throw err;

		console.log(doc);
	
		return res.send({ goals: [ doc ] });	
	});
	
	// res.send({
	// 	goals: [
	// 				{
	// 					id: '1',
	// 					kra: 'Company Roadmap',
	// 					type: 'Organization',
	// 					description: 'Ensure meetings for company roadmap occurs bi-weekly. Track and guide Product management organization to achieve goals set. Track and guide Services organization to achieve goals set',
	// 					weight: 10
	// 				},
	// 				{
	// 					id: '2',
	// 					kra: 'Company Goals',
	// 					type: 'Organization',
	// 					description: 'Build company goals for year 2010-11. Publish goals to sales, hr, admin, products and services teams',
	// 					weight: 80
	// 				},				
	// 				{
	// 					id: '3',
	// 					kra: 'Company Finance',
	// 					type: 'Organization',
	// 					description: 'Setup company financial report publish to stake holders. Increase per person revenue by 10%.',
	// 					weight: 10
	// 				}
	// 			]
	// });
};

exports.put = function(req, res) {
	console.log(req.body);
	res.send({});
};

exports.delete = function(req, res) {
	console.log(req.body);
	res.send({goal: req.body});
};

exports.post = function(req, res) {
	console.log(req.body);
	var Goal = require('../models/goal');
	var goal  = new Goal(req.body.goal);
	console.log('goal is ');
	console.log(goal);
	goal.save(function(err) {
		if(err) throw err;
		res.send({goal: goal});
	});	
};
