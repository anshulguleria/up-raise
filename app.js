
/**
 * Module dependencies.
 */

var express = require('express');
var mongodb = require('mongodb');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash');


var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var goals = require('./routes/goals');
var appraisals = require('./routes/appraisals');
var perfdiary = require('./routes/perfdiary');
var team = require('./routes/team');

var server = new mongodb.Server('127.0.0.1', 27017);

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/login', login.login);
app.get('/dashboard', dashboard.display);
app.get('/goals', goals.list);
app.get('/appraisals', appraisals.history);
app.get('/self-appraisal', appraisals.self);
app.get('/view-appraisal', appraisals.view);
app.get('/review-appraisal', appraisals.review);
app.get('/perfdiary', perfdiary.view);
app.get('/team', team.list);



mongodb.Db('up-raise', server).open(function(err, client) {
	
	if(err) throw err;

	console.log('connected to mongo db');

	app.users = new mongodb.Collection(client, 'users');

	client.ensureIndex("users", "email", function (err) {
		if (err) throw err;
		client.ensureIndex("users", "password", function (err) {
			if (err) throw err;
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

		http.createServer(app).listen(app.get('port'), function(){
	  		console.log('Express server listening on port ' + app.get('port'));
		});
	});	

});

/**
* Login process route
*/
app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);