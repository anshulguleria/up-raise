UpRaise.Router.map(function () {
	this.resource('reviewDocument', { path: '/' }, function() {
		this.route('goals');		
	});
});

UpRaise.ReviewDocumentRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('reviewDocument');
  },
  renderTemplate: function() {
    this.render('reviewDocument');
  	this.render('header', {	into: 'reviewDocument', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});