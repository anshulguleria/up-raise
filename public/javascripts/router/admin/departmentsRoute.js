UpRaise.Router.map(function () {
  this.resource('departments', { path: '/' }, function() {      
    
  });
});



UpRaise.DepartmentsRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('department');
  },
  setupController: function(controller, model) {

    this._super(controller,model);

     },

   renderTemplate: function(controller, model) {
    
    //this.render('employees');
    this._super(controller, model);
    this.render('header', { into: 'departments', outlet: 'headerBar' });
  
  }

  
});

UpRaise.DepartmentsIndexRoute = Em.Route.extend({
  model: function () {
    return this.modelFor('departments');
  }
 
});