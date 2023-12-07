import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './announcement.css'


const Announcements = ({ announcements }) => {
  const handleClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/announcement/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        toast.success("Announcement successfully deleted from the database.");
      } else {
        toast.error(`Failed to delete announcement. Status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };
  


  return (
    <div>
      <ToastContainer />
      {announcements.map((announcement) => (
        <div key={announcement._id}>
          <p>Date of Announcement: {announcement.date}</p>
          <p>Announcement: {announcement.text}</p>
          <button onClick={() => handleClick(announcement._id)}>Delete Announcement</button>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
