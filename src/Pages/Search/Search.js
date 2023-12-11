

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Realm = require("realm-web");
const app = new Realm.App({ id: process.env.REACT_APP_mongodb_app_id });


export default function Search() {
  const {searchTerm}=useParams()
  const [searchedMosque,setSearchedMosque]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const getSearch = async (query) => {
      try {
        setLoading(true)
        const user = await app.logIn(Realm.Credentials.anonymous())
        const searchResult = await user.functions.searchMosques(searchTerm)
        setSearchedMosque(searchResult)
        setLoading(false)
      }
      catch (error) {
        console.log(error);
      }
    }
    getSearch()

      }, [searchTerm]);



  return (
    <>
     {searchedMosque && !loading ?
         <div>
         <div className="overflow-x-auto">
           <table className="table">
            {searchedMosque.length!=0?
            <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Division</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>:<></>
            }
          <tbody>
             
             
               {searchedMosque &&
                 searchedMosque.map((mosque) => {
                   return (
                     <tr key={mosque._id}>
                       <td>
                         <img
                           src={mosque.img}
                           alt="Avatar Tailwind CSS Component"
                           style={{ width: '50px', height: '50px' }}
                         />
                       </td>
                       <td>{mosque.name}</td>
                       <td>{mosque.division}</td>
                       <td>{mosque.address}</td>
                       <td>
                         <Link to={`/registered/${mosque.email}`}>
                           <button className="btn-sm  text-white bg-blue-500 rounded-2xl  ">
                             Show Details
                           </button>
                         </Link>
                       </td>
                     </tr>
                   );
                 })}
             </tbody>
           </table>
           {
                searchedMosque.length==0?
                <div className='text-xl font-bold flex justify-center h-screen items-center'>
                  <p>

                  No Mosque Found!
                  </p>
                </div>:<></>

              }
         </div>
       </div>

     :  <div>
     <div className="flex justify-center items-center h-screen">
       <span className="loading loading-spinner loading-lg"></span>
     </div>

   </div>}
    </>

  );
}






