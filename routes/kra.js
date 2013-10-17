
/*
 * GET goals page.
 */

exports.display = function(req, res){
  res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user, 
  	goals: {
  		cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013' },
		status: 'pending'

				
  	}
  	, view: 'self' });
};

exports.list = function(req, res) {
	var KRA = require('../models/reviewDocument');

	KRA.findOne({ userId: req.user._id}, function(err, doc) { 
		if(err) throw err;

		if(!doc) {
			doc = new KRA({ userId: req.user._id});
			doc.save(function(err) { 
				if(err) throw err;
				
				KRA.findOne({ userId: req.user._id}, function(err, doc) { 
					if(err) throw err;

					if(!doc) {
						res.send({});
						return;
					}

					return res.send({reviewDocument: doc});

				});
			});			
		} else {
			return res.send({reviewDocument: doc});
		}
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
	res.send({});
};
