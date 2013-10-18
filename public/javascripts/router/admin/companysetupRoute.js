UpRaise.Router.map(function () {
	this.resource('company', { path: '/' }, function() {			
	});
});

UpRaise.CompanyRoute = Ember.Route.extend({
  model: function () {
    return this.store.createRecord('company');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  },
  renderTemplate: function() {
    this.render('company');
  	this.render('header', {	into: 'company', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});