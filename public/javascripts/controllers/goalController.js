UpRaise.GoalController = Ember.ObjectController.extend({
  actions: {
    editRow: function() {
      this.set('isEditing', true);
    },
    showDeleteModal: function() {
      return Bootstrap.ModalManager.show('deleteModal');
    },
    cancelRow: function() {
      this.set('isEditing', false);
      this.get('model').rollback();
    },
    saveRow: function() {
      this.set('isEditing', false);
      this.get('model').save();
    }
  },
  
  isEditing: false
  
});