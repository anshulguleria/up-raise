UpRaise.Company = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  departments: DS.hasMany('department'),
  teams: DS.hasMany('team')
});