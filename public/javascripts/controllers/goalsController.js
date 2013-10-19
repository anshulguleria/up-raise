UpRaise.GoalsController = Ember.ArrayController.extend({
	needs: ['reviewdocument'],
	actions: {
		showAddGoalRow: function() {
			this.set('showAddRow', true);
		},
		showResetModal: function() {
			return Bootstrap.ModalManager.open('resetModal', 'Warning', 'reset-modal', this.get('resetModalButtons'), this);
		},
		cancelRow: function() {
	      this.set('showAddRow', false);	      
	    },
		saveRow: function() {
			
			var weight = this.get('weight');
			if (!weight || !weight.trim()) { 
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
			
			var kra = this.get('controllers.reviewdocument.content');
			kra.set('isApproved', false);
			goal.set('reviewdocument', kra);
			goal.save().then(function() {
				kra.get('goals').addObject(goal);
				kra.save();
				
			});

			this.set('showAddRow',false);
		},
		reset: function() {
			var kra = this.get('controllers.reviewdocument.content');
			kra.deleteRecord();
			kra.save();
			UpRaise.reset();
		},
		requestApproval: function() {
			$.get('/api/requestApproval');			
		},
		approve: function() {
			var kra = this.get('controllers.reviewdocument.content');
			$.get('/api/approve/' + kra.get('id')).then(function(){ 
				window.location.assign('/dashboard');
			});			
		},

	},
	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.weight'),
	totalWeight: function () {
		var total = 0;
		this.get('model').forEach(function(item, index, list) {
			if(item.get('weight'))
				total+=parseInt(item.get('weight'));
		}, this);

		return total;
	}.property('@each.weight'),

	showSubmit: function () {
		if(this.get('totalWeight') == 100)
			return true;
		else
			return false;
	}.property('@each.weight'),
	showReset: function() {
		var kra = this.get('controllers.reviewdocument.content');
		return !kra.get('isApproved');
	},
	resetModalButtons: [
      Ember.Object.create({title: 'Reset', clicked: "reset", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
  
	showAddRow: false
});