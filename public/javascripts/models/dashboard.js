UpRaise.Dashboard = DS.Model.extend({	
  name: DS.attr('string'),
  goals: DS.hasMany('goal'),
  teamusers: DS.hasMany('teamuser', { async: true }),
  notes: DS.hasMany('note')
});

UpRaise.Dashboard.FIXTURES = [
 {
 	id: 1,
 	name: 'Varun Jain',
   	goals: [ 1, 2],
   	teamusers: [ 1, 2 ],
   	notes: [ 1, 2 ]
 }
 ];