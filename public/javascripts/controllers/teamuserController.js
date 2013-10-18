UpRaise.TeamuserController = Ember.ObjectController.extend({ 
	actions: {
		kra: function () {
			window.location.assign('/kra/' + this.get('model').get('id'));
		},
		review: function() {
			window.location.assign('/review-appraisal/' + this.get('model').get('id'));	
		},
		history: function() {
			window.location.assign('/appraisals/' + this.get('model').get('id'));	
		}
	},
	review:"test",

	reviewdate: function() { 
		if (this.get('model').get('areGoalsSet')) {
			return moment(this.get('model').get('appraisalDueDate')).format("MMM Do");
		} else {
			return "pending";
		}
	}.property('model.areGoalsSet')

});