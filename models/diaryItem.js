var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var itemSchema = new Schema({
	addedOn: Date, 
	addedBy: { type: ObjectId, ref: 'User' },
	addedByName: String,
	description: String
});

module.exports = mongoose.model('DiaryItem', itemSchema);