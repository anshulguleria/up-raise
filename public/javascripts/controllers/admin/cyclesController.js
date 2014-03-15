UpRaise.CyclesIndexController = Ember.ArrayController.extend({

actions:{

	save: function(cycle){


cycle.set('startDate',new Date(cycle.get('startDate')));
					cycle.set('endDate',new Date(cycle.get('endDate')));
		cycle.save();

	},

	delete:function(cycle){

		cycle.deleteRecord();
		cycle.save();

	}


},




});


UpRaise.CyclesController = Ember.ArrayController.extend({

actions:{

	add : function(cycle) {

				cycle.set('startDate',new Date(cycle.get('startDate')));
					cycle.set('endDate',new Date(cycle.get('endDate')));
		cycle.save();

	},



}


});