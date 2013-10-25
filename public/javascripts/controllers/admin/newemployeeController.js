UpRaise.NewemployeeController = Ember.ObjectController.extend({
	needs: ['employees'],
	roles: [],
	init: function() {
		
	},
	currentDepartment: function(){ 
		return this.get('mode.departmentId');
	},
	currentTeam: function(){ 
		return this.get('teams').get('firstObject');
	}.property('teamId'),
	currentManager: function(){ 
		return this.get('managers').get('firstObject');
	}.property('managerId'),
	
	actions: {
		add: function() {

			var model = this.get('model');
			var name = model.get('firstName');
			var employeesController = this.get('controllers.employees');
			var controller = this;
			if(name && name !='') {
				var isExisting = employeesController.get('model').some(function(employee) {
					return employee.get('name') == name && !employee.get('isDirty');	
				});

				if(!isExisting){
					this.get('roles').forEach(function(item){
						if(item.get('isSelected'))
							model.get('roles').addObject(item);						
					}).then(function() {
						model.save().then(function() {
							controller.transitionToRoute('employees');
						});
					});
					
				}
			}
		}
		
	}
});