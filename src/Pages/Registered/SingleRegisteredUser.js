import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Carousel3 from '../../components/carousal3';
import Carousel2 from '../../components/carousal2';

function SingleRegistered() {
  const [mosque, setMosque] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registered/${id}`);
        setMosque(response.data);
      } catch (error) {
        console.error('Error fetching mosque details:', error);
        setMosque(null);
      }
    };

    fetchMosqueDetails();
  }, [id]);

  if (!mosque) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black">
      <div style={{ display: 'flex' }}>
        {/* Left Column */}
<div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '0rem' }}>
          {/* Carousel at the top */}
          <Carousel3 />

          {/* Details info */}
      <div style = {{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '0rem' }}>
            <h1 style={{ fontWeight: 'bold' }}>{mosque.name}</h1>
            <h7 style={{ fontSize: 'smaller' }}>{mosque.location}</h7>
            <h6 style={{ fontSize: 'smaller' }}>Division: {mosque.division}</h6>
            <p>{mosque.description}</p>
            <Link to={mosque.infoURL}>
              <p className="link link-primary">See more details</p>
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* Embedded Map */}
          Annoucment 
          <Link to={`/Edit/${mosque._id}`}>
            <button className="btn-sm text-white bg-blue-500 rounded-2xl">
              Subscribe
            </button>
          </Link>
          <div className="form-control w-full max-w-xs">
            <input type="text" placeholder="Type here" className="input input-bordered w-15px max-w-xs" />
          </div>
        </div>
      </div>

      {/* Go to Edit Page Button */}
      <div className="text-center">
        <Link to={`/Edit/${mosque._id}`}>
          <button className="btn-sm text-white bg-blue-500 rounded-2xl">
            Go to Edit Page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SingleRegistered;
