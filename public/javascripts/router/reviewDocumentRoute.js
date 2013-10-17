UpRaise.Router.map(function () {
	this.resource('reviewdocument', { path: '/' }, function() {
		//this.route('goals');		
	});
});

UpRaise.ReviewdocumentRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('reviewdocument', { test: 's'});
  },
  setupController: function(controller, model) {
    var m = model.get('firstObject');
    if(m) {
      
      this.controllerFor('goals').set('model', m.get('goals'));
      controller.set('model', m);
    }      
  },
  renderTemplate: function() {
    this.render('reviewdocument');
  	this.render('header', {	into: 'reviewdocument', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }
});