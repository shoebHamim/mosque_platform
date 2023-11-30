const mongoose = require('mongoose');
const News = require('./newsModel');

const mosqueSchema = new mongoose.Schema({
  name: String,
  division: String,
  address: String,
  imamName: String,
  contactNo: String,
  email: String,
  description: String,
  img: String,
  subscribers: Array,
  news: [News.schema], // Embed the news schema
});

const Mosque = mongoose.model('Mosque', mosqueSchema);

module.exports = Mosque;
