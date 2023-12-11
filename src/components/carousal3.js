import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../components/css.css'

function Carousel3() {
  const [mosque, setMosque] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % (mosque?.photoURLs?.length || 1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, [currentIndex, mosque]);

  return (
    
    
    <div className="flex flex-col items-center">
      {mosque ? (
        <div className="carousel-container">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            selectedItem={currentIndex}
            onChange={(index) => setCurrentIndex(index)}
            className="carousel-container2"
            showThumbs={false}
            style={{ width: "auto", height: "auto" }}
          >
            {mosque.photoURLs.map((photo, index) => (
              <div id={`${id}item${index}`} key={index}>
                <img src={photo} style={{ width: '500px', height: '300px' }} alt={`Item${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    );
}

export default Carousel3;