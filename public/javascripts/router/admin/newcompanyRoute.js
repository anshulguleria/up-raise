UpRaise.Router.map(function () {
	this.resource('newcompany', function() {			
	});
});

UpRaise.NewcompanyRoute = Ember.Route.extend({
  model: function () {
    return this.store.createRecord('company');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  },
  renderTemplate: function() {
    this.render('newcompany');
  	this.render('header', {	into: 'newcompany', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});