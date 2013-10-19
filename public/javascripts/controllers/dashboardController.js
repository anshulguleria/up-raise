UpRaise.DashboardController = Ember.ObjectController.extend({
	needs: 'notes',
	actions: {
		kra: function() {
			window.location.assign('/kra');	
		},
		showAddNote: function() {
			this.set('showAddNote', true);
		},
		saveNote: function() {
			
			var description = this.get('description');
			if (!description || !description.trim()) { 
				console.log('no description found')
				return; 
			}
			var that = this;
			var note = this.store.createRecord('note', {
				addedOn: new Date(),
				description: this.get('description')				
			});
			
			note.save().then(function() {
				window.location.assign('/dashboard');
			});

			this.set('showAddNote',false);
		},
		cancelNote: function() {
	      this.set('showAddNote', false);	      
	    },
		
	},
	showAddNote: false
});