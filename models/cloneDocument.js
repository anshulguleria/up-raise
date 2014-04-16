var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
 
var cloneSchema = new Schema({ 
  type: String,
  approvedOn: Date,
  isApproved: Boolean,
  updatedOn: { type: Date, default: Date.now},

  // associations
  userId: { type: ObjectId, ref: 'User' },
  cycleId: { type: ObjectId, ref: 'Cycle' },
  goals: [ { type: Schema.Types.ObjectId, ref: 'Goal' } ],
  clonefor : {type : ObjectId , ref : 'ReviewDocument'}

});


module.exports = mongoose.model('CloneDocument', cloneSchema);
