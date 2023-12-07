import React, { useEffect, useState } from 'react';
import './update.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = ({ email }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [imam, setImam] = useState('');
  const [description, setDescription] = useState('');
  const [pictureUrls, setPictureUrls] = useState(['', '', '']);

  const generateToast = (type, message) => {
    toast[type](message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mosques/email/${email}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          // Update state with the retrieved data
          setName(data.name);
          setAddress(data.address);
          setNumber(data.contactNo);
          setImam(data.imamName);
          setDescription(data.description);
          setPictureUrls(data.pictureUrls || ['', '', '']);
        } else {
          generateToast('error', 'Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
        generateToast('error', 'Error fetching data');
      }
    };

    // Call the fetchData function
    fetchData();
  }, [email]); // useEffect will run if the 'mail' prop changes

  const handlePictureUrlChange = (e, index) => {
    const newPictureUrls = [...pictureUrls];
    newPictureUrls[index] = e.target.value;
    setPictureUrls(newPictureUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      name,
      address,
      contactNo: number,
      imamName: imam,
      description,
      photo: pictureUrls,
    };

    try {
      console.log('requestData:', requestData);
      const response = await fetch(`http://localhost:5000/mosques/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        generateToast('success', 'Data updated successfully');
      } else {
        generateToast('error', 'Error updating data');
      }
    } catch (error) {
      console.error('Error:', error);
      generateToast('error', 'Error updating data');
    }
  };

  return (
    <div className='update'>
      <ToastContainer />
      <h2>Update Mosque Data</h2>
      <form onSubmit={handleSubmit}>
        <label>Mosque Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Mosque Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Contact Number</label>
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <label>Name of Imam</label>
        <input
          type="text"
          value={imam}
          onChange={(e) => setImam(e.target.value)}
        />
        <label>Description of Mosque</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
  
        {/* Change Picture URLs */}
        {[1, 2, 3].map((index) => (
          <div key={index}>
            <label>{`Picture URL ${index}`}</label>
            <input
              type="text"
              value={pictureUrls[index - 1]}
              onChange={(e) => handlePictureUrlChange(e, index - 1)}
            />
          </div>
        ))}
  
        <div className='update_button'>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
