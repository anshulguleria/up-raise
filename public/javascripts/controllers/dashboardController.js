UpRaise.DashboardController = Ember.ObjectController.extend({
	needs: 'notes',
	actions: {
		gotoKRA: function() {
			window.location.assign('/kra/#/' + this.get('model.reviewdocument.id'));	
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
	    createReviewDoc: function() {
	    	var doc = this.store.createRecord('reviewdocument');
	    	var that = this;
	    	doc.save().then(function() {
	    		that.set('reviewdocument', doc);
				window.location.assign('/kra/#/' + doc.get('id'));
			});
	    }
		
	},
	isreviewdocument: function() {
		var doc = this.get('model.reviewdocument') 
		return doc && doc != null;
	}.property('reviewdocument'),
	showAddNote: false
});