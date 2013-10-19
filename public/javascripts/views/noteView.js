UpRaise.NoteView = Ember.View.extend(Ember.TargetActionSupport, {
	content:null,
	adjustedIndex: function() {
	    return this.get('_parentView.contentIndex') + 1;
	}.property('controller.model._id')
});