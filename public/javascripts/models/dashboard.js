UpRaise.Dashboard = DS.Model.extend({	
  name: DS.attr('string'),
  reviewdocument: DS.belongsTo('reviewdocument'),
  teamusers: DS.hasMany('teamuser', { async: true }),
  notes: DS.hasMany('note'),
  isKRASet : DS.attr('boolean')

});

UpRaise.Dashboard.FIXTURES = [
 {
 	id: 1,
 	name: 'Varun Jain',
   	reviewdocument: '1',
   	teamusers: [ 1, 2 ],
   	notes: [ 1, 2 ]
 }
 ];