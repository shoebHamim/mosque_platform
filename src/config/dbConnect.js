const { MongoClient, ServerApiVersion } = require('mongodb');
// 'mongodb+srv://admin:thestrategists@cluster0.rdlfifr.mongodb.net/?retryWrites=true&w=majority'
const dbConnect = async () => {
    try {
        const uri = `mongodb+srv://mosqueDB:VbZT7IhsioLq8TvX@cluster0.rdlfifr.mongodb.net/?retryWrites=true&w=majority`
        const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            }
        })
        await client.connect();
        const mosqueDB=client.db('mosque-platform')
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err; // Rethrow the error to handle it elsewhere
    }
};

module.exports = dbConnect;
