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
                            // cycle found.. next logic here

                            // replace with findOne
                            KRA.find({
                                userId: req.user._id,
                                cycleId: cycle._id
                            }).sort({
                                updatedOn: -1
                            }).exec(function (err, doc) {

                                    if (err) return next(err);

                                    if (doc && doc.length > 0 && doc[0].goals) {

                                        kra = doc[0];

                                        if (doc[0].goals.length > 0) {

                                            goalids = doc[0].goals;

                                            Goal.find({
                                                _id: {
                                                    $in: doc[0].goals
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
                if (err) throw err;
                var responseObj = {
                    _id: req.user._id,
                    name: req.user.firstName + ' ' + req.user.lastName,
                    reviewdocument: kra._id,
                    teamusers: teamuserids,
                    notes: noteids
                };

                return res.send({
                    dashboards: [responseObj],
                    reviewdocuments: [kra],
                    goals: dashgoals,
                    notes: dashnotes
                });
            });

};