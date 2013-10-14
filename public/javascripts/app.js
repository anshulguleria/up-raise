window.UpRaise = Ember.Application.createWithMixins(Bootstrap.Register, {
	LOG_TRANSITIONS: true
});

UpRaise.ApplicationAdapter = DS.FixtureAdapter.extend();