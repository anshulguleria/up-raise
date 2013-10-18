UpRaise.Teamuser = DS.Model.extend({	
  name: DS.attr('string'),
  userId: DS.attr('string'),
  areGoalsSet: DS.attr('boolean'),
  isAppraisalDue: DS.attr('boolean'),
  appraisalDueDate: DS.attr('date')  
});

UpRaise.Teamuser.FIXTURES = [
 {
 	id: 1,
 	name: 'Varun Jain',
 	userId: '1',
   	areGoalsSet: true,
   	isAppraisalDue: true,
   	appraisalDueDate: new Date(2013,10,22)
 },
 {
 	id: 2,
 	name: 'Tarun Dhillon',
 	userId: '2',
   	areGoalsSet: false,
   	isAppraisalDue: false,
   	appraisalDueDate: new Date(2013,10,22)
 }
 ];