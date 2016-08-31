// Dependencies
var restful = require('node-restful');
var bcrypt = require('bcrypt-nodejs');
var mongoose = restful.mongoose;

function validatePresenceOf (value) {
  return value.length > 1;
}

// Schema
var userSchema = new mongoose.Schema({
/*  firstname: String,
  lastname: String,*/
  local            : {
    email        : String,
    password     : String,
  },
  facebook         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  },
  twitter          : {
    id           : String,
    token        : String,
    displayName  : String,
    username     : String
  },
  google           : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }/*,
  phone: Number,
  created: {
    type: Date,
    default: Date.now
  }*/
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Return model
module.exports = restful.model('User', userSchema);