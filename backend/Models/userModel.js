const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  contactNo: String,
  email: String,
  subscribedTo:Array,
  
});


const User = mongoose.model('User', userSchema);
module.exports = User;