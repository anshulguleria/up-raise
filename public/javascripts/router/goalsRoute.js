UpRaise.Router.map(function () {
	this.resource('goals', { path: '/' }, function() {
		this.route('saveRow');
		this.route('showAddGoalRow');
	});
});

UpRaise.GoalsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('goal');
  },
  renderTemplate: function() {
  	this.render('goals');
  	this.render('header', {	into: 'goals', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});