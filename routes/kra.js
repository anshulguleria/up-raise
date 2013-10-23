
/*
 * GET goals page.
 */

exports.display = function(req, res){
	var cycle = { startDate:'', endDate: ''};
		
	if(req.param('id')) {
		var User = require('../models/user');
		var KRA = require('../models/reviewDocument');
		var async = require('async');
		var Cycle = require('../models/cycle');
		var status = 'pending';

		KRA.findOne({_id: req.param('id')}, function(err, kra) { 
			if(err) throw err;

			if( kra.isApproved)
				status = 'approved';

			Cycle.findOne({_id: kra.cycleId}, function(err, cycleItem) {
				if(err) throw err;
				console.log('cycle is ' + cycleItem);
				if(cycleItem) {
					var moment = require('moment');
					cycle.startDate = moment(cycleItem.start).format('MMM YY');
					cycle.endDate = moment(cycleItem.end).format('MMM YY');
				}

				if(req.user._id != kra.userId.toString()) {
					
					User.findOne({_id : kra.userId}, function(err, user) {
						if(err) throw err;

						return res.render('kra', { title: 'KRA' ,  user: req.user, employee: user, 
					  		cycle: cycle, status: status, view: 'reviewer' });
					});
				} else {
					return res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user, 
					  		cycle: cycle, status: status, view: 'self' });
				}

			});			
		});
	} else {
	
		return res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user, 
	  		cycle: cycle, status: status, view: 'self' });
		
	}
  
};

exports.post = function(req, res) {

	var KRA = require('../models/reviewDocument');
	var Cycle = require('../models/cycle');
	

	var kra  = new KRA(req.body.reviewdocument);

	kra.userId = req.user._id;
	
	Cycle.findOne({ companyId: req.user.companyId, isActive: true}, function(err, cycleItem) {
		if(err) throw err;
		
		console.log('cycle get  ' + cycleItem);
		if(cycleItem) {
			kra.cycleId = cycleItem._id;
		}

		kra.save(function(err) {
			if(err) throw err;
			res.send({reviewdocument: kra});
		});	
	});
	
};


exports.list = function(req, res) {

	var KRA = require('../models/reviewDocument');
	var Goal = require('../models/goal');

	var userId = '';

	if(req.param('id')) {
		id = req.param('id');
	
		KRA.find({ _id: id}, function(err, doc) { 
			if(err) throw err;

			var allGoals = [];

			for (var i = doc.length - 1; i >= 0; i--) {
				allGoals = allGoals.concat(doc[i].goals);
			};
			if(allGoals.length > 0) {			
				Goal.find({_id: { $in: allGoals } }, function(err, goals) {
					if(err) throw err;

					return res.send({ reviewdocuments:  doc , goals: goals });	
				});
			} else {
				return res.send({ reviewdocuments:  doc });	
			}
			
		});
	} else {
		return res.send(null);
	}
	
};


exports.redirect = function(req, res) {

	var KRA = require('../models/reviewDocument');
	var Goal = require('../models/goal');

	var userId = '';

	//TODO: check autorization first

	if(req.param('id')) {
		id = req.param('id');
	
		KRA.find({ userId: id}, function(err, doc) { 
			if(err) throw err;	

			if(doc && doc.length > 0){
				return res.redirect('/kra/' + doc[0]._id + '#/' + doc[0]._id);
			}
			else
				return res.send(null);				
		});
	} else {
		return res.send(null);
	}
	
};

exports.put = function(req, res) {
	

	var mongoose = require('mongoose')
	   ,Schema = mongoose.Schema
	   ,ObjectId = Schema.ObjectId;

	var ReviewDocument = require('../models/reviewDocument');
	var kra  = req.body.reviewdocument;
	
	
	var id = req.param('id');
	
	ReviewDocument.findOneAndUpdate({ _id: id }, {$set: kra}, function(err, doc) {
		if(err) throw err;

		if(kra.type == 'request') {
			//send email
		};
		return res.send({reviewdocument: doc});
	});
	res.send({});
};


exports.delete = function(req, res) {
	
	var ReviewDocument = require('../models/reviewDocument');
	var Goal = require('../models/goal');
	var item  = req.param('id');
	
	ReviewDocument.findOne({_id: item}, function(err, doc) {
		if(err) throw err;
		if(doc) {
			doc.goals.forEach(function(item){
				Goal.remove({_id: item}, function(err){});
			});
		} 
	});

	ReviewDocument.remove({_id: item}, function(err) {
		if(err) throw err;
		res.send(null);
	});	
	
};

exports.clone = function(req, res) {
	
	var ReviewDocument = require('../models/reviewDocument');
	var item  = req.param('id');
	
	ReviewDocument.findOne({_id: item}, function(err, doc) {
		if(err) throw err;
		if(doc) {
			doc.clone();
		} 
		res.send(null);
	});	
};

exports.requestApproval = function(req, res) {
	var User = require('../models/user');
	
	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "varun13@gmail.com",
	        pass: "junior08111981"
	    }
	});

	if(req.user._id) {
		User.findOne({ _id: req.user.managerId }, function(err, user) {
			if(err) throw err;

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: req.user.firstName + " <" + req.user.email + ">", // sender address
			    to: user.email, // list of receivers
			    subject: "Please review goals for " + req.user.firstName + " " + req.user.lastName, // Subject line
			    html: "Dear <strong>" + user.firstName + "</strong>," // html body
			    +	"<br />"
			    + "<p>" + req.user.firstName + "'s goals have been set/updated. Please approve the goals."
			    + " To approve, please click on the link below.</p>"
			    + "<a href='http://localhost:3000/' >Up-Raise</a>"
			    + "<br />"			    
			};

			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if(error){
			        console.log(error);
			    }else{
			        console.log("Message sent: " + response.message);
			    }

			    res.send(null);
			    // if you don't want to use this transport object anymore, uncomment following line
			    smtpTransport.close(); // shut down the connection pool, no more messages
			});
		});
	} else {
		res.send(null);
	}
};

