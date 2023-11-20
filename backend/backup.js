
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









  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// mongoDB connection End





app.get('/', (req, res) => {
  res.send('Mosque Platform\'s server is up and running!');
});