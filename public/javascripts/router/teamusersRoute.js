UpRaise.Router.map(function () {
	this.resource('teamusers', { path: '/' });
});

UpRaise.TeamusersRoute = Ember.Route.extend({
  model: function () {

    return this.store.find('teamuser');

    
  },

  setupController: function(controller, model) {

  this._super(controller,model);
	controller.set('registeredCycles',[]);
	this.store.find('cycle').then(function(data){
		
		controller.set('registeredCycles',data.content);
    }) ;
  },

  renderTemplate: function() {
  	this.render('teamusers');
  	this.render('header', {	into: 'teamusers', outlet: 'headerBar' });
  }

});