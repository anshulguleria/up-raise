var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({	
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	roles: [ { type: String } ],
	managerId: { type: ObjectId, ref: 'User' },
	departmentId: { type: ObjectId, ref: 'Department' },
	teamId: { type: ObjectId, ref: 'Team' },
	empId: String
});

module.exports = mongoose.model('User', userSchema);
