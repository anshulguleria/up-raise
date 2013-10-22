UpRaise.DiaryitemsController = Ember.ArrayController.extend({
	nextIndex: function() {
		var length = this.get('length') + 1;
		return length;
	}.property('@each.description')	
});