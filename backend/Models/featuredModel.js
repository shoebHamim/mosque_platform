const mongoose = require('mongoose');

const featuredSchema = new mongoose.Schema({
  name: String,
  division: String,
  location: String,
  locationURL: String,
  PhotoURLs: Array,
  description: String,
  email: String,
  infoURL: String,

});

const Featured = mongoose.model('Featured', featuredSchema);

module.exports = Featured;