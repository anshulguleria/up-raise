UpRaise.EmployeesEmployeeView = Ember.View.extend(Ember.TargetActionSupport, {
	tagName: 'tr',
	content:null,

	actions: {

		 showDeleteModal: function() {
		      return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);
		    },

		     showResetPasswordModal: function() {
		      return Bootstrap.ModalManager.open('resetPasswordModal', 'Warning', 'resetpassword-modal', this.get('resetpasswordModalButtons'), this);
		    },



		save: function() {
					var model = this.get('controller').get('model');

					var control = this.$();

					if(model.get('name') == '') {
							control.addClass('has-error');	
					}
					else {
						this.triggerAction({
					    	action:'save',
					    	target: this.get('controller')	      	
			    		});
					}

				},
		delete: function(){

			this.triggerAction({
					    	action:'delete',
					    	target: this.get('controller')	      	
			    		});
		},

		resetpassword: function(){

					this.triggerAction({
					    	action:'resetpassword',
					    	target: this.get('controller')	      	
			    		});
		}
	},

	 deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  resetpasswordModalButtons: [
      Ember.Object.create({title: 'Reset', clicked: "resetpassword", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});