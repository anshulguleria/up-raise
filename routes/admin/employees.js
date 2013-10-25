exports.display = function(req, res){
  res.render('admin/employees', { title: 'Employee Listing' ,  user: req.user });
};

exports.list = function(req, res) {
	var Employee = require('../../models/user');
	var Department = require('../../models/department');
	var Team = require('../../models/team');

	Employee.find({ companyId: req.param('companyId') }, function(err, employees) { 
		
		if(err) throw err;

		Department.find({ companyId: req.param('companyId') }, function(err, departments) {

			if(err) throw err;

			Team.find({ companyId: req.param('companyId') }, function(err, teams) {			 
				if(err) throw err;
	
				return res.send({ employees: employees, departments: departments, teams: teams });	
			});
		});
	});
};

exports.create = function(req, res) {
	var Employee = require('../../models/user');
	
	var employee  = new Employee(req.body.employee);
	
	employee.companyId = req.user.companyId;

	employee.isEnabled = true;
	
	employee.save(function(err) {
		if(err) throw err;
		res.send({employee: employee});
	});
};

exports.update = function(req, res) {
	var Employee = require('../../models/user');
	
	var employee  = req.body.employee;
	var id = req.param('id');

	
	Employee.findOneAndUpdate({_id: id},{$set: employee },function(err, doc) {
		if(err) throw err;
		res.send({employee: doc });
	});	
};

exports.delete = function(req, res) {
	var Employee = require('../../models/user');
	
	var id = req.param('id');

	Employee.findOneAndUpdate({_id: id},{$set: {isEnabled: false} },function(err, doc) {
		if(err) throw err;
		res.send(null);
	});	
};

var Employee = require('../../models/user');
var parseXlsx = require('excel');
var async = require('async');
	

exports.upload = function(req, res) {

		
	parseXlsx(req.files.btnImport.path, function(err, data) {
		if(err) throw err;
		// data is an array of arrays
		
		if(data && data.length > 0) {
			console.log(data[0]);

			if(data[0][0] == 'EmployeeId') {

				console.log('calling addDepartments');
				return addDepartments(req, res, data);

			}
			else
					return res.send(null);	
		} else		
			return res.send(null);
	});
	
};

function addDepartments(req, res, data) {
	var departmentFuncs = [];
	var companyId = req.param('companyId');
	var Department = require('../../models/department');

	console.log('inside addDepartments');
	Department.find({ companyId: companyId}, function(err, departments) {
		if(err) throw err;

		console.log('found departments ' + departments);

		var existingDepartments = [];

		if(departments) {
			departments.forEach(function(item) {

				console.log('adding to exisint departments ' + item);

				existingDepartments.push(item.name);
			});
		}

		for (var i = 1; i < data.length; i++) {
			if(data[i].length >= 9 && data[i][0] && data[i][0]!=null && data[i][0] != '') {

				//add departments
				departmentFuncs.push(async.apply(saveDepartment, data[i], existingDepartments, companyId));
			}
		}

		async.series(departmentFuncs, function(err) {
			if(err) throw err;
			//add teams
			console.log('calling addTeams');
			return addTeams(req, res, data);
		});
		
	})
}

function saveDepartment(data, existing, companyId, callback){
	var i = 6;
	console.log('inside saveDepartment');
	console.log('data ' + data);

	if(data.length >= 9 && data[i] && data[i]!=null && data[i] != '') {

		var dep = data[i];
		var Department = require('../../models/department');

		if(existing.indexOf(dep) == -1) {

			console.log('saving department ' + dep);

			Department.findOne({ name: dep, companyId: companyId }, function(err, item) {
				if (err) { return callback(err) };

				if(!item) {

					var department = new Department({name: dep, companyId: companyId});
					department.save(function(err) {
						if(err) return callback(err);
						return callback();						
					});
				}else {
					return callback();
				}

			});
		}else {
			return callback();
		}
	} else { return callback(); }
}

function addTeams(req, res, data) {
	var teamFuncs = [];
	var companyId = req.param('companyId');
	var Team = require('../../models/team');
	
	console.log('inside addTeams');

	Team.find({ companyId: companyId}, function(err, teams) {
		if(err) throw err;

		var existingTeams = [];

		if(teams) {
			teams.forEach(function(item) {
				existingTeams.push(item.name);
			});
		}

		for (var i = 1; i < data.length; i++) {
			if(data[i].length >= 9 && data[i][0] && data[i][0]!=null && data[i][0] != '') {

				//add teams
				teamFuncs.push(async.apply(saveTeam, data[i], existingTeams, companyId));
			}
		}

		async.series(teamFuncs, function(err) {
			if(err) throw err;
			//add employees
			console.log('calling addEmployees');
			return addEmployees(req, res, data);
		});
		
	})
};

