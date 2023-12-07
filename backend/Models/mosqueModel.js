const mongoose = require('mongoose');

const mosqueSchema = new mongoose.Schema({
  name: String,
  division: String,
  address: String,
  imamName: String,
  contactNo: String,
  email: String,
  description: String,
  img: Array,
  subscribers: Array
});

const Mosque = mongoose.model('Mosque', mosqueSchema);

module.exports = Mosque;