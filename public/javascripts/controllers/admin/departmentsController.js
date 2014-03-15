UpRaise.DepartmentsIndexController = Ember.ArrayController.extend({

actions:{

	save: function(department){

		department.save();

	},

	delete:function(department){

		department.deleteRecord();
		department.save();

	}


}


});


UpRaise.DepartmentsController = Ember.ArrayController.extend({

actions:{

	add : function(department) {

		department.save();

	},



}


});