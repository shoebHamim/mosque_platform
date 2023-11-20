import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; 
function App() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: Array(3).fill(null), // Array to store 3 image files
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e, index) => {
    if (e.target.name === 'images') {
      const newImages = [...formData.images];
      newImages[index] = e.target.files[0];
      setFormData({ ...formData, images: newImages });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('name', formData.name);
      formDataUpload.append('description', formData.description);

      formData.images.forEach((image, index) => {
        formDataUpload.append(`images`, image);
      });

      const response = await axios.post('http://localhost:5000/submit-form', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setSubmissionMessage('Submission successful!');
        setFormData({
          name: '',
          description: '',
          images: Array(3).fill(null),
        });
      }
    } catch (error) {
      console.error(error);
      setSubmissionMessage('Submission failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Please Fill up the Additional Description of your Mosque</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br/> 
        <label>
          Image 1:
          <input type="file" name="images" onChange={(e) => handleChange(e, 0)} />
        </label>
        <br />
        <label>
          Image 2:
          <input type="file" name="images" onChange={(e) => handleChange(e, 1)} />
        </label>
        <br />
        <label>
          Image 3:
          <input type="file" name="images" onChange={(e) => handleChange(e, 2)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
}

export default App;