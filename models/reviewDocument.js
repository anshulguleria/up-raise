
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
  goals: [ { type: Schema.Types.ObjectId, ref: 'Goal' } ]

});

reviewSchema.methods.clone = function clone(success) {

  var ReviewDocument = require('./reviewDocument');
  var CloneDocument = require('./cloneDocument');
  
  var reviewDoc = this.toObject();

  console.log(reviewDoc);
  
  var cloneDoc  = new CloneDocument(
              {type: reviewDoc.type,
                approvedOn:reviewDoc.approvedOn,
                isApproved:reviewDoc.isApproved,
                updatedOn: reviewDoc.updatedOn,
                userId:reviewDoc.userId,
                cycleid:reviewDoc.cycleid,
                goals:reviewDoc.goals,
                clonefor:reviewDoc._id});

  cloneDoc.save(function(err, cloneItem) {    if(err) throw err; console.log(cloneItem); });
  
};

reviewSchema.methods.revertToClone = function revertToClone(res){

 var ReviewDocument = require('./reviewDocument');
 var CloneDocument = require('./cloneDocument');
  
var docId = this.toObject()._id;

  CloneDocument.findOne({clonefor:docId})
                .exec(function(err,clone){
                    console.log(clone);
                     
                     var reviewDoc  = new ReviewDocument(
                                  { 
                                    type: clone.type,
                                    approvedOn:clone.approvedOn,
                                    isApproved:clone.isApproved,
                                    updatedOn: clone.updatedOn,
                                    userId:clone.userId,
                                    cycleid:clone.cycleid,
                                    goals:clone.goals
                                   
                                  });


                     ReviewDocument.findOneAndUpdate({_id : docId},{$set :{goals : clone.goals,isApproved:true} })
                                    .exec(function(err, doc){

                                      if(err) throw err;

                                      if(res)
                                      res.send(doc);
                                    else
                                      return doc;
                                    });

                                  });

 
      };

module.exports = mongoose.model('ReviewDocument', reviewSchema);

