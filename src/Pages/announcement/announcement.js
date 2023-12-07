import React, { useEffect, useState } from 'react';


function Announcement() {
  const [announcements, setAnnouncements] = useState('');


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



  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Announcement</div>
      <div className="collapse-content">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="w-1/3">Name</th>
                <th className="w-1/3">Time</th>
                <th className="w-1/3">Location</th>
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
