UpRaise.NewcompanyController = Ember.ObjectController.extend({
	needs: ['companys'],
	actions: {
		add: function() {

			var model = this.get('model');
			var name = model.get('name');
			var companiesController = this.get('controllers.companys');
			var controller = this;
			if(name && name !='') {
				var isExisting = companiesController.get('model').some(function(company) {
					return company.get('name') == name && !company.get('isDirty');	
				});

				if(!isExisting){
					model.save().then(function() {
						controller.transitionToRoute('companys');
					});
				} else {
					model.rollback();
				}
			}
		}		
		
	}
});