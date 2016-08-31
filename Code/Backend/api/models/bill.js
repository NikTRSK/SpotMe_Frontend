// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var billSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, // key to the users model
  curr_balance: Number,
  items: [
    {
      item: String,
      qty: {
        type: Number,
        default: 1
      },
      cost: Number,
      paid: {
        type: Boolean,
        default: false
      },
      spl_with: [
        {
          user: String // map to user
        }
      ]
    }
  ]
});

// Return model
module.exports = restful.model('Bill', billSchema);