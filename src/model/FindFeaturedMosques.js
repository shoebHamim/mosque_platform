const dbConnect = require('../config/dbConnect');

const findFeaturedMosques = async () => {
  try {
    const client = dbConnect();
    const dbName = 'mosque-platform';
    const collectionName = 'featured-mosques';
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const cursor = collection.find();
    const documents = await cursor.toArray();

    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Optionally rethrow the error to be handled elsewhere
  }
};

export default findFeaturedMosques;
