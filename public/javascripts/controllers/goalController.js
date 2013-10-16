UpRaise.GoalController = Ember.ObjectController.extend({
  actions: {
    editRow: function() {
      var view = this.get('_parentview');
      this.set('isEditing', true);
    },
    showDeleteModal: function() {
      return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);
    },
    cancelRow: function() {
      this.set('isEditing', false);
      this.get('model').rollback();
    },
    saveRow: function() {
      this.set('isEditing', false);
      this.get('model').save();
    },
    deleteRow: function () {
      var item = this.get('content');
      item.deleteRecord();
      item.save();

      return Bootstrap.ModalManager.hide('deleteModal');
    }
  },
  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "deleteRow", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  
  isEditing: false
});