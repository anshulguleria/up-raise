UpRaise.GoalController = Ember.ObjectController.extend({
  needs: ['reviewdocument'],
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
      var id = this.get('controllers.reviewdocument.content.id');
      var goal = this.get('model');


      this.store.find('reviewdocument',id)
      .then($.proxy(function(kra){

        goal.save().then(function() {

            kra.get('goals').addObject(goal);
            kra.save();
              
            });
        
      },this));
     
      

      
    },
    
    deleteRow: function () {
      var item = this.get('content');
      item.deleteRecord();

      var id = this.get('controllers.reviewdocument.content.id');
      this.store.find('reviewdocument',id)
      .then($.proxy(function(kra){

        kra.set('isApproved', false);
        kra.get('goals').removeObject(item);
        kra.save().then(function() {
          item.save();
        });         

        return Bootstrap.ModalManager.hide('deleteModal');
        
      },this));
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