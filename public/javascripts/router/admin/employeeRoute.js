UpRaise.EmployeesEmployeeRoute = Ember.Route.extend({
  model: function (params) {
    return this.store.find('employee',params.employee_id);
  },
  setupController: function(controller, model) {

    this._super(controller,model);

    //controller.set('content', model);

    controller.set('departments', this.store.find('department'));

    controller.set('teams', this.store.find('team'));

    controller.set('managers', this.store.find('employee', {isDirty: false}));

    
  },
 
});