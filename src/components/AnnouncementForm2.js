import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Pages/Admin/components/AnnouncementForm.module.css';

const AnnouncementForm2 = () => {
  const [text, setAnnouncement] = useState('');

  const handleAnnouncement = async () => {
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().split('T')[0];
    const time = currentDateTime.toTimeString().split(' ')[0];

    const announcementData = {
      text: text,
      date: date,
      time: time,
    };

    try {
      const response = await fetch(`http://localhost:5000/announcement/${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(announcementData),
      });

      if (response.ok) {
        toast.success('Announcement successfully added to the database.');
      } else {
        toast.error(`Failed to add announcement. Status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === '') return;
    handleAnnouncement();
  };

  return (
    <div>
      
      <div>
      <ToastContainer />
        <form onSubmit={handleSubmit} className="form-control">
          <textarea
            className="textarea textarea-bordered w-max h-15"
            placeholder="New announcement"
            value={text}
            onChange={(e) => setAnnouncement(e.target.value)}
          />
          <button type="submit" className="btn-sm text-white bg-blue-500 rounded-2xl">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm2;