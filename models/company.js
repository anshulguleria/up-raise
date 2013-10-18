var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var companySchema = new Schema({
	name: String, 
	description: String,
	isEnabled: Boolean
});

module.exports = mongoose.model('Company', companySchema);