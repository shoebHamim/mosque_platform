import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import FeaturedCard from './FeaturedCard';
import { AuthContext } from '../../Context/AuthProvider';


export default function Featured() {
  const { role } = useContext(AuthContext)
  const [mosques, setMosques] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    const fetchMosques = async () => {
      const response = await axios.get('http://localhost:5000/featured');
      setMosques(response.data);

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

  const filteredMosques = mosques ? selectedFilter ? mosques.filter((mosque) => mosque.division === selectedFilter)
    : mosques
    : null;

  return (
    <>
      {mosques ?
        <div className='m-4'>
          <div className="popup-container relative ">
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
          <div className='grid gap-6 grid-cols-3 mx-28 '>
            {filteredMosques &&
              filteredMosques.map((mosque) =>
              <div className='flex' key={mosque._id}>
                <FeaturedCard data={mosque} ></FeaturedCard>
              </div>
              )}


          </div>
        </div>
        : <div>
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>

        </div>}

    </>
  );
}






