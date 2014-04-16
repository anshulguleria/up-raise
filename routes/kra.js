
exports.display = function(req, res,next){

    
        var Cycle = require('../models/cycle');


        var User = require('../models/user');

        if(req.params.userId === undefined || req.params.userId === null || req.params.userId === ''){

              res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user,isUserExists : true, isReviewerMode:false});


        }
            
                            
       else if(req.user._id !=  req.params.userId) {
                
            User.findOne({_id : req.params.userId}, function(err, user) {
                if(err)
                    {
                       return res.render('kra', { title: 'KRA' ,  user: req.user, isUserExists : false});
                    }

                 return res.render('kra', { title: 'KRA' ,  user: req.user, employee: user, isUserExists : true,isReviewerMode: true });
            });
        } else {
                    
                return  res.render('kra', { title: 'KRA' ,  user: req.user, employee: req.user, isUserExists : true,isReviewerMode: false });
        }
       
};

exports.post = function(req, res) {

    var KRA = require('../models/reviewDocument');
    var Cycle = require('../models/cycle');
    

    var kra  = new KRA(req.body.reviewdocument);

    kra.userId = req.user._id;
   

    if(req.query.cid){

       Cycle.findOne({_id: req.query.cid},function(err,cycleItem){

             if(cycleItem) {
                kra.cycleId = cycleItem._id;
                kra.save(function(err) {
                if(err) throw err;
                res.send({reviewdocument: kra});
            }); 
             }

            
        });
    }
    else{

        Cycle.findOne({
            companyId : req.user.companyId
            }).sort({
                startDate:-1
            }).exec(function(err, cycleItem) {
                if(err) return next(err);
                
                console.log('cycle get  ' + cycleItem);
                if(cycleItem) {

                    kra.cycleId = cycleItem._id;

                kra.save(function(err) {
                    if(err) throw err;
                    res.send({reviewdocument: kra});
                }); 
                }

            });

    
    
         }
    
    
};

exports.list = function(req, res,next) {

  
    var Cycle = require('../models/cycle');

    var ids = req.params.id.split('__');

    if(ids.length < 2)
        return null;


    var userId = ids[0];
    var cycleId = ids[1];

    if(cycleId){

        findAndReturnReviewDoc(cycleId,userId, res,next  );

    }
    else{

       Cycle.findOne({companyId : req.user.companyId})
        .sort({startDate : -1})
        .exec(function(err,cycle){

            if(err) return next(err);
          
            findAndReturnReviewDoc(cycle._id,userId,res, next);
        });
 
    }

};

findAndReturnReviewDoc = function(cycleId,userId,res,next){

    var KRA = require('../models/reviewDocument');
    var Goal = require('../models/goal');
       
   

    KRA.findOne({ userId : userId , cycleId : cycleId})
            .exec(function(err, doc) {
                if(err) {console.log(err); return next(err);}
    
                if(doc){
               
                    var allGoals = doc.goals;

                    if(allGoals && allGoals.length > 0) {
                         Goal.find({_id: { $in: allGoals } }, function(err, goals) {
                        return res.send({ reviewdocument:  doc , goals: goals });
                    });
                    } else {
                        return res.send({ reviewdocument:  doc });
                    }
                }
                else{
                    return res.send({ reviewdocument:  null });
                }
    
        });
};


          

