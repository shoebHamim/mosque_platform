import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';


export default function Featured() {
  const [mosques, setMosques] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); 

  useEffect(() => {
    const fetchMosques = async () => {
      const response = await fetch('/api/mosques');
      const json = await response.json();

      if (response.ok) {
        setMosques(json);
      }
    };

    fetchMosques();
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDropdownVisible(false); 
  };

  const filteredMosques = mosques
    ? selectedFilter
      ? mosques.filter((mosque) => mosque.division === selectedFilter)
      : mosques
    : null;

  return (
    <div>
      {/* <Navbar /> */}
      <div className="popup-container">
      <label
        tabIndex={0}
        className="btn m-1 text-black bg-white hover:bg-gray-400 rounded-full px-4 py-2 transition-all duration-300"
        onClick={toggleDropdown}
      >
        {selectedFilter ? `Filter: ${selectedFilter}` : 'All Divisions'}
      </label>
     

        {isDropdownVisible && (
          <ul tabIndex={0} className="popup-content dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 top-0 right-0">
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Dhaka')}
              >
                Dhaka
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Chittagong')}
              >
                Chittagong
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Rangpur')}
              >
                Rangpur
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Rajshahi')}
              >
                Rajshahi
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Barisal')}
              >
                Barisal
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Khulna')}
              >
                Khulna
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Sylhet')}
              >
                Sylhet
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Mymensingh')}
              >
                Mymensingh
              </a>
            </li>
            <li>
              <a
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('All Divisions')}
              >
                All Divisions
              </a>
            </li>
            
          </ul>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Division</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredMosques &&
              filteredMosques.map((mosque) => {
                return (
                  <tr key={mosque._id}>
                    <td>
                      <img
                        src={mosque.photoURLs[0]}
                        alt="Avatar Tailwind CSS Component"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </td>
                    <td>{mosque.name}</td>
                    <td>{mosque.division}</td>
                    <td>{mosque.location}</td>
                    <td>
                      <Link to={`/display_all/${mosque._id}`}>
                        <button className="sexy-button">
                          Show Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}






