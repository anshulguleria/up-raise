UpRaise.Cycle = DS.Model.extend({	
  name: DS.attr('string'),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  status:DS.attr('string'),
  __v: DS.attr('string'),
  company: DS.belongsTo('company')
});

UpRaise.Cycle.FIXTURES = [
	{
		id: 1,
		name: 'Summer13',
		startDate:new Date(),
		endDate: new Date(),
		status:'Active',
	}
 ];