UpRaise.Department = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  members: DS.hasMany('user'),
  company: DS.belongsTo('company')
});