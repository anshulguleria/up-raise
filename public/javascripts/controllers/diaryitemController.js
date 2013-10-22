UpRaise.DiaryitemController = Ember.ObjectController.extend({
  needs: ['perfdiary'],
  actions: {
    edit: function() {
      this.set('isEditing', true);
    },
    showDeleteModal: function() {
      return Bootstrap.ModalManager.open('deleteModal', 'Warning', 'delete-modal', this.get('deleteModalButtons'), this);
    },
    showConfirmSaveModal: function() {
      return Bootstrap.ModalManager.open('saveModal', 'Warning', 'save-modal', this.get('saveModalButtons'), this);
    },
    cancel: function() {
      this.set('isEditing', false);
      this.get('model').rollback();
    },
    save: function() {
      this.set('isEditing', false);
      var perfdiary = this.get('controllers.perfdiary.content');
      var diaryitem = this.get('model');

      diaryitem.set('perfdiary', perfdiary);
      
      
      diaryitem.save().then(function() {

        perfdiary.get('items').addObject(diaryitem);
        perfdiary.save();

      });

    },
    delete: function () {
      var item = this.get('content');
      item.deleteRecord();

      var perfdiary = this.get('controllers.perfdiary.content');
      perfdiary.get('diaryitems').removeObject(item);
      perfdiary.save().then(function() {
        item.save();
      });         
      return Bootstrap.ModalManager.hide('deleteModal');
    }
  },
  deleteModalButtons: [
      Ember.Object.create({title: 'Delete', clicked: "delete", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  saveModalButtons: [
      Ember.Object.create({title: 'Confirm', clicked: "save", type:"danger", dismiss: 'modal'}),
      Ember.Object.create({title: 'Cancel', dismiss: 'modal'})
  ],
  addedOn: function() {
    return moment(this.get('model').get('addedOn')).fromNow();
  }.property('model.addedOn'),
  // canEdit: function() {
  //   return this.get('model.addedBy') == document.cookie.user._id;
  // }.property('model.addedBy'),
  
  isEditing: false
});