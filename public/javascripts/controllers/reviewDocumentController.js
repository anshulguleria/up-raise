UpRaise.ReviewDocumentController = Ember.ObjectController.extend({
	getContent: function() {
		return this.get('model');
	}
});