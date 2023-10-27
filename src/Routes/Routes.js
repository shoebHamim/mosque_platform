import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";

const { createBrowserRouter } = require("react-router-dom");
const { default: Signup } = require("../Pages/Signup/Signup");

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      { path: '/', element: <Home></Home> },
      {path:'/signup',element:<Signup></Signup>}

    ]
  }
])