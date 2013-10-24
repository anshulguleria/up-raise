UpRaise.Team = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  company: DS.belongsTo('company')
});

UpRaise.Team.FIXTURES = [
	{
		id: 1,
		name: 'IMS',
		description: 'Innventia.'   	
	}
 ];