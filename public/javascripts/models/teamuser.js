UpRaise.Teamuser = DS.Model.extend({	
  name: DS.attr('string'),
  userId: DS.attr('string'),
  kraStatus: DS.attr('string'),
  isAppraisalDue: DS.attr('boolean'),
  appraisalDueDate: DS.attr('date')  
});

UpRaise.Teamuser.FIXTURES = [
 {
 	id: 1,
 	name: 'Varun Jain',
 	userId: '1',
   	KRAstatus: 'Pending for Approval',
   	isAppraisalDue: true,
   	appraisalDueDate: new Date(2013,10,22)
 },
 {
 	id: 2,
 	name: 'Tarun Dhillon',
 	userId: '2',
   	KRAstatus: 'Approved',
   	isAppraisalDue: false,
   	appraisalDueDate: new Date(2013,10,22)
 }
 ];