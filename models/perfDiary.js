var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var perfDiarySchema = new Schema({	
	diaryitems: [ { type: Schema.Types.ObjectId, ref: 'DiaryItem' } ],		
	userId: { type: ObjectId, ref: 'User' },
	cycleId: { type: ObjectId, ref: 'Cycle' }
});

module.exports = mongoose.model('PerfDiary', perfDiarySchema);
