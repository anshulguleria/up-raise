UpRaise.EmployeeController = Ember.ObjectController.extend({
  needs: ['employees'],
  actions: {
    editRow: function() {
      this.set('isEditing', true);
    },
    showDeleteModal: function() {
      return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);
    },
    showConfirmSaveModal: function() {
      return Bootstrap.ModalManager.open('saveModal', 'Warning', 'save-modal', this.get('saveModalButtons'), this);
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
      
      var item = this.get('model');
      
      item.deleteRecord();
      item.save();
      
      return Bootstrap.ModalManager.hide('deleteModal');
    }
  },
  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "deleteRow", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  saveModalButtons: [
      Ember.Object.create({title: 'Confirm', clicked: "saveRow", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  isEditing: false
});