UpRaise.NoteController = Ember.ObjectController.extend({
  addedOn: function() {
    return moment(this.get('model').get('addedOn')).fromNow();
  }.property('model.addedOn')
});