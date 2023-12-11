
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  email: { type: String, required: true },

});

const News = mongoose.model('News', newsSchema);

module.exports = News;

