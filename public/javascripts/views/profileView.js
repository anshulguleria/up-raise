UpRaise.ProfileView = Ember.View.extend(Ember.TargetActionSupport, {
	
	passwordInfo : {},
	
	actions: {

		 updatePassword: function() {
					
					
						this.triggerAction({
							
							target: this.get('controller'),
					    	action:'updatePassword',
				    		actionContext: this.get('passwordInfo'),	      	
			    		});
					

				},

		
		showPasswordResetModal: function(){

			return Bootstrap.ModalManager.open('changePasswordModal', 'Change Password', 'changePassword-modal', this.get('changePasswordModalButtons'), this);
		},

		},

  changePasswordModalButtons: [
      Ember.Object.create({title: 'Change Password', clicked: "updatePassword", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
});