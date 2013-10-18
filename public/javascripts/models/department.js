UpRaise.Department = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  company: DS.belongsTo('company')
});