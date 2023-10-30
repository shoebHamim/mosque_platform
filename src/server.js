// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB (Replace the connection URL with your MongoDB URL)
mongoose.connect('mongodb+srv://admin:thestrategists@cluster0.rdlfifr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

// Define a MongoDB schema and model for your data
const mosqueSchema = new mongoose.Schema({
  name: String,
  address: String,
  number: String,
  imam: String,
  description: String,
  pictures: [String],
});

const Mosque = mongoose.model('Mosque', mosqueSchema);

// Middleware for handling user input and saving it to MongoDB
// Update an existing mosque data by ID
app.put('/api/updateMosqueData/:mosqueId', (req, res) => {
  const mosqueId = req.params.mosqueId;
  const updatedData = req.body;

  // Filter out the fields that are not null
  const filteredData = {};
  for (const key in updatedData) {
    if (updatedData[key] !== null && updatedData[key] !== undefined) {
      filteredData[key] = updatedData[key];
    }
  }

  if (Object.keys(filteredData).length === 0) {
    return res.status(400).send('No valid fields to update');
  }

  Mosque.findByIdAndUpdate(mosqueId, filteredData, { new: true }, (err, updatedMosque) => {
    if (err) {
      console.error('Error updating data in MongoDB:', err);
      res.status(500).send('Error updating data');
    } else {
      console.log('Data updated in MongoDB:', updatedMosque);
      res.status(200).send('Data updated successfully');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
