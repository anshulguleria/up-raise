UpRaise.ReviewdocumentController = Ember.ObjectController.extend({
	getContent: function() {
		return this.get('model');
	},
registeredCycles : null,

currentCycleId: null,

userId : null,

isCreateNewMode : false,


loadKRA : function(){

	var cycleId = this.get('currentCycleId');
	this.store.find('reviewdocument',this.get('model.userId') +"__"+ cycleId)
	.then( $.proxy(function(response){

		this.set('model', response.get('data')); 
		
    	if(response.get('data')){
           this.set('isCreateNewMode',false);
            this.controllerFor('goals').set('model', this.get('model.goals') ? this.get('model.goals') : []);
          }
          else{

          		this.set('isCreateNewMode',true);
          }
		;
	},this) , $.proxy(function(response){

		this.set('isCreateNewMode',true);
	},this));
}.observes('currentCycleId'),

actions:{

	createReviewDoc:function(userId){

			var doc = this.store.createRecord('reviewdocument',{ cycleId: this.get('currentCycleId')});
	    	
	    	doc.save().then($.proxy(function() {
	    		this.set('model', doc);
	    		
			},this));

	}
}
	
});