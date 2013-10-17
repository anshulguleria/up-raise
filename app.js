
/**
 * Module dependencies.
 */

var express = require('express');
var mongoose = require('mongoose');

var passport = require('passport')
  , flash = require('connect-flash')
  , engine = require('ejs-locals');


var dashboard = require('./routes/dashboard');
var goals = require('./routes/goals');
var kra = require('./routes/kra');
var appraisals = require('./routes/appraisals');
var perfdiary = require('./routes/perfdiary');
var team = require('./routes/team');
var authenticate = require('./routes/authenticate');
var authApi = require('./apis/authenticate')(passport);


mongoose.connect('mongodb://127.0.0.1/up-raise');

var http = require('http');
var path = require('path');

var app = express();

app.engine('ejs', engine);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

app.get('/goals', goals.display);
//app.get('/goals/reset', goals.reset);

app.get('/kra', kra.display);

app.get('/appraisals', appraisals.history);
app.get('/self-appraisal', appraisals.self);
app.get('/view-appraisal', appraisals.view);
app.get('/review-appraisal', appraisals.review);
app.get('/perfdiary', perfdiary.view);
app.get('/team', team.list);

app.post('/login', passport.authenticate('local', { successRedirect: '/kra',
	                                   failureRedirect: '/login',
	                                   failureFlash: true }));

app.get('/logout', authenticate.logout);


//API routes

app.get('/api/goals', goals.list);
app.put('/api/goals/:id', goals.put);
app.delete('/api/goals/:id', goals.delete);
app.post('/api/goals', goals.post);

app.get('/api/reviewDocuments', kra.list);
app.put('/api/reviewDocuments/:id', kra.put);

http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
});
