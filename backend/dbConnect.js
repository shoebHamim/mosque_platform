const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = `mongodb://mosqueDB:${process.env.DB_PASS}@ac-vyo8d9d-shard-00-00.rdlfifr.mongodb.net:27017,ac-vyo8d9d-shard-00-01.rdlfifr.mongodb.net:27017,ac-vyo8d9d-shard-00-02.rdlfifr.mongodb.net:27017/?ssl=true&replicaSet=atlas-p9mkrx-shard-0&authSource=admin&retryWrites=true&w=majority`
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