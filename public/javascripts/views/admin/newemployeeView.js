UpRaise.EmployeesNewemployeeView = Ember.View.extend(Ember.TargetActionSupport, {
	
	actions: {
		add: function() {
		

				this.triggerAction({
			    	action:'add',
			    	target: this.get('controller')	      	
	    		});
			
	    }
	}
});