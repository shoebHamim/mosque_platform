import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AnnouncementForm = () => {
  const [text, setText] = useState('')


  const handleAnnouncement = async () => {
    const currentDateTime = new Date();
    const date = currentDateTime.toISOString().split('T')[0];
    const time = currentDateTime.toTimeString().split(' ')[0];

    const announcementData = {
      text: text,
      date: date,
      time: time
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
        toast.success("Announcement successfully added to the database.");
      } else {
        toast.error(`Failed to add announcement. Status code: ${response.status}`);
      }
      } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      }
  };

  const handleClick = (e) => {
    if (text === '') return
    handleAnnouncement()
  }
  return (
    <div>
      <ToastContainer />
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter announcement text"></textarea>
      <button onClick={handleClick}>Submit Announcement</button>
    </div>
  );
};

export default AnnouncementForm;
