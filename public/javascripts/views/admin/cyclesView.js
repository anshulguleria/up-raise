UpRaise.CyclesView = Ember.View.extend(Ember.TargetActionSupport, {
	
	cycleInContext : null,
	
	allowedStatus:["New" ,"Active" ,"Closed"],
	
	actions: {

		 save: function() {
					
					
						this.triggerAction({
					    	action:'save',
					    	target: this.get('controller'),
					    	actionContext: this.get('cycleInContext'),	      	
			    		});
					

				},

		add: function(){

			this.triggerAction({
					    	action:'add',
					    	target: this.get('controller'),
					    	actionContext: this.get('cycleInContext'),	      	
			    		});
		},

		delete: function(){

			this.triggerAction({
					    	action:'delete',
					    	target: this.get('controller'),
					    	actionContext: this.get('cycleInContext'),      	
			    		});
		},




		showEditModal: function(cycle){

			this.set('cycleInContext', cycle);

				return Bootstrap.ModalManager.open('editModal', 'Edit Cycle Details', 'edit-modal', this.get('editModalButtons'), this);
		},

		showDeleteModal:function(cycle){

			this.set('cycleInContext', cycle);
				return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);

		},

		showAddModal:function(){

			this.set('cycleInContext', this.get('controller').store.createRecord('cycle'));
				return Bootstrap.ModalManager.open('addModal', 'Setup New Cycle', 'add-modal', this.get('addModalButtons'), this);
					},
	},

  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  addModalButtons: [
      Ember.Object.create({title: 'Register Cycle', clicked: "add", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  editModalButtons: [
      Ember.Object.create({title: 'Save Cycle Details', clicked: "save", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});