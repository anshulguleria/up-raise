var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var permissionSchema = new Schema({
	companySupervision: Boolean,
	permissionHandeling: Boolean,
	userManagement:Boolean
	
});

module.exports = mongoose.model('Permission', permissionSchema);