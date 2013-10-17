var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var goalSchema = new Schema({
	kra: String, 
	type: String, 
	description: String,
	weight: Number,
	selfRating: Number,
	managerRating: Number,
	normalizedRating: Number,
	managerBand: String,
	normalizedBand: String

});

module.exports = mongoose.model('Goal', goalSchema);