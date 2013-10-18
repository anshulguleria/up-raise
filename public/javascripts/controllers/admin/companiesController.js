UpRaise.CompanysController = Ember.ArrayController.extend({
	actions: {
		add: function() {
			this.transitionToRoute('newcompany');
		}
	}		
});