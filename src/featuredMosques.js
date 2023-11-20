import React, { useEffect, useState } from 'react';
import displayFeaturedMosques from './displayFeaturedMosques';
import dbConnect from './config/dbConnect';

const FeaturedMosques = () => {
  const [featuredMosques, setFeaturedMosques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = await dbConnect();
        const dbName = 'mosque-platform';
        const collectionName = 'featured-mosques';
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const cursor = collection.find();
        const documents = await cursor.toArray();
        
        setFeaturedMosques(documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="app">
      {featuredMosques.map(item => (
        <displayFeaturedMosques key={item._id} item={item} />
      ))}
    </div>
  );
};

export default FeaturedMosques;
