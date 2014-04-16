UpRaise.TeamusersController = Ember.ArrayController.extend({	
	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.userId'),
	showTeam: function() {
		var doc = this.get('length') ;
		return doc && doc > 0;
	}.property('@each.userId'),

	registeredCycles : null
});