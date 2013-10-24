UpRaise.Department = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  company: DS.belongsTo('company')
});

UpRaise.Department.FIXTURES = [
	{
		id: 1,
		name: 'Technical',
		description: 'Software Development.'   	
	}
 ];