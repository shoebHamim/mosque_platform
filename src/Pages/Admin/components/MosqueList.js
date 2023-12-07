// MosqueList.js
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './MosqueList.module.css'; // Import the CSS module styles

const MosqueList = ({ name }) => {
  const [id, setId] = useState('');
  const [nam, setNam] = useState('');
  const [division, setDivision] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (name !== null) {
      setId(name._id);
      setNam(name.name);
      setDivision(name.division);
      setEmail(name.email);
    }
  }, [name]);

  const handleMosqueDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/mosques/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success("Mosque successfully deleted from the database.");
      } else {
        toast.error(`Failed to delete mosque. Status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } 
  };

  return (
    <div key={id} className={styles.mosqueContainer}>
      <ToastContainer />
      <p className={styles.mosqueName}>Mosque: {nam}</p>
      <p className={styles.mosqueDetails}>Division: {division}</p>
      <p className={styles.mosqueDetails}>Email: {email}</p>
      <button className={styles.deleteButton} onClick={() => handleMosqueDelete(id)}>
        Delete Mosque
      </button>
    </div> 
  );
};

export default MosqueList;
