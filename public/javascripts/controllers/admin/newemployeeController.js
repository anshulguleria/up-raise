UpRaise.NewemployeeController = Ember.ObjectController.extend({
	needs: ['employees'],
	actions: {
		add: function() {

			var model = this.get('model');
			var name = model.get('name');
			var employeesController = this.get('controllers.employees');
			var controller = this;
			if(name && name !='') {
				var isExisting = employeesController.get('model').some(function(employee) {
					return employee.get('name') == name && !employee.get('isDirty');	
				});

				if(!isExisting){
					model.save().then(function() {
						controller.transitionToRoute('employees');
					});
				} else {
					model.rollback();
				}
			}
		}		
		
	}
});