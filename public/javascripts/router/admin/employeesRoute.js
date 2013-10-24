UpRaise.Router.map(function () {
	this.resource('employees', { path: '/:companyId' }, function() {			
    this.route('employee');
	});
});

UpRaise.EmployeesRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('employee', {companyId: params.companyId});
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  },
  renderTemplate: function() {
    this.render('employees');
  	this.render('header', {	into: 'employees', outlet: 'headerBar' });
	
  }
});