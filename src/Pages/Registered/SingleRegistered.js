import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import News from '../News/News';
import { AuthContext } from '../../Context/AuthProvider';


function SingleRegistered() {
  const [mosque, setMosque] = useState(null);
  const  mosque_email  = useParams().email;
  const {user,role}=useContext(AuthContext)
  const [hasEditAccess,setHasEditAccess]=useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMosqueDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/registered/${mosque_email}`)
        setMosque(response.data);
        if(response.data?.email===user?.email || role=='admin'){
          setHasEditAccess(true)
        }

      } catch (error) {
        console.error('Error fetching mosque details:', error);
        setMosque(null);
      }
    };

    fetchMosqueDetails();
  }, [mosque_email]);




  if (!mosque) {
    return <div>Loading...</div>;
  }


  return (
    <div className='mb-12'>
      <div className='flex'>
        <img src={mosque.img} className='w-1/2' alt="" />
        <div className='flex flex-col items-center justify-center w-1/2'>
        <h1 className='text-xl font-bold'>{mosque.name}</h1>
        <h6 className='text-l'>{mosque.location}</h6>
        <h6>Division: {mosque.division}</h6>
        <p>{mosque.description}</p>
        {hasEditAccess&&
        <button className='btn btn-primary btn-sm mt-4' 
        onClick={()=>navigate(`/registered/update/${mosque_email}`)}>Update</button>
        }
        </div>
      </div>
      <News  mosque_email={mosque_email} hasEditAccess={hasEditAccess} ></News>


      
    </div>
  );
}

export default SingleRegistered;