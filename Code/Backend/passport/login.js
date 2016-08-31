var LocalStrategy = require('passport-local').Strategy;
var User = require('../api/models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.use('login', new LocalStrategy({
      passReqToCallback: true
    },
    function (req, username, password, done) {
      // check in mongo if a user with username exists or not
      User.finOne({'username': username},
        function (err, user) {
          // In case of any error, return using done method
          if (err)
            return done(err);
          // Username doen't exist, log error & redirect back
          if (!user) {
            console.log('User Not Found with username' + username);
            return done(null, false,
              req.flash('message', 'User not found.'));
          }
          // User exists but wrong password, log the error
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false,
              req.flash('message', 'Invalid Passowrd'));
          }
          // User and password both match, return user form
          // done method which will be treated like success
          return done(null, user);
        }
      );
    })
  );

// check if password is valid
  var isValidPassword = function (user, password) {
    // check for enctypted password
    return bCrypt.compareSync(password, user.password);
  }
}