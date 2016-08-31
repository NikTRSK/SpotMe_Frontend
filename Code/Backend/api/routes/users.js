// spLit API User routes

var express = require('express');
var router = express.Router();

// Models
var User = require('../models/user');

// this runs on any request on /api/user
router.use(function(req, res, next) {
  // Log event
  // make this so it checks that the user is authenticated
  console.log('Received a request on User');
  next();	// go to the next route
})

// Routes for users
// -----------------------------------------------------
router.route('/')
  // get all Users
  .get(function(req, res) {
    User.find({}, function(err, users) {
      if (err)
        return console.error(err);
      else
        res.json(users);
    });
  })
  // create a User
  .post(function(req, res) {
    var user = new User();  // create a new instance of the User model
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;

    user.save(function(err) {
      if (err)
        res.send(err);
      else {
        res.json({ message: 'User created!', data: user });
      }
    });
  });

// get a User by ID
router.route('/:_id')
  .get(function(req, res) {
    User.findById(req.params._id, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params._id, function(err, user) {
      if (err)
        res.send(err);
      else {  // update user
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.password = req.body.password;
      }

      user.save(function(err) {
        if (err)
          res.send(err);
        else
          res.json({ message: "User updated", data: user });
      });
    });
  })
  .delete(function(req, res) {
    User.findOneAndRemove({_id: req.params._id}, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json({ message: "User deleted", data: user });
    });
  });

// Routes for username
router.route('/username/:username')
  .get(function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json(user);
    });
  })
  .put(function(req, res) {
    User.findOne({username: req.params.username}, function(err, user) {
      if (err)
        res.send(err);
      else {  // update user
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.username = req.body.username;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.password = req.body.password;
      }

      user.save(function(err) {
        if (err)
          res.send(err);
        else
          res.json({ message: "User updated", data: user });
      });
    });
  })
  .delete(function(req, res) {
    User.findOneAndRemove({username: req.params.username}, function(err, user) {
      if (err)
        res.send(err);
      else
        res.json({ message: "User deleted", data:user});
    });
  });

module.exports = router