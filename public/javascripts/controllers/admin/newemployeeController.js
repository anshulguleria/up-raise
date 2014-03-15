UpRaise.EmployeesNewemployeeController = Ember.ObjectController.extend({
	needs: ['employees'],
	roles: [],
	init: function() {
		
	},
	currentDepartment: function(){ 
		return this.get('departments');
	}.property('departmentId'),
	
	currentTeam: function(){ 
		return this.get('teams').get('firstObject');
	}.property('teamId'),

	currentManager: function(){ 
		return this.get('managers').get('firstObject');

	}.property('managerId'),
	
	actions: {
		add: function() {

			var model = this.get('model');
			var email = model.get('email');
			var employeesController = this.get('controllers.employees');
			var controller = this;
			if(email && email !='') {
				var isExisting = employeesController.get('model').some(function(employee) {
					return employee.get('email') == email && !employee.get('isDirty');	
				});

				if(!isExisting){
					
						model.save().then(function() {
							controller.transitionToRoute('employees');
						
					});
					
				}
			}
		}
		
	}
});