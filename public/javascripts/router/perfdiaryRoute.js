UpRaise.Router.map(function () {
  this.resource('perfdiaryIndex', { path: '/' }, function() {    
    
  });

  this.resource('perfdiary',  { path: '/:id' });
});

UpRaise.PerfdiaryRoute = Ember.Route.extend({
  model: function (params) {
      return this.store.find('perfdiary', { id: params.id});
  },
  setupController: function(controller, model) {
    var m = model.get('firstObject');
    if(m) {      
      this.controllerFor('diaryitems').set('model', m.get('diaryitems'));
      controller.set('model', m);
    }      
  },
  renderTemplate: function() {
    this.render('perfdiary');
  	this.render('header', {	into: 'perfdiary', outlet: 'headerBar' });	
  }
});

UpRaise.PerfdiaryIndexRoute = Ember.Route.extend({
  model: function (params) {
      return this.store.createRecord('perfdiary');
  },
  renderTemplate: function() {
    this.render('perfdiaryIndex');
    this.render('header', { into: 'perfdiaryIndex', outlet: 'headerBar' });  
  }
});