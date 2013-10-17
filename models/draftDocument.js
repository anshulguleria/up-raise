var mongoose = require('mongoose');
var reviewSchema = require('./reviewSchema');

module.exports = mongoose.model('DraftDocument', reviewSchema);
