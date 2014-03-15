var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var cycleSchema = new Schema({	
	name: String,
	startDate: Date,
	endDate: Date,
	status: String,
	companyId: ObjectId	
});

module.exports = mongoose.model('Cycle', cycleSchema);
