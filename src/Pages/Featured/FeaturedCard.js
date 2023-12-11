import React from 'react';
import { Link } from 'react-router-dom';
const FeaturedCard = ({ data }) => {
  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img className='h-60 w-full' src={data.photoURLs[0]} alt="Shoes" /></figure>
        
        <div className="card-body">
          <h2 className="card-title line-clamp-1">{data.name}</h2>

          <p className='line-clamp-4'>{data.description}</p>

          <div className="card-actions justify-end">
            <Link to={`/featured/${data._id}`}>
              <button className="btn btn-sm btn-primary text-white">See More</button>
            </Link>

          </div>
        </div>
      </div>





    </div>
  );
};

export default FeaturedCard;