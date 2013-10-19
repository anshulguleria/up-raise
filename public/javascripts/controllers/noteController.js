UpRaise.NoteController = Ember.ObjectController.extend({
  addedOn: function() {
    return moment(this.get('model').get('addedOn')).fromNow();
  }.property('model.addedOn'),
  actions: {
	  showDeleteModal: function() {
	    return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);
	  },
	  delete: function() {
	  	var model = this.get('model');
	  	model.deleteRecord();
	  	model.save();
	  }
  },
  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ]
});