exports.redirect = function(req, res) {

    var KRA = require('../models/reviewDocument');
    var Goal = require('../models/goal');

    var userId = '';

    //TODO: check autorization first

    if(req.param('id')) {
        id = req.param('id');
    
        KRA.find({ userId: id}).sort({updatedOn: -1}).exec(function(err, doc) { 
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
    
    var kraId = req.param('id');

    var isMailRequired = kra.isApproved;

     if(kra.isApproved){


        ReviewDocument.findOne({_id : kraId })
        .exec(function(err, item){

            item.clone();

            kra.isApproved = false;

            ReviewDocument.findOneAndUpdate({ _id: kraId }, {$set: kra}, function(err, doc) {
                if(err) throw err;

               
                return res.send({reviewdocument: doc});
              }); // improve code

        });
        
     }
     else{

            ReviewDocument.findOneAndUpdate({ _id: kraId }, {$set: kra}, function(err, doc) {
                if(err) throw err;

               
                return res.send({reviewdocument: doc});
              });
        }
         
     if(isMailRequired) {
               console.log('Will send mail');
            }
    
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
                +   "<br />"
                + "<p>" + req.user.firstName + "'s goals have been set/updated. Please approve the goals."
                + " To approve, please click on the link below.</p>"
                + "Up-Raise"
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
    var CloneDocument = require('../models/cloneDocument');
    var nodemailer = require("nodemailer");
    
    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "varun13@gmail.com",
            pass: "junior08111981"
        }
    });

    var docId = req.param('id');
    if(docId) {

        
        ReviewDocument.findOneAndUpdate({ _id: docId }, {$set: {isApproved: true, approvedOn: new Date(), type: 'approved' }}, function(err, doc) {
            if(err) throw err;

            if(doc) {
                CloneDocument.find({ clonefor:doc._id }).remove().exec();
                User.findOne({_id: doc.userId}, function(err, user) {
                        if(err) throw err;
                        // setup e-mail data with unicode symbols
                        var mailOptions = {
                            from: req.user.firstName + " <" + req.user.email + ">", // sender address
                            to: user.email + "," + req.user.email, // list of receivers
                            subject: user.firstName +  " - Your goals have been approved.", // Subject line
                            html: "Dear <strong>" + user.firstName + "</strong>," // html body
                            +   "<br />"
                            + "<p>" + "Your goals have been approved."
                            + " To view your goals, please click on the link below.</p>"
                            + "Up-Raise"
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
                +   "<br />"
                + "<p>" + req.user.firstName + "'s goals have been set/updated. Please approve the goals."
                + " To approve, please click on the link below.</p>"
                + "<br />"
                + "Up-Raise"
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
                            +   "<br />"
                            + "<p>Your goals have been rejected.</p>"
                            + "<br/>"
                            + "<p>Your manager has rejected your goal changes with following comments: " 
                            + req.param('text')
                            + "</p> <br />"
                            + " To view your goals, please click on the link below.</p>"
                            + "<br />"
                            + "Up-Raise"
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

    var ReviewDocument = require('../models/reviewDocument');
    var Goal = require('../models/goal');   
    var parseXlsx = require('excel');
    var async = require('async');
        
    parseXlsx(req.files.btnImportGoals.path, function(err, data) {
        if(err) throw err;
        // data is an array of arrays
        
        if(data && data.length > 0) {
            console.log(data[0]);

            if(data[0][0] == 'KRA') {

                var kra  = new ReviewDocument();
                kra.goals = [];
                var goalSaveFuncs = [];

                for (var i = 1; i < data.length; i++) {
                    if(data[i].length >= 4 && data[i][0] && data[i][0]!=null && data[i][0] != '') {

                        var goal = new Goal();
                        
                        goal.kra = data[i][0];
                        goal.type = data[i][1];
                        goal.description = data[i][2];
                        goal.weight = data[i][3];

                        goalSaveFuncs.push(async.apply(function(item, callback) {
                            item.save(function(err) {
                                if(err) callback(err);
                                kra.goals.push(item._id);
                                callback();
                            });
                        }, goal));
                    }
                };

                if(goalSaveFuncs.length > 0) {

                    var Cycle = require('../models/cycle'); 
                    kra.userId = req.user._id;
                    
                    Cycle.findOne({ companyId: req.user.companyId, isActive: true}, function(err, cycleItem) {
                        if(err) throw err;
                        
                        if(cycleItem) {
                            kra.cycleId = cycleItem._id;
                        }

                        async.parallel(goalSaveFuncs, function(err){ 
                            kra.save(function(err) {
                            if(err) throw err;
                                res.setHeader('Content-Type', 'application/json');
                                return res.send({success: true});
                            }); 
                        });
                        
                    });
                    
                }
                else
                    return res.send(null);  
            }
            else
                    return res.send(null);  
        } else      
            return res.send(null);
    });
    
};

exports.reset = function(req,res){

      var KRA = require('../models/reviewDocument');

      KRA.findOne({_id : req.params.id})
        .exec(function(err, kra){
        
                if(err) throw err;

                if(kra){

                    kra.revertToClone(res); 
                }
                else{
                    res.send(null);
                }

        });

};