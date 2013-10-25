
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
var diaryitems = require('./routes/diaryitems');
var team = require('./routes/team');

var authenticate = require('./routes/authenticate');
var OPTS = { server: {
				url: 'ldap://<server>:389',		      
				searchBase: '<base>',
				searchFilter: '(sAMAccountName={{username}})',
				adminDn: '<admin-user>',
				adminPassword: '<admin-pwd>',
				searchAttributes: ['displayName', 'mail', 'givenName', 'sn']				
		    },
		    usernameField: 'email', 
			passwordField: 'password'	
		};

var authApi = require('./apis/authenticate')(passport);
var authApildap = require('./apis/ldap-authenticate')(passport, OPTS);
var authType = 'local'; //ldapauth

var companies = require('./routes/admin/companies');
var employees = require('./routes/admin/employees');
var departments = require('./routes/admin/departments');
var teams = require('./routes/admin/teams');
var roles = require('./routes/admin/roles');

var notes = require('./routes/notes');

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

app.get('/kra', kra.display);
app.get('/kra/:id', kra.display);

app.get('/teamkra/:id', kra.redirect);

app.get('/appraisals', appraisals.history);
app.get('/self-appraisal', appraisals.self);
app.get('/view-appraisal', appraisals.view);
app.get('/review-appraisal', appraisals.review);
app.get('/perfdiary', perfdiary.view);
app.get('/perfdiary/:id', perfdiary.view);
app.get('/teamdiary/:userId', perfdiary.displayForUser);
app.get('/team', team.display);

app.post('/login', passport.authenticate(authType, { successRedirect: '/dashboard',
	                                   failureRedirect: '/login',
	                                   failureFlash: true }));

app.get('/logout', authenticate.logout);

app.get('/admin/companies', companies.display);
app.get('/admin/employees', employees.display);
app.get('/admin/departments', departments.display);
app.get('/admin/teams', teams.display);

//API routes

app.get('/api/dashboards', dashboard.list);
app.get('/api/dashboards/:id', dashboard.list);

app.get('/api/goals', goals.list);
app.put('/api/goals/:id', goals.put);
app.delete('/api/goals/:id', goals.delete);
app.post('/api/goals', goals.post);
app.post('/api/goals/upload', kra.upload);

app.get('/api/reviewDocuments', kra.list);
app.put('/api/reviewDocuments/:id', kra.put);
app.post('/api/reviewDocuments', kra.post);
app.get('/api/reset/:id', kra.delete);
app.get('/api/clonekra/:id', kra.delete);
app.get('/api/requestApproval', kra.requestApproval);
app.get('/api/approve/:id', kra.approve);
app.post('/api/reject/:id', kra.reject);


app.get('/api/companies', companies.list);
app.post('/api/companies', companies.create);
app.put('/api/companies/:id', companies.update);
app.delete('/api/companies/:id', companies.delete);

app.post('/api/notes', notes.create);
app.delete('/api/notes/:id', notes.delete);

app.get('/api/perfdiaries', perfdiary.list);
app.post('/api/perfdiaries', perfdiary.post);
app.put('/api/perfdiaries/:id', perfdiary.put);

app.post('/api/diaryitems', diaryitems.post);
app.put('/api/diaryitems/:id', diaryitems.put);
app.delete('/api/diaryitems/:id', diaryitems.delete);

app.get('/api/teamusers', team.list);

app.get('/api/employees', employees.list);
app.post('/api/employees/upload', employees.upload);
app.post('/api/employees', employees.create);
app.put('/api/employees/:id', employees.update);
app.delete('/api/employees/:id', employees.delete);

app.get('/api/departments', departments.list);
app.post('/api/departments', departments.create);
app.put('/api/departments/:id', departments.update);
app.delete('/api/departments/:id', departments.delete);


app.get('/api/teams', teams.list);
app.post('/api/teams', teams.create);
app.put('/api/teams/:id', teams.update);
app.delete('/api/teams/:id', teams.delete);

app.get('/api/roles', roles.list);
app.post('/api/roles', roles.create);
app.put('/api/roles/:id', roles.update);
app.delete('/api/roles/:id', roles.delete);


http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
});
