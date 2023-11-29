import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';



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
      <div className="container mx-auto flex">
        {mosque ? (
          <div>
            <Carousel>
              {mosque.photoURLs.map((photo, index) => (
                <Carousel.Item key={index}>
                  <div>
                    <img
                      src={photo}
                      className="block w-full"
                      alt={`carousel-item-${index}`}
                      style={{ width: '1000px', height: '700px' }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ) : (
          <div>
            <p>No data available for the specified mosque.</p>
          </div>
        )}
      </div>
        
      <div style={{ display: 'flex' }}>       
        {mosque ? (
        <div style={{ flex: 1.5, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' , marginLeft: '5rem'}}>
      <h1 style={{ fontWeight: 'bold' }}>{mosque.name}</h1>
      <h7 style={{ fontSize: 'smaller' }}>{mosque.location}</h7>
      <h6 style={{ fontSize: 'smaller' }}>Division: {mosque.division}</h6>
        
          
          <p>{mosque.description}</p>
          <Link to={mosque.infoURL}>
            <p className="link link-primary">See more details</p>
          </Link>
          
        </div>
        ) : null}
        {mosque ? (
        <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <iframe
            title="Mosque Location"
            className="w-full h-700" 
            style={{ border: 1, width: "400px", height: "400px" }} 
            src={mosque.locationURL}
            allowFullScreen
          ></iframe>

        </div>
        ) : null}
      </div>

      
      
      {mosque ? (
      <div className="text-center">
      <Link to={`/Edit/${mosque._id}`}>
        <button className="sexy-button">
          Go to Edit Page
        </button>
      </Link>
      </div>
      ): null}
  

    </div>
  );
}

export default SingleFeatured;
