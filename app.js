
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var passport = require('passport')
  , flash = require('connect-flash');


var dashboard = require('./routes/dashboard');
var goals = require('./routes/goals');
var appraisals = require('./routes/appraisals');
var perfdiary = require('./routes/perfdiary');
var team = require('./routes/team');
var authenticate = require('./routes/authenticate');
var authApi = require('./apis/authenticate')(passport);


mongoose.connect('mongodb://127.0.0.1/up-raise');

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

app.get('/', authenticate.display);
app.get('/login', authenticate.display);
app.get('/dashboard', dashboard.display);
app.get('/goals', goals.list);
app.get('/appraisals', appraisals.history);
app.get('/self-appraisal', appraisals.self);
app.get('/view-appraisal', appraisals.view);
app.get('/review-appraisal', appraisals.review);
app.get('/perfdiary', perfdiary.view);
app.get('/team', team.list);

app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard',
	                                   failureRedirect: '/login',
	                                   failureFlash: true }));

app.get('/logout', authenticate.logout);

http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
});
