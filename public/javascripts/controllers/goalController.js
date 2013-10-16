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
      this.get('model').reload();
    },
    saveRow: function() {
      
      if (!Ember.isEmpty(this.get('model.weight'))) {
          this.set('isEditing', false);
          this.get('model').save();
      }
      else {
        this.get('model').reload();
      }
    }
  },
  
  isEditing: false
});