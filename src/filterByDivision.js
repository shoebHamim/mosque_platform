import React from 'react'
import dbConnect from './dbConnect';
import { useEffect, useState } from 'react';

const FilterByDivision = (divisonName) => {
  const [filteredMosques, setFilteredMosques] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = dbConnect();
        const dbName = 'mosque-platform';
        const collectionName = 'mosques';
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        let cursor = collection.find({ division: divisonName });
        let documents = await cursor.toArray();
        if (documents.length === 0) {
          cursor = collection.find()
          documents = await cursor.toArray();
        }
        setFilteredMosques(documents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [divisonName]);
  
  

  return (
    <div className="app">
      {filteredMosques.map(item => (
        <displayFilteredMosques key={item._id} item={item} />
      ))}
    </div>
  )
}

export default FilterByDivision