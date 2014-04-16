UpRaise.TeamuserController = Ember.ObjectController.extend({
	actions: {
		kra: function () {
			window.location.assign('/kra/' + this.get('model').get('id'));
		},
		review: function() {
			window.location.assign('/teamreview/' + this.get('model').get('id'));
		},
		history: function() {
			window.location.assign('/teamappraisals/' + this.get('model').get('id'));
		},
		diary: function () {
			window.location.assign('/teamdiary/' + this.get('model').get('id'));
		},
		reminder:function(){
			// Add reminder code
		},

	},
	review:"test",
	areGoalsSet: function(){
		var kraStatus =	this.get('model').get('kraStatus');
		if(kraStatus.toLowerCase().indexOf('not') == -1){
			return true;
		}
		else{
			return false;
		}
	}.property('kraStatus'),

});