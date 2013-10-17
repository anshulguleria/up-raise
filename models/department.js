var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var departmentSchema = new Schema({
	name: String, 
	description: String,
	companyId: { type: ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Department', departmentSchema);