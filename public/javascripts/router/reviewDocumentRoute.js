UpRaise.Router.map(function () {
  
    this.resource('reviewdocument', { path: '/:user_Id' }, function() {
    //this.route('goals'); 
  });

});



UpRaise.ReviewdocumentRoute = Ember.Route.extend({


  model : function(params){

   return   {userId: params.user_Id};

  }  ,

  setupController: function(controller, model) {

      this._super(controller, model);
   
       controller.set('registeredCycles',[]);
      
      //  if(model){
      //        this.controllerFor('goals').set('model', model.get('goals') ? model.get('goals') : []);
      //     }

      this.store.find('cycle')
      .then(function(data){

        controller.set('registeredCycles',data.content);
        controller.set("currentCycleId" , data.content[0].id);
      

       }) ;
  },

  renderTemplate: function() {
    this.render('reviewdocument');
    this.render('header', {	into: 'reviewdocument', outlet: 'headerBar' });
	//this.render('relatedtags', { into: 'questions', outlet: 'relatedTags' });
  }

});