import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Carousel1 from '../../components/carousal';


function SingleFeatured() {
  const [mosque, setMosque] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/featured/${id}`);
        setMosque(response.data);
      } catch (error) {
        console.error('Error fetching mosque details:', error);
        setMosque(null);
      }
    };

    fetchMosqueDetails();
  }, [id]);

  return (
    <div className="bg-white text-black">
      <div>
        <Carousel1/>
      </div>

      <div style={{ display: 'flex' }}>
        {mosque ? (
          <div style={{ flex: 1.5, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '5rem' }}>
            <h1 style={{ fontWeight: 'bold' }}>{mosque.name}</h1>
            <h7 style={{ fontSize: 'smaller' }}>{mosque.location}</h7>
            <h6 style={{ fontSize: 'smaller' }}>Division: {mosque.division}</h6>
            <p>{mosque.description}</p>
            <Link to={mosque.infoURL}>

              <p className=" btn btn-sm mt-6 link link-primary">See more details</p>
            </Link>
          </div>
        ) : null}
        {mosque ? (
          <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <iframe
              title="Mosque Location"
              className="w-full h-700"
              style={{ border: '1px solid #000', width: '400px', height: '400px' }}
              src={mosque.locationURL}
              allowFullScreen
            ></iframe>
          </div>
        ) : null}
      </div>

      {/* {mosque ? (
        <div className="text-center">
          <Link to={`/Edit/${mosque._id}`}>
            <button className="btn-sm text-white bg-blue-500 rounded-2xl">
              Go to Edit Page
            </button>
          </Link>
        </div>
      ) : null} */}
    </div>
  );
}

export default SingleFeatured;
