UpRaise.Role = DS.Model.extend({	
  name: DS.attr('string')
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