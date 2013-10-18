UpRaise.DashboardController = Ember.ObjectController.extend({
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
				that.get('model').reload();
			});

			this.set('showAddNote',false);
		},
		cancelNote: function() {
	      this.set('showAddNote', false);	      
	    },
		
	},
	showAddNote: false
});