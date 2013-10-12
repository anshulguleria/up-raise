
/*
 * GET login page.
 */

exports.login = function(req, res){
	var error = req.flash('error');
	//console.log(error);
  res.render('login', { error: error});
};

var LocalStrategy = require('passport-local').Strategy;

exports.init = function(app, passport, mongodb){

	// Passport session setup.
	//   To support persistent login sessions, Passport needs to be able to
	//   serialize users into and deserialize users out of the session.  Typically,
	//   this will be as simple as storing the user ID when serializing, and finding
	//   the user by ID when deserializing.
	passport.serializeUser(function(user, done) {
		//console.log('serializing user');
		//console.log(user);
	  done(null, user._id);
	});


	function findById(id, fn) {
		//console.log('find user by id ' + id);
	  app.users.findOne({_id : new mongodb.BSONPure.ObjectID(id) }, function(err, doc) {	
		//console.log(doc);
	  	fn(err, doc);
	  });
	}

	passport.deserializeUser(function(id, done) {
		//console.log('deserializing user by id ' + id);
	  findById(id, function (err, user) {
	    done(err, user);
	  });
	});

	passport.use(new LocalStrategy({ usernameField: 'email',
		passwordField: 'password'},

	  	function(username, password, done) {
	  		process.nextTick(function () {

			    app.users.findOne({ email: username, password: password }, 
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

	/**
	* Login process route
	*/
	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/dashboard',
	                                   failureRedirect: '/login',
	                                   failureFlash: true })
	);

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/login');
	});

}