const express=require('express')
const app=express()
const cors = require('cors');
const dbConnect = require('./dbConnect'); 
// middleware
app.use(express.json())
app.use(cors());
// dbConnect
dbConnect();


// routes
const mosqueRoute=require('./Routes/mosqueRoute')
const userRoute=require('./Routes/userRoute')
app.use('/users',userRoute)
app.use('/mosques',mosqueRoute)






// server running code and a root route for checking
app.get('/*', async (req, res) => {
  res.send('mosque server is up and running')
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});