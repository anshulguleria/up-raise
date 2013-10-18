UpRaise.Note = DS.Model.extend({	
  description: DS.attr('string'),
  addedOn: DS.attr('date')  
});

UpRaise.Note.FIXTURES = [ {
 	id: 1,
 	addedOn: new Date(2013,10,12),
  description: "My note 1",  
 }, {
 
  id: 2,
  addedOn: new Date(2013,10,13),
  description: "My note 2",  
 
 }
 ];