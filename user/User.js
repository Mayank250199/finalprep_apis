var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: 'hello'
  },
  lastname: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
});

UserSchema.methods.generateHash = function(Password){
  return bcrypt.hashSync(Password, bcrypt.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(Password){
  return bcrypt.compareSync(Password,this.Password,null);
};

module.exports = mongoose.model('User', UserSchema);
