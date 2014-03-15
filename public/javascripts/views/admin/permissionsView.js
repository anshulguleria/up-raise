UpRaise.PermissionsView = Ember.View.extend(Ember.TargetActionSupport, {

actions: {
		
		saveMapping: function() {
		

				this.triggerAction({
			    	action:'saveMapping',
			    	target: this.get('controller')	      	
	    		});
			
	    }
	},

	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')	
	
});