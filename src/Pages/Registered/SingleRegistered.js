import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { UserState } from 'realm-web';
import Announcement from  '../announcement/announcement';
function SingleRegistered() {
  const [mosque, setMosque] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registered/${id}`);
        setMosque(response.data);
        console.log(response);

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
          

          {/* Details info */}
      <div style = {{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '0rem' }}>
            <h1 style={{ fontWeight: 'bold' }}>{mosque.name}</h1>
            <h7 style={{ fontSize: 'smaller' }}>{mosque.location}</h7>
            <h6 style={{ fontSize: 'smaller' }}>Division: {mosque.division}</h6>
            <p>{mosque.description}</p>
            
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
         
            <Announcement/>
          
          
          {/* <div className="form-control">
            <textarea className="textarea textarea-bordered w-max h-15" placeholder="New announcement"></textarea>
            <Link to={`/announcement/${mosque._id}`}>
            <button className="btn-sm text-white bg-blue-500 rounded-2xl">
              Add new annoucment
            </button>
          </Link>
          </div> */}
        
          
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
