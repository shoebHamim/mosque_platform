const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  text: String,
  date: String, 
  time: String,

});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;