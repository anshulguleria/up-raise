UpRaise.Router.map(function () {
	this.resource('reviewdocument', { path: '/:id' }, function() {
    //this.route('goals');    
  });
});

UpRaise.ReviewdocumentRoute = Ember.Route.extend({
  model: function (params) {
      return this.store.find('reviewdocument', { id: params.id});
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