UpRaise.EmployeesEmployeeController = Ember.ObjectController.extend({
  needs: ['employees'],
  actions: {

   
    save: function() {
      this.set('isEditing', false);
      this.get('model').save();
    },
    delete: function () {
      
      var item = this.get('model');
      
      item.deleteRecord();
      var deletePromise = item.save();
      deletePromise.then($.proxy( function() {
        // Bootstrap.ModalManager.hide('deleteModal');
              this.transitionToRoute('employees');
            },this), function (err) {
              console.log(err);
            });
      
      


    },


  },
 departments:null, 

 teams:null,

 managers:null,
 
});