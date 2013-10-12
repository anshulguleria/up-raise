
/*
 * GET goals page.
 */

exports.list = function(req, res){
  res.render('goals', { title: 'Goals' ,  user: req.user, employee: req.user, 
  	goals: {
  		cycle: { startDate: 'Apr 2013', endDate: 'Sept 2013' },
		items:[ [
				'1',
				'Company Roadmap',
				'Organization',
				'Ensure meetings for company roadmap occurs bi-weekly. Track and guide Product management organization to achieve goals set. Track and guide Services organization to achieve goals set',
				'10',
				'',
				''
				],
				[
				'2',
				'Company Goals',
				'Organization',
				'Build company goals for year 2010-11. Publish goals to sales, hr, admin, products and services teams',
				'10',
				'',
				''
				],
				[
				'3',
				'Company Finance',
				'Organization',
				'Setup company financial report publish to stake holders. Increase per person revenue by 10%.',
				'10',
				'',
				''
				] 
			],
		status: 'pending'

				
  	}
  	, view: 'self' });
};