function saveTeam(data, existing, companyId, callback){
	var i = 7;
	console.log('inside saveTeam');
	if(data.length >= 9 && data[i] && data[i]!=null && data[i] != '') {

		var team = data[i];
		var Team = require('../../models/team');

		if(existing.indexOf(team) == -1) {

			Team.findOne({ name: team, companyId: companyId }, function(err, item) {
				if (err) { return callback(err) };

				if(!item) {
					console.log('saving team ' + team);

					var object = new Team({name: team, companyId: companyId});
					object.save(function(err) {
						if(err) return callback(err);

						return callback();
					});
				} else {
					return callback();
				}

			});
		} else { return callback(); }
	} else { return callback(); }
};

function addEmployees(req, res, data) {
	var empFuncs = [];
	var companyId = req.param('companyId');
	var Employee = require('../../models/user');
	console.log('inside addEmployees');

	Employee.find({ companyId: companyId}, function(err, users) {
		if(err) throw err;

		var existingUsers = [];

		if(users) {
			users.forEach(function(item) {
				existingUsers.push(item.email);
			});
		}

		for (var i = 1; i < data.length; i++) {
			if(data[i].length >= 9 && data[i][0] && data[i][0]!=null && data[i][0] != '') {

				//add users
				empFuncs.push(async.apply(saveEmployee, data[i], existingUsers, companyId));
			}
		}

		async.series(empFuncs, function(err) {
			if(err) throw err;
			//add relations
			console.log('calling addRelations');

			return addRelations(req, res, data);
		});
		
	})
};

function saveEmployee(data, existing, companyId, callback){
	var i = 0;

	console.log('inside saveEmployee');

	if(data.length >= 9 && data[i] && data[i]!=null && data[i] != '') {

		var Employee = require('../../models/user');

		if(existing.indexOf(data[4]) == -1) {

			var employee = new Employee();
			employee.empId = data[0];								
			employee.firstName = data[1];
			employee.lastName = data[2];
			employee.email = data[4];
			employee.password = data[0];
			employee.roles = 'employee';
			employee.joiningDate = data[5];
			employee.companyId = companyId;

			console.log('saving employee ' + employee.firstName);
			employee.save(function(err) {
				if(err) return callback(err);

				return callback();
			});

		} else {
			return callback();
		}
	} else { return callback(); }
};

function addRelations(req, res, data) {
	var empFuncs = [];
	var companyId = req.param('companyId');
	var Employee = require('../../models/user');
	var Department = require('../../models/department');
	var Team = require('../../models/team');
	
	var departments = {};
	var teams = {};
	var managers = {};

	console.log('inside addRelations');

	Department.find({ companyId: companyId}, function(err, items) {
		if(err) throw err;

		items.forEach(function(item) {
			departments[item.name] = item._id;
		});

		Team.find({ companyId: companyId}, function(err, teamItems) {
			if(err) throw err;

			teamItems.forEach(function(teamItem) {
				teams[teamItem.name] = teamItem._id;
			});

			Employee.find({ companyId: companyId}, function(err, empItems) {
				if(err) throw err;

				empItems.forEach(function(empItem) {
					managers[empItem.email] = empItem._id;
				});

				for (var i = 1; i < data.length; i++) {
					if(data[i].length >= 9 && data[i][0] && data[i][0]!=null && data[i][0] != '') {

						//add relations
						empFuncs.push(async.apply(updateEmployee, data[i], departments, teams, managers, companyId));
					}
				}

				async.series(empFuncs, function(err) {
					if(err) throw err;

					console.log('returning success');

					return res.send({success: true});
				});

			});

		});
	});	
	
};

function updateEmployee(data, departments, teams, employees, companyId, callback){
	var i = 0;

	console.log('inside updateEmployee');

	if(data.length >= 9 && data[i] && data[i]!=null && data[i] != '') {

		var Employee = require('../../models/user');
		
		Employee.findOne({ email: data[4], companyId : companyId}, function(err, employee) {

			if(employee) {
				console.log('updateing employee ' + employee.firstName );
				Employee.update({ _id: employee._id }, {$set: { 
					departmentId: departments[data[6]], 
					teamId: teams[data[7]],
					managerId: employees[data[8]]
				} }, function(err) {
					if(err) return callback(err);
					return callback();
				});
			} else {
				return callback();
			}

			
			
		});
		
	} else { return callback(); }
};