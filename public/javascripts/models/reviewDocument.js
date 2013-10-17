UpRaise.ReviewDocument = DS.Model.extend({
	goals: DS.hasMany(UpRaise.Goal),	
	isApproved: DS.attr('boolean'),
	updatedOn: DS.attr('date'),
	approvedOn: DS.attr('date'),
	userId: DS.attr('string')
});

UpRaise.ReviewDocument.FIXTURES = [
{
	id: 1,
	goals: [ 1, 2 ],
	isApproved: true,
	updatedOn: new Date(2013,10,13),
	approvedOn: new Date(2013,10,13)
}
];

UpRaise.Goal = DS.Model.extend({	
  kra: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  weight: DS.attr('number'),
  reviewDocument: DS.belongsTo(UpRaise.ReviewDocument)
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