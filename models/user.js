var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;
 
var userSchema = new Schema({	
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	companyId: ObjectId,
	departmentId: ObjectId    
});

module.exports = mongoose.model('User', userSchema);
