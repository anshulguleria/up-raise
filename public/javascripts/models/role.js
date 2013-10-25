UpRaise.Role = DS.Model.extend({	
  name: DS.attr('string'),
  isSelected: DS.attr('boolean')
});

UpRaise.Role.FIXTURES = [
   {
   	id: 1,
   	name: 'manager'
   },
   {
    id: 2,
    name: 'administrator'
   } 
 ];