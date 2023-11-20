import React, { useState } from 'react';
import './index.css';

const Update = (id) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [imam, setImam] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([null, null, null]);

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
    formData.append('number', number);
    formData.append('imam', imam);
    formData.append('description', description);

    pictures.forEach((picture, index) => {
      if (picture) {
        formData.append(`picture${index + 1}`, picture);
      }
    });

    try {
      const response = await fetch(`/api/updateMosqueData/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Data updated successfully');
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='update'>
      <h2>Update Mosque Data</h2>
      <div className="picture-container">
        {pictures.map((picture, index) => (
          <div key={index}>
            {picture && <img src={URL.createObjectURL(picture)} alt={`Picture ${index + 1}`} width="200" />}
          </div>
        ))}
      </div>
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
        <label>Change Picture 1</label>
        <input type="file" accept="image/*" onChange={(e) => handlePictureChange(e, 0)} />
        <label>Change Picture 2</label>
        <input type="file" accept="image/*" onChange={(e) => handlePictureChange(e, 1)} />
        <label>Change Picture 3</label>
        <input type="file" accept="image/*" onChange={(e) => handlePictureChange(e, 2)} />

        <div className='update_button'>
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default Update;
