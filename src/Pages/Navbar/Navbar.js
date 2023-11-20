import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../resources/icons/mosque.png'

const Realm = require("realm-web");
const app = new Realm.App({ id: process.env.REACT_APP_mongodb_app_id });


const Navbar = () => {
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
  const handleSearchChange = async (e) => {
    const query = e.target.value
    if (query) {
      const autoCompleteData = await getAutoComplete(query)
      setAutoComplete(autoCompleteData)
    }
    else {
      setAutoComplete([])
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
            <Link to={'/'}>
              Mosque Platform
              </Link>
              <li>
                <Link >Parent</Link>
                <ul className="p-2">
                  <li><Link>Submenu 1</Link></li>
                  <li><Link>Submenu 2</Link></li>
                </ul>
              </li>
              <li><Link href='/login'>Login</Link></li>
            </ul>
          </div>
          <Link className="btn btn-ghost normal-case text-xl"><img className='h-3/4' src={icon} alt="" />
          Mosque Platform </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to={'/signup'}>Signup</Link></li>
            <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li><Link>Submenu 1</Link></li>
                  <li><Link>Submenu 2</Link></li>
                </ul>
              </details>
            </li>
            <li><Link to={'/login'}>Login</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
        <div>
            <input onChange={handleSearchChange}
              type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
            <ul className={` absolute z-10 bg-base-200 ml-2 rounded-xl ${autoComplete.length && `p-5`} `}>
              {autoComplete.map(item =>
                <li key={item._id} className='px-4 py-2 hover:bg-gray-300 cursor-pointer rounded-lg'
                >{item.name}</li>
              )}
            </ul>
          </div>

          <Link className="btn  ml-2 bg-[#dbd3d8]">Go</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;