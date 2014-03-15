UpRaise.DepartmentsView = Ember.View.extend(Ember.TargetActionSupport, {
	
	departmentInContext : null,
	
	
	actions: {

		 save: function() {
					
					
						this.triggerAction({
					    	action:'save',
					    	target: this.get('controller'),
					    	actionContext: this.get('departmentInContext'),	      	
			    		});
					

				},

		add: function(){

			this.triggerAction({
					    	action:'add',
					    	target: this.get('controller'),
					    	actionContext: this.get('departmentInContext'),	      	
			    		});
		},

		delete: function(){

			this.triggerAction({
					    	action:'delete',
					    	target: this.get('controller'),
					    	actionContext: this.get('departmentInContext'),      	
			    		});
		},




		showEditModal: function(department){

			this.set('departmentInContext', department);

				return Bootstrap.ModalManager.open('editModal', 'Edit Department Details', 'edit-modal', this.get('editModalButtons'), this);
		},

		showDeleteModal:function(department){

			this.set('departmentInContext', department);
				return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);

		},

		showAddModal:function(){

			this.set('departmentInContext', this.get('controller').store.createRecord('department'));
				return Bootstrap.ModalManager.open('addModal', 'Setup New Department', 'add-modal', this.get('addModalButtons'), this);
					},
	},

  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  addModalButtons: [
      Ember.Object.create({title: 'Register Department', clicked: "add", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],

  editModalButtons: [
      Ember.Object.create({title: 'Save Department Details', clicked: "save", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('_parentView.contentIndex')
});