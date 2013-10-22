UpRaise.DiaryitemView = Ember.View.extend(Ember.TargetActionSupport, {
	tagName: 'tr',
	content:null,
	actions: {
		save: function() {
			var model = this.get('controller').get('model');

			var control = this.$();

			if(model.get('description') == '') {
					control.addClass('has-error');	
			}
			else {
				this.triggerAction({
			    	action:'save',
			    	target: this.get('controller')	      	
	    		});
			}
	    }
	},
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});