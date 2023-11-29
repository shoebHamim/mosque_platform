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
  const [pictures, setPictures] = useState([null, null, null]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/mosques/${email}`, {
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
        } else {
          toast.error('Error fetching data', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error fetching data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    // Call the fetchData function
    fetchData();
  }, [email]); // useEffect will run if the 'mail' prop changes

  const handlePictureChange = (e, index) => {
    const newPictures = [...pictures];
    newPictures[index] = e.target.files[0];
    setPictures(newPictures);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('contactNo', number);
    formData.append('imamName', imam);
    formData.append('description', description);
    if (pictures[0]) {
      formData.append('pictures1', pictures[0]);
    }
    if (pictures[1]) {
      formData.append('pictures2', pictures[1]);
    }
    if (pictures[2]) {
      formData.append('pictures3', pictures[2]);
    }
  
  
    //pictures.forEach((file, index) => {
    //  if (file) {
    //    formData.append(`pictures${index+1}`, file);
    //  }
    //});
  
    try {
      console.log('formData:', formData);
      const response = await fetch(`http://localhost:5000/update/${email}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.ok) {
        toast.success('Data updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Error updating data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error updating data', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  
  
  

  return (
    <div className='update'>
      <ToastContainer />
      <h2>Update Mosque Data</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <label>Change Picture 1</label>
        <input type="file" name="pictures1" accept="image/*" onChange={(e) => handlePictureChange(e, 0)} />
        <label>Change Picture 2</label>
        <input type="file" name="pictures2" accept="image/*" onChange={(e) => handlePictureChange(e, 1)} />
        <label>Change Picture 3</label>
        <input type="file" name="pictures3" accept="image/*" onChange={(e) => handlePictureChange(e, 2)} />

        <div className='update_button'>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Update;