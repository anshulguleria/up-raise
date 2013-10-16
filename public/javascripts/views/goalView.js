UpRaise.GoalView = Ember.View.extend(Ember.TargetActionSupport, {
	tagName: 'tr',
	actions: {
		saveRow: function() {
			//var model = this.controller.get('model');

	    	this.triggerAction({
		    	action:'saveRow',
		    	target: this.get('controller')	      	
	    	});      
	    }
	},

});