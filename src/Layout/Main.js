import React from 'react';
import Navbar from '../Pages/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Footer/Footer';

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className='min-h-screen'>
      <Outlet ></Outlet>

      </div>
      <Footer></Footer>
      
    </div>
  );
};

export default Main;