import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Featured from "../Pages/Featured/Featured";
import PasswordReset from "../Pages/Login/PasswordReset";
import SingleFeatured from "../Pages/Featured/SingleFeatured";
import Test from '../Test';
import SingleRegistered from "../Pages/Registered/SingleRegistered";
import Registered from "../Pages/Registered/Registered";
import Announcement from "../Pages/announcement/announcement";
import UserPage from "../Pages/userpage/userpage";

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
      {path:'/featured',element:<Featured></Featured>},
      {path:'/featured/:id',element:<SingleFeatured></SingleFeatured>},
      {path:'/registered',element:<Registered></Registered>},
      {path:'/registered/:id',element:<SingleRegistered></SingleRegistered>},
      {path:'/userpage/:id',element:<UserPage></UserPage>},
      {path:'/annoucement',element:<Announcement></Announcement>},
      {path:'passwordReset',element:<PasswordReset></PasswordReset>},
      {path:'/test',element:<Test></Test>}

    ]
  }
])