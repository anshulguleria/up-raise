var User = require('../models/user');


module.exports = function(passport) {

	var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.
	passport.serializeUser(function(user, done) {
	  done(null, user._id);
	});


	function findById(id, fn) {
	
		User.findOne({ _id : id }, function(err, user) {	
			fn(err, user);
		});
	}

	passport.deserializeUser(function(id, done) {
		
	  findById(id, function (err, user) {
	    done(err, user);
	  });
	});

	var LocalStrategy = require('passport-local').Strategy;
	passport.use(new LocalStrategy({ usernameField: 'email',
		passwordField: 'password'},

	  	function(username, password, done) {
	  		process.nextTick(function () {
	  			var User = require('../models/user');

			    User.findOne({ email: username, password: password }, 
			    	function (err, user) {
			    		
				      if (err) { return done(err); }
				      if (!user) {
				        return done(null, false, { message: 'Incorrect username/password' });
				      }
				      return done(null, user);
				    });
			 });
		}
	));
};