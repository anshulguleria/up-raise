var User = require('../models/user');


module.exports = function(passport, OPTS) {

	var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId
   , LdapStrategy = require('passport-ldapauth').Strategy;

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.
	passport.serializeUser(function(user, done) {
		

		User.findOne({ email : user.mail }, function(err, dbUser) {
			if(err) return done(err);

			if(!dbUser) {
				return done('No local user found. Contact system administrator to setup your user.');
			}
			return done(null, user.mail);
		});	
	  
	});


	function findById(email, fn) {
	
		User.findOne({ email : email }, function(err, user) {	
			fn(err, user);
		});
	}

	passport.deserializeUser(function(email, done) {
		
	  findById(email, function (err, user) {
	    done(err, user);
	  });
	});

	passport.use( new LdapStrategy( OPTS ));
};