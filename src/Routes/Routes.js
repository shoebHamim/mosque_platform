// Routes.js
import React from 'react';
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Featured from "../Pages/Featured/Featured";
import PasswordReset from "../Pages/Login/PasswordReset";
import SingleFeatured from "../Pages/Featured/SingleFeatured";
import Test from '../test';
import Signup from "../Pages/Signup/Signup";
import News from "../Pages/News/News";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      { path: '/', element: <Home></Home> },
      { path: '/signup', element: <Signup></Signup> },
      { path: '/login', element: <Login></Login> },
      { path: '/featured', element: <Featured></Featured> },
      { path: '/featured/:id', element: <SingleFeatured></SingleFeatured> },
      { path: 'passwordReset', element: <PasswordReset></PasswordReset> },
      { path: '/test', element: <Test></Test> },
      { path: '/news', element: <News></News> },
 
    ],
  },
]);
