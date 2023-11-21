import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';


export default function Featured() {
  const [mosques, setMosques] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(''); 

  useEffect(() => {
    const fetchMosques = async () => {
      const response = await fetch('http://localhost:5000/featured');
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

  const filteredMosques = mosques? selectedFilter? mosques.filter((mosque) => mosque.division === selectedFilter)
      : mosques
    : null;

  return (
    <div>
      <div className="popup-container relative">
      <label
        tabIndex={0}
        className=" btn m-1 normal-case text-black bg-white hover:bg-gray-400 rounded-full px-4 py-2 transition-all duration-300"
        onClick={toggleDropdown}
      >
        {selectedFilter ? `Filter: ${selectedFilter}` : 'All Divisions'}
      </label>
     

        {isDropdownVisible && (
          <ul tabIndex={0} className="left-0 absolute popup-content dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Dhaka')}
              >
                Dhaka
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Chittagong')}
              >
                Chittagong
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Rangpur')}
              >
                Rangpur
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Rajshahi')}
              >
                Rajshahi
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Barisal')}
              >
                Barisal
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Khulna')}
              >
                Khulna
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Sylhet')}
              >
                Sylhet
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('Mymensingh')}
              >
                Mymensingh
              </p>
            </li>
            <li>
              <p
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={() => handleFilterChange('')}
              >
                All Divisions
              </p>
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
                      <Link to={`/featured/${mosque._id}`}>
                        <button className="btn-sm text-white bg-blue-500 rounded-2xl  ">
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






