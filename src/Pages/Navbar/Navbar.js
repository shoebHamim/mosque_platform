import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../resources/icons/mosque.png'

const Navbar = () => {
  return (
    <div>
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
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          <Link className="btn  ml-2 bg-[#dbd3d8]">Go</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;