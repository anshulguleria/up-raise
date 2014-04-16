UpRaise.Router.map(function () {
  
  this.resource('notfound',  { path: '/notfound' });

  this.resource('profile',  { path: '/' });
});

UpRaise.ProfileRoute = Ember.Route.extend({
  model: function (params) {
      return this.store.find('employee', { id: params.id});
  },
  setupController: function(controller, model) {

    this._super(controller,model);

    },
  renderTemplate: function() {
    this.render('profile');
  	this.render('header', {	into: 'profile', outlet: 'headerBar' });	
  },

  actions:{

    updatePassword : function(passwordInfo){

     $.post( window.location.origin+"/api/employees/changepassword",passwordInfo)
          .done(function( passwordInfo ) {
            alert( "Success" );
          })
          .fail(function() {
            alert( "error" );
          })
    }
  }
});


UpRaise.NotfoundRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('notfound');
    this.render('header', { into: 'notfound', outlet: 'headerBar' });  
  }
});