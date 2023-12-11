import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import icon from '../../resources/icons/mosque.png'
import { AuthContext } from '../../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Realm = require("realm-web");
const app = new Realm.App({ id: process.env.REACT_APP_mongodb_app_id });

const Navbar = () => {
  const navigate = useNavigate();
  const location=useLocation()
  const { user, logOut, loading,role } = useContext(AuthContext)



  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false)

  // for search autocomplete using mongodb custom function
  const getAutoComplete = async (query) => {
    try {
      const user = await app.logIn(Realm.Credentials.anonymous())
      const searchAutoComplete = await user.functions.searchAutoComplete(query)
      return searchAutoComplete
    }
    catch (error) {
      console.log(error);
    }
  }

  const [autoComplete, setAutoComplete] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value)
    if(location.pathname.match(/\/search\//)){
      setAutoComplete([])

      return
    }
    setLoadingAutoComplete(true)
    const query = e.target.value
    if (query) {
      const autoCompleteData = await getAutoComplete(query)
      setAutoComplete(autoCompleteData)
      setLoadingAutoComplete(false)
    }
    else {
      setAutoComplete([])
      setLoadingAutoComplete(false)
    }
  }

  const handleSearchSubmit = e => {
    e.preventDefault()
    if (searchTerm) {
      setAutoComplete([])
      navigate(`/search/${searchTerm}`)
    }
  }
  const handleSelect=async(id)=>{
    try {
      const response = await axios.get(`http://localhost:5000/mosques/idtomail/${id}`);
      setAutoComplete([])
      navigate(`/registered/${response.data.email}`)
    } catch (error) {
      console.error(error);
    console.log(id);
    }

  }
  return (
    <div className=''>
      <div className="navbar bg-base-200">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to={'/signup'}>Signup</Link></li>
              <li><Link to={'/featured'}>Featured</Link></li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/registered'>Registered</Link></li>
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl"><img className='h-3/4' src={icon} alt="" />
            Mosque Platform </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to={'/featured'}>Featured</Link></li>
            {
              (!loading && user?.uid) &&


              <li><Link to='/registered'>Registered</Link></li>
            }

            {user?.uid ? <>
            {
              role==='admin'&&
              <li><Link to={'/admin/abcd'}>Admin</Link></li>

            }


              <li onClick={logOut}><Link>{user.email.split('@').shift()} 📤</Link></li>

            </> :
              <>
                <li><Link to={'/signup'}>Signup</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
              </>
            }

          </ul>
        </div>
        <div className="navbar-end">
          <div >
            <div >
              <form onSubmit={(e) => handleSearchSubmit(e)} >
                <input onChange={handleSearchChange}
                  type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                  
                <button type='submit' className='btn ml-2 bg-[#dbd3d8]'>
                Go
                </button>
              </form>

              {loadingAutoComplete &&
                <span className="loading loading-dots loading-sm absolute right-20 top-6"></span>
              }
            </div>
            <ul className={` absolute z-10 bg-base-200 ml-2 rounded-xl ${autoComplete.length && `p-5`} `}>

              {autoComplete.map(item =>
              
              <li onClick={()=>handleSelect(item._id)} key={item._id} className='px-4 py-2 hover:bg-gray-300 cursor-pointer rounded-lg'
              >
                  
                  {item.name}
                 
                  </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;