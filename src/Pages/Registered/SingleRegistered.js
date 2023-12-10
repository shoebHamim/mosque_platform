import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Announcement from '../announcement/announcement';
import '../Registered/cssform.css';
import AnnouncementForm2 from '../../components/AnnouncementForm2';
function SingleRegistered() {
  const [mosque, setMosque] = useState(null);
  const [announcement, setAnnouncement] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/announcement/${mosque._id}`, {
        date: new Date().toISOString(),
        announcement,
      });

      console.log('Announcement posted:', response.data);
      setAnnouncement('');
    } catch (error) {
      console.error('Error posting announcement:', error);
    }
  };

  if (!mosque) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black">
      <div style={{ display: 'flex' }}>
        {/* Left Column */}
        <div
          style={{
            flex: 0.7,
            padding: '7rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0rem',
          }}
        >
          <img src={mosque.img} alt="Mosque" style={{ width: '100%', marginBottom: '1rem' }} />
          {/* Details info */}
          <div
            style={{
              flex: 0,
              padding: '0rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '0rem',
            }}
          >
            <h1 style={{ fontWeight: 'bold' }}>{mosque.name}</h1>
            <h7 style={{ fontSize: 'smaller' }}>{mosque.location}</h7>
            <h6 style={{ fontSize: 'smaller' }}>Division: {mosque.division}</h6>
            <p>{mosque.description}</p>
          </div>
        </div>

        {/* Right Column */}
        <div
          style={{
            flex: 0,
            padding: '0rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnnouncementForm2></AnnouncementForm2>
          
          
          <Announcement />
        </div>
      </div>

      {/* Go to Edit Page Button */}
      
      <div className="text-center">
        <Link to={`/Edit/${mosque._id}`}>
          <button className="btn-sm text-white bg-blue-500 rounded-2xl">Go to Edit Page</button>
        </Link>
      </div>
    </div>
  );
}

export default SingleRegistered;