// Announcements.js
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Announcements.module.css'; // Import the CSS module styles

const Announcements = ({ announcements,setAnnouncements }) => {
  const handleClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/announcement/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAnnouncements((prevNews) =>
        prevNews.filter((singleNews) => singleNews._id !== id)
      );

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
        <div key={announcement._id} className={styles.announcementContainer}>
          <p className={styles.announcementText}>Date of Announcement: {announcement.date}</p>
          <p className={styles.announcementText}>Announcement: {announcement.text}</p>
          <button className={styles.deleteButton} onClick={() => handleClick(announcement._id)}>
            Delete Announcement
          </button>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
