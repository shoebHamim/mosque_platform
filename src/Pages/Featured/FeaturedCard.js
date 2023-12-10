import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedCard = ({ data }) => {
  const { _id, name, description, photoURLs } = data;

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  };

  const imageStyle = {
    flex: 1,
    overflow: 'hidden',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const bodyStyle = {
    padding: '1rem',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const lineClamp1Style = {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const lineClamp4Style = {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const actionsStyle = {
    marginTop: 'auto',
  };

  return (
    <div style={cardStyle} className="card card-compact bg-base-100 shadow-xl">
      <figure style={imageStyle} className="card-image">
        <img style={imgStyle} src={photoURLs[0]} alt="Mosque" />
      </figure>
      <div style={bodyStyle} className="card-body">
        <h2 style={titleStyle} className="card-title line-clamp-1">
          {name}
        </h2>
        <p style={lineClamp4Style} className="line-clamp-4">
          {description}
        </p>
        <div style={actionsStyle} className="card-actions justify-end">
          <Link to={`/featured/${_id}`}>
            <button className="btn btn-sm btn-primary text-white">See More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;