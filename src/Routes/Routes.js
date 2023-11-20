import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import PasswordReset from "../Pages/Login/PasswordReset";

const { createBrowserRouter } = require("react-router-dom");
const { default: Signup } = require("../Pages/Signup/Signup");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      { path: '/', element: <Home></Home> },
      {path:'/signup',element:<Signup></Signup>},
      {path:'/login',element:<Login></Login>},
      {path:'passwordReset',element:<PasswordReset></PasswordReset>}

    ]
  }
])