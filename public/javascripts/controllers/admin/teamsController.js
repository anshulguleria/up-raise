UpRaise.TeamsIndexController = Ember.ArrayController.extend({

actions:{

	save: function(team){

		team.save();

	},

	delete:function(team){

		team.deleteRecord();
		team.save();

	}


}


});


UpRaise.TeamsController = Ember.ArrayController.extend({

actions:{

	add : function(department) {

		department.save();

	},



}


});