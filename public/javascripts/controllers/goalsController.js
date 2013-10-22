UpRaise.GoalsController = Ember.ArrayController.extend({
	needs: ['reviewdocument'],
	actions: {
		showAddGoalRow: function() {
			this.set('showAddRow', true);
		},
		showResetModal: function() {
			return Bootstrap.ModalManager.open('resetModal', 'Warning', 'reset-modal', this.get('resetModalButtons'), this);
		},
		showRejectModal: function() {			 
			return Bootstrap.ModalManager.show('rejectModal');			
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

			if(kra.get('isApproved')) {
				$.get('/api/clonekra/' + kra.get('id')).then(function() { 

					goal.set('reviewdocument', kra);
					goal.save().then(function() {
						
						kra.set('isApproved', false);			
						kra.get('goals').addObject(goal);
						kra.save();
						
					});

				});
			}
			else {

					goal.set('reviewdocument', kra);
					goal.save().then(function() {

						kra.get('goals').addObject(goal);
						kra.save();
						
					});

			}
				
			
			this.set('showAddRow',false);
		},
		reset: function() {
			var kra = this.get('controllers.reviewdocument.content');
			$.get('/api/reset/' + kra.get('id')).then(function(){ 
				window.location.assign('/dashboard');
			});
		},
		requestApproval: function() {
			$.get('/api/requestApproval').then(function(){ 
				window.location.assign('/dashboard');
			});
		},
		approve: function() {
			var kra = this.get('controllers.reviewdocument.content');
			$.get('/api/approve/' + kra.get('id')).then(function(){ 
				window.location.assign('/dashboard');
			});			
		},
		reject: function() {
			var content = this.get('rejecttext');

			if(content){ 
				var kra = this.get('controllers.reviewdocument.content');
				$.post('/api/reject/' + kra.get('id'), { text: content} ).then(function(){ 
					window.location.assign('/dashboard');
				});
			}
		}

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
		var kra = this.get('controllers.reviewdocument.content');
		if(this.get('totalWeight') == 100 && !kra.get('isApproved'))
			return true;
		else
			return false;
	}.property('@each.weight', 'controllers.reviewdocument.content.isApproved'),
	showReset: function() {
		var kra = this.get('controllers.reviewdocument.content');
		return !kra.get('isApproved') && this.get('model').get('length') > 0;
	}.property('controllers.reviewdocument.content.isApproved', 'length'),
	isApproved: function() {
		var kra = this.get('controllers.reviewdocument.content');
		return kra.get('isApproved');
	}.property('controllers.reviewdocument.content.isApproved'),
	resetModalButtons: [
      Ember.Object.create({title: 'Reset', clicked: "reset", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
	rejectModalButtons: [
      Ember.Object.create({title: 'Reject Changes', clicked: "reject", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  	],
  	
	showAddRow: false
});