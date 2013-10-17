var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var reviewSchema = new Schema({	
	goals: [ { type: Schema.Types.ObjectId, ref: 'Goal' } ],		
	isApproved: Boolean,
	updatedOn: { type: Date, default: Date.now},
	approvedOn: Date,
	userId: { type: ObjectId, ref: 'User' }
});

module.exports = mongoose.model('ReviewDocument', reviewSchema);
