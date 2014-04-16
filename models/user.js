var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({	
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	permission:  { 
					_id :String,
					companySupervision: Boolean,
					permissionHandeling: Boolean,
					userManagement:Boolean 
				} ,
	managerId: { type: ObjectId, ref: 'User' },
	departmentId: { type: ObjectId, ref: 'Department' },
	teamId: { type: ObjectId, ref: 'Team' },
	joiningDate: Date,
	companyId: { type: ObjectId, ref: 'Company' },
	empId: String,
	isEnabled: Boolean
});

module.exports = mongoose.model('User', userSchema);
