const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    text: String,
    date: String,
    time: String,
});

const Featured = mongoose.model('Announcements', announcementSchema);

module.exports = Featured;