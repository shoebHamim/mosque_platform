const mongoose = require('mongoose');

const userpageSchema = new mongoose.Schema({
  name: String,
  contactNo: String,
  email: String,
});

const User = mongoose.model('User', userpageSchema);

module.exports = User;