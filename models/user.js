var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({	
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	roles: [ { type: String } ],
	manager: { type: ObjectId, ref: 'User' },
	departmentId: { type: ObjectId, ref: 'Department' },
	empId: String
});

module.exports = mongoose.model('User', userSchema);
