var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var cycleSchema = new Schema({	
	start: Date,
	end: Date,
	isActive: Boolean,
	companyId: ObjectId	
});

module.exports = mongoose.model('Cycle', cycleSchema);
