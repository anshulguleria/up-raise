UpRaise.Router.map(function () {
	this.resource('dashboard', { path: '/' }, function() {		
	});
});

UpRaise.DashboardRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('dashboard');
  },
  setupController: function(controller, model) {
    controller.set('model', model.get('firstObject'));
  },
  renderTemplate: function() {
  	this.render('dashboard');
  	this.render('header', {	into: 'dashboard', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});