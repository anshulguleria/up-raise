UpRaise.Router.map(function () {
	this.resource('newemployee', function() {			
	});
});

UpRaise.NewemployeeRoute = Ember.Route.extend({
  model: function () {
    return this.store.createRecord('employee');
  },
  setupController: function(controller, model) {
    controller.set('content', model);

    controller.set('departments', this.store.find('department'));

    controller.set('teams', this.store.find('team'));

    controller.set('managers', this.store.find('employee', {isDirty: false}));

    controller.set('roles', this.store.find('role'));

    setTimeout(function(){

      controller.get('model').set('teamId', controller.get('teams').get('firstObject'));
    
      controller.get('model').set('departmentId', controller.get('departments').get('firstObject'));
      
      controller.get('model').set('managerId', controller.get('managers').get('firstObject'));

    }, 1000);
    
  },
  renderTemplate: function() {
    this.render('newemployee');
  	this.render('header', {	into: 'newemployee', outlet: 'headerBar' });	
  }
});