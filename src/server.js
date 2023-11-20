const dbConnect = require('./config/dbConnect');
const express = require('express');
//const mongoose = require('mongoose');
const app = express();
const cors =  require('cors')
const corsOptions = require('./config/corsOptions');
const PORT = 3000;

// Connecting to DB
dbConnect();

// Middleware for handling cross-origin requests
app.use(cors(corsOptions));

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/update', require('./routes/updateMosqueRoute'));
//app.use('/show', require('./routes/featuredMosquesRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

