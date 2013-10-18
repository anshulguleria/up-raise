UpRaise.CompanyController = Ember.ObjectController.extend({
  actions: {
    showConfirmSaveModal: function() {
      return Bootstrap.ModalManager.open('saveModal', 'Warning', 'save-modal', this.get('saveModalButtons'), this);
    },
    save: function() {
      
      this.get('model').save();      
    }
  },
  saveModalButtons: [
      Ember.Object.create({title: 'Confirm', clicked: "save", type:"primary", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ]
});