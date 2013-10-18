UpRaise.Company = DS.Model.extend({	
  name: DS.attr('string'),
  description: DS.attr('string'),
  __v: DS.attr('string'),
  departments: DS.hasMany('department'),
  teams: DS.hasMany('team')
});

UpRaise.Company.FIXTURES = [
 {
 	id: 1,
 	index: 1,
   	name: 'Tavisca',
   	description: 'Tavisca Solutions Pvt Ltd.'   	
 }
 ];