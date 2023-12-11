const mongoose = require('mongoose');

const registeredSchema = new mongoose.Schema({
  name: String,
  division: String,
  address: String,
  imamName: String,
  contactNo: String,
  email: String,
  description: String,
  PhotoURLs: Array
  

});

const Registered = mongoose.model('Registered', registeredSchema);

module.exports = Registered;