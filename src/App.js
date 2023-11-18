import React, { useState } from 'react';
import axios from 'axios';
import './index.css'; 
function App() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
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
      formDataUpload.append('image', formData.image);

      const response = await axios.post('http://localhost:3000/submit-form', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setSubmissionMessage('Submission successful!');
        setFormData({
          name: '',
          description: '',
          image: null,
        });
      }
    } catch (error) {
      console.error(error);
      setSubmissionMessage('Submission failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Mosque Form</h1>
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
        <br />
        <label>
          Image:
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {submissionMessage && <p>{submissionMessage}</p>}
    </div>
  );
}

export default App;
