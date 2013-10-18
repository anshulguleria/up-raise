UpRaise.Router.map(function () {
	this.resource('companysetup', { path: '/' }, function() {			
	});
});

UpRaise.CompanysetupRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('reviewdocument', { type: params.type});
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