
/**
 *
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;
 
var reviewSchema = new Schema({ 
  type: String,
  approvedOn: Date,
  isApproved: Boolean,
  updatedOn: { type: Date, default: Date.now},

  // associations
  userId: { type: ObjectId, ref: 'User' },
  cycleId: { type: ObjectId, ref: 'Cycle' },
});
  goals: [ { type: Schema.Types.ObjectId, ref: 'Goal' } ]

reviewSchema.methods.clone = function clone(success) {

  var ReviewDocument = require('./reviewDocument');
  var Goal = require('./goal');
  var newGoals = [];
  console.log('old kra: ' + this);

  var document = this.toObject();
  delete(document._id);

  console.log('after delete old kra: ' + document._id);
  var newDoc = new ReviewDocument(document);
  newDoc.goals = newGoals;
  console.log('new kra: ' + newDoc);
  newDoc.save(function(err) {
    if(err) throw err;
    document.goals.forEach(function(goalId){
      Goal.findOne({_id: goalId}, function(err, goalItem) { 
        console.log('old goal: ' + goalId);
        var goalDocument = goalItem.toObject();
        delete(goalDocument._id);
        var goal  = new Goal(goalDocument);
        console.log('new goal: ' + goal._id);
        goal.save(function(err){ if(err) throw err; });
        newGoals.push(goal._id);

        ReviewDocument.update({_id: newDoc._id}, {$set: {goals: newGoals}}, function(err) { if(err) throw err; });

      });
    });
    if(success)
      success(newDoc);      
  });
};

module.exports = mongoose.model('ReviewDocument', reviewSchema);

