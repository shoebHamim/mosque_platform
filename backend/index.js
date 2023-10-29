const express=require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app=express()


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
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // const users=mosqueDB.collection('users');
    // const data = { name: 'John Doe', email: 'john@example.com', age: 30 };
    // const result = await users.insertOne(data);
    // console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`);



  } finally {
    await client.close();
  }
}
run().catch(console.dir);
// mongoDB connection End












app.get('/', (req, res) => {
  res.send('Mosque Platform\'s server is up and running!');
});
app.listen(5005, () => {
  console.log('Server started on port 5005');
});