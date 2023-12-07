import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';


function Carousel2() {
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
<div>
{mosque ? (
  <>
<div className="carousel w-full">
{mosque.photoURLs.map((photo, index) => (
  <div id={`${id}#slide${index}`} className="carousel-item relative w-full" key={index}>
    <img src={photo} className="w-full" alt={`Item${index}`}/>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href={`${id}#slide${index}`} className="btn btn-circle">❮</a> 
      <a href={`${id}#slide${index}`} className="btn btn-circle">❯</a>
    </div>
  </div> 
))}
</div>
</>
) : (
<p>Loading...</p>
)}
</div>
);
}
export default Carousel2;

