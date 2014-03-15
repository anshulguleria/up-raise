UpRaise.Router.map(function () {
  this.resource('cycles', { path: '/' }, function() {      
    
  });
});



UpRaise.CyclesRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('cycle');
  },
  setupController: function(controller, model) {

    this._super(controller,model);

     },

   renderTemplate: function(controller, model) {
    
    //this.render('employees');
    this._super(controller, model);
    this.render('header', { into: 'cycles', outlet: 'headerBar' });
  
  }

  
});

UpRaise.CyclesIndexRoute = Em.Route.extend({
  model: function () {
    return this.modelFor('cycles');
  }
 
});