import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Carousel3 from '../../components/carousal3';
import Carousel2 from '../../components/carousal2';
import { UserState } from 'realm-web';
import Announcement from  '../announcement/announcement';
function UserPage() {
  const [user, setMosque] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setMosque(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setMosque(null);
      }
    };

    fetchMosqueDetails();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-black">
      <div style={{ display: 'flex' }}>
        {/* Left Column */}
<div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '0rem' }}>
         

          {/* Details info */}
      <div style = {{ flex: 1, padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '10rem' }}>
            <h1 style={{ fontWeight: 'bold' }}>Name: {user.name}</h1>
            <h7 style={{ fontSize: 'smaller' }}>Contact No: {user.contactNo}</h7>
            <h6 style={{ fontSize: 'smaller' }}>Division: {user.email}</h6>
            
            
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
         
            <Announcement/>
          
          
          {/* <div className="form-control">
            <textarea className="textarea textarea-bordered w-max h-15" placeholder="New announcement"></textarea>
            <Link to={`/announcement/${user._id}`}>
            <button className="btn-sm text-white bg-blue-500 rounded-2xl">
              Add new annoucment
            </button>
          </Link>
          </div> */}
        
          
        </div>
      </div>

      {/* Go to Edit Page Button */}
      <div className="text-center">
        <Link to={`/Edit/${user._id}`}>
          <button className="btn-sm text-white bg-blue-500 rounded-2xl">
            Go to Edit Page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default UserPage;
