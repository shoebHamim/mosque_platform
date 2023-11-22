const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = `mongodb+srv://mosqueDB:${process.env.DB_PASS}@cluster0.rdlfifr.mongodb.net/mosque-platform?retryWrites=true&w=majority`;
async function dbConnect() {
 
    mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
}


module.exports = dbConnect;