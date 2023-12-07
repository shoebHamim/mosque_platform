import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';


function Announcement() {
  const [announcements, setAnnouncements] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); 

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch('http://localhost:5000/announcement');
      const json = await response.json();

      if (response.ok) {
        setAnnouncements(json);
      }
    };

    fetchAnnouncements();
  }, []);

  // const toggleDropdown = () => {
  //   setDropdownVisible(!isDropdownVisible);
  // };

  // const handleFilterChange = (filter) => {
  //   setSelectedFilter(filter);
  //   setDropdownVisible(false); 
  // };

  // const filteredAnnouncements = announcements? selectedFilter? announcements.filter((announcement) => announcement.division === selectedFilter)
  //     : announcements
  //   : null;

  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Announcement</div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {announcements && announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <tr key={announcement._id}>
                    <td>{announcement.text}</td>
                    <td>{announcement.date}</td>
                    <td>{announcement.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No announcement available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default Announcement;
