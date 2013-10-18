UpRaise.Router.map(function () {
	this.resource('companys', { path: '/' }, function() {			
    this.route('company');
	});
});

UpRaise.CompanysRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('company');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  },
  renderTemplate: function() {
    this.render('companys');
  	this.render('header', {	into: 'companys', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});