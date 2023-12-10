import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FeaturedCard from './FeaturedCard';

const AllFeatured = () => {
  const [mosques, setMosques] = useState([]);

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const response = await axios.get('http://localhost:5000/featured');
        setMosques(response.data);
      } catch (error) {
        console.error('Error fetching mosques:', error);
      }
    };

    fetchMosques();
  }, []);

  return (
    <div className='grid grid-cols-3 mx-28'>
      {mosques.map((mosque, index) => (
        <FeaturedCard key={index} data={mosque} />
      ))}
    </div>
  );
};

export default AllFeatured;