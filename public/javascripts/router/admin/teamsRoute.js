UpRaise.Router.map(function () {
  this.resource('teams', { path: '/' }, function() {      
    
  });
});



UpRaise.TeamsRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('team');
  },
  setupController: function(controller, model) {

    this._super(controller,model);

     },

   renderTemplate: function(controller, model) {
    
    //this.render('employees');
    this._super(controller, model);
    this.render('header', { into: 'teams', outlet: 'headerBar' });
  
  }

  
});

UpRaise.TeamsIndexRoute = Em.Route.extend({
  model: function () {
    return this.modelFor('teams');
  }
 
});