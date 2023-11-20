const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app=express()
app.use(express.json())
const cors = require('cors');
app.use(cors());


// mongoDB connection Start
const uri = `mongodb+srv://mosqueDB:${process.env.DB_PASS}@cluster0.rdlfifr.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();
    const mosqueDB=client.db('mosque-platform')
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const mosques=mosqueDB.collection('mosques');
    const users=mosqueDB.collection('users');


    app.post('/mosques',async(req,res)=>{
     const mosquesData=req.body;
      const result = await mosques.insertOne(mosquesData);    
      res.send(result)
    })

    app.post('/users',async(req,res)=>{
      console.log(req.body);
      const userData=req.body;
      const result=await users.insertOne(userData)
      res.send(result)
    })
    app.get('/users/:email', async (req, res) => {
      const email = req.params.email;
      const user = await users.findOne({ email: email });
      res.send({found:user?true:false})
    });    
    app.get('/mosques/:email', async (req, res) => {
      const email = req.params.email;
      const user = await mosques.findOne({ email: email });
      res.send({found:user?true:false})
    });



  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// mongoDB connection End






app.get('/', (req, res) => {
  res.send('Mosque Platform\'s server is up and running!');
});


app.listen(5000, () => {
  console.log('Server started on port 5000');
});