UpRaise.Router.map(function () {
	this.resource('teamusers', { path: '/' });
});

UpRaise.TeamusersRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('teamuser');
  },
  renderTemplate: function() {
  	this.render('teamusers');
  	this.render('header', {	into: 'teamusers', outlet: 'headerBar' });
  }
});