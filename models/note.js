var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var noteSchema = new Schema({
	description: String,
	addedOn: Date,
	userId: { type: ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Note', noteSchema);