import React, { useState } from 'react';
import SignupMosque from './SignupMosque';
import SignupUser from './SignupUser';


const Signup = () => {
  const [showComponent, setShowComponent] = useState('mosque')
  return (
    <div className='min-h-[800px]  flex justify-center items-center'>
 
      <div className='w-96 mt-4'>
        <h2 className='text-center text-2xl font-bold '>Sign Up</h2>
        <div className='flex justify-center mt-4'>
          <button className={`normal-case btn ${showComponent === 'mosque' ? 'bg-blue-500 hover:bg-blue-500 disabled text-white hover:none' : ''}`}
            onClick={() => setShowComponent('mosque')}>As Mosque</button>
          <button className={` normal-case btn ml-4 ${showComponent === 'user' ? 'bg-blue-500  hover:bg-blue-500 text-white' : ''}`}
            onClick={() => setShowComponent('user')}>As User</button>
        </div>

        {/* conditional rendering */}
        {showComponent === 'mosque' ? <SignupMosque /> : <SignupUser></SignupUser>}

      </div>
    </div>
  );
};

export default Signup;