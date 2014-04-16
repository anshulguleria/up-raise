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

		
    }
},

    serializeBelongsTo: function(record, json, relationship) {
		    var key = relationship.key,
		        belongsToRecord = Ember.get(record, key);
		     
		    if (relationship.options.embedded === 'always') {
		        json[key] = belongsToRecord.serialize();
		    }
		    else {
		        return this._super(record, json, relationship);
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
