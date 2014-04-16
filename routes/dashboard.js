/*
 * GET dashboard page.
 */
exports.display = function (req, res) {
    res.render('dashboard', {
        title: 'My Dashboard',
        user: req.user
    });
};

exports.list = function (req, res, next) {
    var Goal = require('../models/goal'),
        User = require('../models/user'),
        Note = require('../models/note'),
        Cycle = require('../models/cycle'),
        KRA = require('../models/reviewDocument')
 
        var gusers = [];
    var goalids = [];
    var dashgoals = [];
    var teamusers = [];
    var dashnotes = [];
    var teamuserids = [];
    var gdepartments = [];
    var noteids = [];
    var isKRASet = false;

    var kra = {}, async = require('async')

        async.parallel(


            [

                function (callback) {


                    var cycleInContext = {}

                    Cycle.findOne({
                        companyId: req.user.companyId
                    }).sort({
                        startDate: -1
                    }).exec(function(err, cycle) {
                        if (err) return next(err);

                        if (cycle) {
                            console.log(cycle);

                            KRA.findOne({
                                userId: req.user._id,
                                cycleId: cycle._id
                            }).sort({ 
                                updatedOn: -1
                            }).exec(function (err, doc) {

                                   if (err) return next(err);


                                    if (doc && doc.goals) {

                                        kra = doc;
                                        isKRASet = true;

                                        if (doc.goals.length > 0) {

                                            goalids = doc.goals;

                                            Goal.find({
                                                _id: {
                                                    $in: doc.goals
                                                }
                                            }, function (err, g) {
                                                if (err) return callback(err);

                                                dashgoals = g;
                                                return callback();
                                            });
                                        } else {
                                            return callback();
                                        }
                                    } else {
                                        return callback();
                                    }


                            });
                        } else {
                            return next(new Error('No Such Cycle found'));
                        };
                    });

                },
                function (callback) {
                    Note.find({
                        userId: req.user._id
                    }).sort({
                        addedOn: -1
                    })
                        .exec(function (err, notes) {
                            if (err) return callback(err);

                            dashnotes = notes;
                            for (var i = 0; i < notes.length; i++) {
                                noteids.push(notes[i]._id);
                            };
                            return callback();
                        });
                }
            ], function (err) {
                if (err) return next(err);

                var responseObj = {
                    _id: req.user._id,
                    name: req.user.firstName + ' ' + req.user.lastName,
                    reviewdocument: kra._id,
                    notes: noteids,
                    isKRASet: isKRASet
                };

                return res.send({
                    dashboards: [responseObj],
                    reviewdocuments: [kra],
                    goals: dashgoals,
                    notes: dashnotes
                    
                });
            });

};