UpRaise.Router.map(function () {
  this.resource('permissions', { path: '/' }, function() {      
    
  });
});



UpRaise.PermissionsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('employee');
  },
  setupController: function(controller, model) {

    this._super(controller,model);

     },

   renderTemplate: function(controller, model) {
    
    
    this._super(controller, model);
    this.render('header', { into: 'permissions', outlet: 'headerBar' });
  
  }

 
});


UpRaise.PermissionsIndexRoute = Em.Route.extend({
  model: function () {
    return this.modelFor('permissions');
  }
 
});