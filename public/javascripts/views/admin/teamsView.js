UpRaise.TeamsView = Ember.View.extend(Ember.TargetActionSupport, {
	
	teamInContext : null,
	
	
	actions: {

		 save: function() {
					
					
						this.triggerAction({
					    	action:'save',
					    	target: this.get('controller'),
					    	actionContext: this.get('teamInContext'),	      	
			    		});
					

				},

		add: function(){

			this.triggerAction({
					    	action:'add',
					    	target: this.get('controller'),
					    	actionContext: this.get('teamInContext'),	      	
			    		});
		},

		delete: function(){

			this.triggerAction({
					    	action:'delete',
					    	target: this.get('controller'),
					    	actionContext: this.get('teamInContext'),      	
			    		});
		},




		showEditModal: function(team){

			this.set('teamInContext', team);

				return Bootstrap.ModalManager.open('editModal', 'Edit Team Details', 'edit-modal', this.get('editModalButtons'), this);
		},

		showDeleteModal:function(team){

			this.set('teamInContext', team);
				return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);

		},

		showAddModal:function(){

			this.set('teamInContext', this.get('controller').store.createRecord('team'));
				return Bootstrap.ModalManager.open('addModal', 'Setup New Team', 'add-modal', this.get('addModalButtons'), this);
					},
	},

  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  addModalButtons: [
      Ember.Object.create({title: 'Register Team', clicked: "add", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  editModalButtons: [
      Ember.Object.create({title: 'Save Team Details', clicked: "save", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});