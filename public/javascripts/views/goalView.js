UpRaise.GoalView = Ember.View.extend(Ember.TargetActionSupport, {
	tagName: 'tr',
	content:null,
	actions: {
		saveRow: function() {
			var model = this.get('controller').get('model');

			var control = this.$();

			if(model.get('kra') == '' || 
				model.get('type') == '' || 
				model.get('description') == '' || 
				model.get('weight') == '' || !parseInt(model.get('weight'))) {
					control.addClass('has-error');	
			}
			else {
				this.triggerAction({
			    	action:'saveRow',
			    	target: this.get('controller')	      	
	    		});
			}
	    }
	},
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});