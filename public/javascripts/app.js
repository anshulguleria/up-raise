window.UpRaise = Ember.Application.createWithMixins(Bootstrap.Register, {
	LOG_TRANSITIONS: true
});

 // UpRaise.ApplicationAdapter = DS.FixtureAdapter.extend();

//Added class to ember select for bootstrap
Ember.Select = Ember.Select.extend({
  classNames: ['form-control']
});

UpRaise.AppRESTSerializer = DS.RESTSerializer.extend({

	primaryKey: '_id',
	
	serializeHasMany: function(record, json, relationship) {
		var key = relationship.key;

		var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);

		if (relationshipType === 'manyToNone' || relationshipType === 'manyToMany' || relationshipType === 'manyToOne') {
			json[key] = record.get(key).mapBy('id');
		// TODO support for polymorphic manyToNone and manyToMany relationships
		}
	}
});

UpRaise.Store = DS.Store.extend({
  	revision: 12,
  	adapter: DS.RESTAdapter.extend({
		namespace: 'api',
		defaultSerializer: 'UpRaise/appREST'
	}),
});
