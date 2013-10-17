UpRaise.Goal = DS.Model.extend({	
  kra: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  weight: DS.attr('number')  
});

UpRaise.Goal.FIXTURES = [
 {
 	id: 1,
 	index: 1,
   	kra: 'Company Roadmap1',
   	type: 'Organization',
   	description: 'Ensure meetings for company roadmap occurs bi-weekly. Track and guide Product management organization to achieve goals set. Track and guide Services organization to achieve goals set',
   	weight: 10
 },
 {
 	id: 2,
	index: 2,
	kra: 'Company Goals',
	type: 'Organization',
	description: 'Build company goals for year 2010-11. Publish goals to sales, hr, admin, products and services teams',
	weight: 10				
 },
 {
 	id: 3,
   	index: 3,
   	kra: 'Company Finance',
	type: 'Organization',
	description: 'Setup company financial report publish to stake holders. Increase per person revenue by 10%.',
	weight: 10
 }
];