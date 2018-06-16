var mongoose = require('mongoose');

var SubjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    default: ''
  },
  fileName:{
      type: String,
      default: ''
  },
  filepath: {
    type: String,
    default: ''
  },
  semester:{
    type: Number,
    default: ''
  }

});

module.exports = mongoose.model('Subject', SubjectSchema);
