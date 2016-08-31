// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Bill = require('../models/Bill');
//var User = require('../models/User')

// Routes
Bill.methods(['get', 'put', 'post', 'delete']);
Bill.register(router, '/Bills');

// Routes for the API
router.use(function(req, res, next) {
  // Log event
  // make this so it checks that the user is authenticated
  console.log('Received a request');
  next();	// go to the next route
})

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
/*

 // on routes that end in /bills
 // ----------------------------------------------------
 router.route('/bills')

 // create a bill (accessed at POST http://localhost:3000/bills)
 .post(function(req, res) {

 var bill = new Bill();		// create a new instance of the Bill model
 bill.curr_balance = req.body.curr_balance;  // set the bill current balance (comes from the request)

 bear.save(function(err) {
 if (err)
 res.send(err);

 res.json({ message: 'Bill created!' });
 });


 })

 // get all the bills (accessed at GET http://localhost:3000/api/bills)
 .get(function(req, res) {
 Bill.find(function(err, bills) {
 if (err)
 res.send(err);

 res.json(bills);
 });
 });

 // on routes that end in /bears/:bear_id
 // ----------------------------------------------------
 router.route('/bills/:bill_id')

 // get the bear with that id (accessed at GET http://localhost:3000/api/bills/:bill_id)
 .get(function(req, res) {
 Bill.findById(req.params.bear_id, function(err, bill) {
 if (err)
 res.send(err);
 res.json(bill);
 });

 // update the bill with this id (accessed at PUT http://localhost:3000/api/bills/:bill_id)
 .put(function(req, res) {

 // use our bill model to find the bill we want
 Bill.findById(req.params.bill_id, function(err, bill) {

 if (err)
 res.send(err);

 bill.curr_balance = req.body.curr_balance;  // update the bears info

 // save the bear
 bill.save(function(err) {
 if (err)
 res.send(err);

 res.json({ message: 'Bill updated!' });
 });

 });

 // delete the bill with this id (accessed at DELETE http://localhost:3000/api/bills/:bill_id)
 .delete(function(req, res) {
 Bill.remove({
 _id: req.params.bill_id
 }, function(err, bill) {
 if (err)
 res.send(err);

 res.json({ message: 'Successfully deleted' });
 });
 });
 */


// Return router
module.exports = router;