exports.approve = function(req, res) {
	var User = require('../models/user');
	var ReviewDocument = require('../models/reviewDocument');
	var nodemailer = require("nodemailer");
	
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "varun13@gmail.com",
	        pass: "junior08111981"
	    }
	});

	if(req.param('id')) {

		ReviewDocument.findOneAndUpdate({ _id: req.param('id') }, {$set: {isApproved: true, approvedOn: new Date(), type: 'approved' }}, function(err, doc) {
			if(err) throw err;

			if(doc) {

				doc.clone();

					User.findOne({_id: doc.userId}, function(err, user) {
						if(err) throw err;
						// setup e-mail data with unicode symbols
						var mailOptions = {
						    from: req.user.firstName + " <" + req.user.email + ">", // sender address
						    to: user.email + "," + req.user.email, // list of receivers
						    subject: user.firstName +  " - Your goals have been approved.", // Subject line
						    html: "Dear <strong>" + user.firstName + "</strong>," // html body
						    +	"<br />"
						    + "<p>" + "Your goals have been approved."
						    + " To view your goals, please click on the link below.</p>"
						    + "<a href='http://localhost:3000/' >Up-Raise</a>"
						    + "<br />"			    
						};

						// send mail with defined transport object
						smtpTransport.sendMail(mailOptions, function(error, response){
						    if(error){
						        console.log(error);
						    }else{
						        console.log("Message sent: " + response.message);
						    }

						    res.send(null);
						    // if you don't want to use this transport object anymore, uncomment following line
						    smtpTransport.close(); // shut down the connection pool, no more messages
						});
					});
				// });
				
			}
			
		});
	} else {
		res.send(null);
	}
};

exports.requestApproval = function(req, res) {
	var User = require('../models/user');
	
	var nodemailer = require("nodemailer");

	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "varun13@gmail.com",
	        pass: "junior08111981"
	    }
	});

	if(req.user._id) {
		User.findOne({ _id: req.user.managerId }, function(err, user) {
			if(err) throw err;

			// setup e-mail data with unicode symbols
			var mailOptions = {
			    from: req.user.firstName + " <" + req.user.email + ">", // sender address
			    to: user.email, // list of receivers
			    subject: "Please review goals for " + req.user.firstName + " " + req.user.lastName, // Subject line
			    html: "Dear <strong>" + user.firstName + "</strong>," // html body
			    +	"<br />"
			    + "<p>" + req.user.firstName + "'s goals have been set/updated. Please approve the goals."
			    + " To approve, please click on the link below.</p>"
			    + "<br />"
			    + "<a href='http://localhost:3000/' >Up-Raise</a>"
			    + "<br />"			    
			};

			// send mail with defined transport object
			smtpTransport.sendMail(mailOptions, function(error, response){
			    if(error){
			        console.log(error);
			    }else{
			        console.log("Message sent: " + response.message);
			    }

			    res.send(null);
			    // if you don't want to use this transport object anymore, uncomment following line
			    smtpTransport.close(); // shut down the connection pool, no more messages
			});
		});
	} else {
		res.send(null);
	}
};

exports.reject = function(req, res) {
	var User = require('../models/user');
	var ReviewDocument = require('../models/reviewDocument');
	var nodemailer = require("nodemailer");
	
	// create reusable transport method (opens pool of SMTP connections)
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Gmail",
	    auth: {
	        user: "varun13@gmail.com",
	        pass: "junior08111981"
	    }
	});

	console.log( ' text is: ' + req.param('text'));
		

	if(req.param('id')) {
		
		ReviewDocument.findOne({ _id: req.param('id') }, function(err, doc) {
			if(err) throw err;

			if(doc) {

					User.findOne({_id: doc.userId}, function(err, user) {
						if(err) throw err;
						// setup e-mail data with unicode symbols
						var mailOptions = {
						    from: req.user.firstName + " <" + req.user.email + ">", // sender address
						    to: user.email + "," + req.user.email, // list of receivers
						    subject: user.firstName +  " - Your goals have been rejected.", // Subject line
						    html: "Dear <strong>" + user.firstName + "</strong>," // html body
						    +	"<br />"
						    + "<p>Your goals have been rejected.</p>"
						    + "<br/>"
						    + "<p>Your manager has rejected your goal changes with following comments: " 
						    + req.param('text')
						    + "</p> <br />"
						    + " To view your goals, please click on the link below.</p>"
						    + "<br />"
						    + "<a href='http://localhost:3000/' >Up-Raise</a>"
						    + "<br />"			    
						};

						// send mail with defined transport object
						smtpTransport.sendMail(mailOptions, function(error, response){
						    if(error){
						        console.log(error);
						    }else{
						        console.log("Message sent: " + response.message);
						    }

						    res.send(null);
						    // if you don't want to use this transport object anymore, uncomment following line
						    smtpTransport.close(); // shut down the connection pool, no more messages
						});
					});
				// });
				
			}
			
		});
	} else {
		res.send(null);
	}
};

exports.upload = function(req, res) {

	var fs = require('fs');
	console.log('file ' + JSON.stringify(req.files));

	fs.readFile(req.files.btnImportGoals.path, function (err, data) {
	  
	  console.log('path ' + __dirname);
	  var newPath = __dirname + "/uploads/uploadedFileName";
	  fs.writeFile(newPath, data, function (err) {
	  	if(err) throw err;
	  	console.log('uploaded to ' + newPath);
	    res.redirect("back");
	  });
	});
};