/*
 * GET team listing page.
 */
exports.display = function (req, res) {
    res.render('team', {
        title: 'Team',
        user: req.user
    });
};

exports.list = function (req, res) {
  
    var Cycle = require('../models/cycle');
  
    if (req.query.cycleid) {

     Cycle.findOne({_id: req.query.cycleid})
           .exec(function(err,cycle){

           // var teamusers = findTeamForGivenUserforCycle(req.user._id,cycle);
           //  console.log(teamusers);
           //  return res.send(  teamusers );

           });
    } else {

        Cycle.findOne({companyId : req.user.companyId})
            .sort({startDate: -1})
            .exec(function(err,cycle){

            // var teamusers =   findTeamForGivenUserforCycle(req.user._id,cycle);
            // console.log(teamusers);
            //  return res.send( teamusers );
            findTeamForGivenUserforCycle(req.user._id,cycle,res);
            });
    }


};

function findTeamForGivenUserforCycle (userId,cycle,res){
  var KRA = require('../models/reviewDocument');
    var User = require('../models/user');
    var Cycle = require('../models/cycle');
    var teamusers = [];
    var async = require('async');


    User.find({ managerId: userId })
        .sort({firstName: 1 })
        .exec(function (err, users) {
            if (err) throw err;

            if (users && users.length > 0) {

                console.log('found users ' + users.length);
                var userfuncs = [];

                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    var item = {
                                    name: user.firstName + ' ' + user.lastName,
                                    userId: user._id,
                                    _id: user._id
                                };


                    userfuncs.push(function (callback) {
                            KRA.findOne({userId: item.userId, cycleId: cycle._id})
                                .exec(function (err, kra) {
                                    console.log(item.userId);
                                    console.log(cycle._id);

                                    console.log(kra);

                                   if (err) callback(err);

                                

                                        item.appraisalDueDate = cycle.endDate;
                                        var moment = require('moment');
                                        item.isAppraisalDue = moment(item.appraisalDueDate).diff(new Date(), 'days') < 30;
                                        
                                        if(kra === null)
                                        {
                                            item.kraStatus = "KRA Not set";
                                        }
                                        else{

                                            if (kra.isApproved) {
                                                item.kraStatus ="Approved" ;
                                            } else {
                                                item.kraStatus = "Pending for approval";
                                            }
                                        }


                                 

                            console.log(item);
                            teamusers.push(item);
                            callback();

                            });
                        


                    });
                }

          
            
                    async.parallel(userfuncs, function (err) {

                        if (err) throw err;

                        return res.send({teamusers: teamusers});
                    });

             } else {

               return res.send({teamusers: teamusers});
             }
          
        });

    }
