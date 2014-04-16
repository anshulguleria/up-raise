UpRaise.Employee = DS.Model.extend({	
  
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  //permission: DS.belongsTo('permission',{embedded: 'always'}),              
  managerId: DS.belongsTo('employee'),
  departmentId: DS.belongsTo('department'),
  teamId: DS.belongsTo('team'),
  companyId: DS.belongsTo('company'),
  joiningDate: DS.attr('date'),
  isEnabled: DS.attr('boolean'),
  empId: DS.attr('string'),

  nameWithEmpId: function() {
    return this.get('firstName') + ' ' + this.get('lastName') + ' (' + this.get('empId') + ')';
  }.property('firstName', 'lastName'),
  fullName: function() {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName')

});

UpRaise.Employee.FIXTURES = [
   {
   	id: 1,
    empId: 'E001',
   	firstName: 'Varun',
   	lastName: 'Jain',
    joiningDate: new Date(2013,08,22),
    email: 'vjain@tavisca.com',
    roles: [ 1, 2 ],
    manager: 2,
    department: 1,
    team: 1,
    company: 1,
    isEnabled: true
   },
   {
    id: 2,
    empId: 'E002',
    firstName: 'Tarun',
    lastName: 'Dhillon',
    joiningDate: new Date(2013,08,22),
    email: 'tdhillon@tavisca.com',
    roles: [ 1 ],
    manager: 1,
    department: 1,
    team: 1,
    company: 1,
    isEnabled: true
   } 
 ];