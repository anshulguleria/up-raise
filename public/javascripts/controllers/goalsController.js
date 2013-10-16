UpRaise.GoalsController = Ember.ArrayController.extend({
	actions: {
		showAddGoalRow: function() {
			this.set('showAddRow', true);
		},
		cancelRow: function() {
	      this.set('showAddRow', false);	      
	    },
		saveRow: function() {
			
			var weight = this.get('weight');
			if (!weight.trim()) { 
				console.log('no weight found')
				return; 
			}

			var goal = this.store.createRecord('goal', {
				index: this.get('nextIndex'),
				kra: this.get('kra'),
				type: this.get('type'),
				description: this.get('description'),
				weight: this.get('weight')
			});

			this.set('showAddRow',false);
						
			goal.save();
		},
		reset: function() {
			//this.get('model').forEach(function(val) { val.reload()});
		},
		saveDraft: function() {
			//this.get('model').forEach(function(val) { val.reload()});
		},
		requestApproval: function() {
			
		}
	},
	deleteModalButtons: [
	    Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger"}),
	    Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
	],

	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.index'),

	showAddRow: false
});