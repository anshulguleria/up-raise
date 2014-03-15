UpRaise.Router.map(function () {
	this.resource('employees', { path: '/' }, function() {			
    this.route('employee', {path : 'employee/:employee_id'});
    this.route('newemployee');
	});
});

UpRaise.EmployeesRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('employee');
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  },
  renderTemplate: function(controller, model) {
    
    //this.render('employees');
    this._super(controller, model);
  	this.render('header', {	into: 'employees', outlet: 'headerBar' });
	
  }
});

UpRaise.EmployeesIndexRoute = Em.Route.extend({
  model: function () {
    return this.modelFor('employees');
  }
});
