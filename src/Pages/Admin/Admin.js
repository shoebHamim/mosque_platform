import React, { useState, useEffect } from 'react';
import MosqueList from './components/MosqueList';
import Announcements from './components/Announcements';
import AnnouncementForm from './components/AnnouncementForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Admin.module.css';
import Registered from '../Registered/Registered';

function Admin() {
    const [announcements, setAnnouncements] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [mosque, setMosque] = useState('');
    const [announcementSearch, setAnnouncementSearch] = useState('');
  
    useEffect(() => {
      // Fetch mosques and announcements from your backend API
      // Update the state using setMosques and setAnnouncements
      // Example API call:
      // fetch('/api/mosques').then(response => response.json()).then(data => setMosques(data));
      // fetch('/api/announcements').then(response => response.json()).then(data => setAnnouncements(data));
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/announcement`, {
            method: 'GET',
          });
          if (response.ok) {
            const data = await response.json();
            setAnnouncements(data)
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

      
      fetchData();
    }, []); // Empty dependency array means this effect runs once on mount
  
    const handleAnnouncementSearch = async (e) => {
      //e.preventDefault();
      try {
        const response = await fetch(`http://localhost:5000/announcement/${announcementSearch}`, {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data)
        } else {
          toast.error('Error fetching announcement', {
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


  
  
    return (
      <div className='mx-10' >
      <ToastContainer />
      <h1 className={styles.pageTitle}>Admin Page</h1>
      <div >
        <div>
         
          {/* <MosqueList name={mosque} /> */}
          <Registered role={'admin'}></Registered>
        </div>
        <div >
          <h2 className={styles.sectionTitle}>Announcement Form</h2>
          <AnnouncementForm setAnnouncements={setAnnouncements} />
          <h2 className={styles.sectionTitle}>Search Announcements</h2>
          <input
            type="text"
            placeholder="Search by Date: yyyy-mm-dd"
            value={announcementSearch}
            onChange={(e) => setAnnouncementSearch(e.target.value)}
            className={styles.inputField}
          />
          <button onClick={handleAnnouncementSearch} className={styles.submitButton}>
            Search
          </button>
          <h2 className={styles.sectionTitle}>Announcements</h2>
          <Announcements announcements={announcements} setAnnouncements={setAnnouncements} />
        </div>
      </div>
    </div>
    );
}

export default Admin;
