UpRaise.Reviewdocument = DS.Model.extend({
	goals: DS.hasMany('goal'),	
	isApproved: DS.attr('boolean'),
	updatedOn: DS.attr('date'),
	approvedOn: DS.attr('date'),
	userId: DS.attr('string')
});

UpRaise.Reviewdocument.FIXTURES = [
{
	id: 1,
	goals: [ 1, 2 ],
	isApproved: true,
	updatedOn: new Date(2013,10,13),
	approvedOn: new Date(2013,10,13)
}
];