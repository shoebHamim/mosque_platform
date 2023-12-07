import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Announcement from  '../announcement/announcement';

function UserPage() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setUser(null);
      }
    };

    fetchUserDetails();
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
      <div style = {{ flex: 0, padding: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '5rem' }}>
      <p style={{ fontWeight: 'bold' }}>User Details<br></br></p>
            {/* <h1 style={{ fontWeight: 'bold' }}>Name: </h1> */}
            <h7 style={{ fontWeight: 'bold' }}>{user.name}<br></br></h7>
            {/* <h1 style={{ fontWeight: 'bold' }}>Contact No: </h1> */}
            <h7 style={{ fontWeight: 'bold' }}>{user.contactNo}<br></br></h7>
            {/* <h1 style={{ fontWeight: 'bold' }}>Division: </h1> */}
            <h7 style={{ fontWeight: 'bold' }}>{user.email}<br></br></h7>
            
            
          </div>
        </div>

        {/* Right Column */}
        <div style={{ flex: 0, padding: '0rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',marginLeft: '20rem'  }}>
        
         
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
