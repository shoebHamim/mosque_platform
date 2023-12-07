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
const featuredRoute=require('./Routes/featuredRoute')
const registeredRoute=require('./Routes/registeredRoute')
const announcementRoute=require('./Routes/announcementRoute')


app.use('/users',userRoute)
app.use('/mosques',mosqueRoute)
app.use('/featured',featuredRoute)
app.use('/registered',registeredRoute)
app.use('/announcement',announcementRoute)




// server running code and a root route for checking
app.get('/*', async (req, res) => {
  res.send('mosque server is up and running')
});
app.listen(5000, () => {
  console.log('Server started on port 5000');
});