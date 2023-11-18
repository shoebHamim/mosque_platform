const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB Atlas
const MONGODB_URI = `mongodb+srv://mosqueDB:${process.env.DB_PASS}@cluster0.rdlfifr.mongodb.net/mosque-platform?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
// Define your MongoDB schema and model
const mosqueSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
});

const Mosque = mongoose.model('mosques', mosqueSchema);

// Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API endpoint to handle form submissions with image upload
app.post('/submit-form', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file;

    // Handle image processing and storage as needed
    // For simplicity, we will just convert the image to a data URL and store it as a string
    const imageUrl = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;

    const newMosque = new Mosque({ name, description, imageUrl });
    await newMosque.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
