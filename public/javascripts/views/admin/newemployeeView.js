UpRaise.NewemployeeView = Ember.View.extend(Ember.TargetActionSupport, {
	content:null,
	actions: {
		add: function() {
			var model = this.get('controller').get('model');

			var control = this.$('#employeeName').closest('.form-group');
			var name = model.get('name');
			if(!name || name == '') {
					control.addClass('has-error');	
			}
			else {
				this.triggerAction({
			    	action:'add',
			    	target: this.get('controller')	      	
	    		});
			}
	    }
	}
});