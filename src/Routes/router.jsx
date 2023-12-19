import { createBrowserRouter } from "react-router-dom";
import Layout from "../assets/Dashboard/Dashboard/Layout";
import Stats from "../assets/Dashboard/Pages/Stats";
import Login from "../assets/Pages/Login/Login";
import Signup from "../assets/Pages/Signup/Signup";
import ForgetPassword from "../assets/Pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import NewTicket from "../assets/Dashboard/Pages/NewTicket/NewTicket";
import MyTickets from "../assets/Dashboard/Pages/MyTickets/MyTickets";
import UserProfile from "../assets/Dashboard/Pages/UserProfile/UserProfile";
import EditProfile from "../assets/Dashboard/Pages/EditProfile/EditProfile";
import UserDatabase from "../assets/Pages/Database/UserDatabase";
import OperatorDatabase from "../assets/Pages/Database/OperatorDatabase";
import TechnicalDatabase from "../assets/Pages/Database/TechnicalDatabase";
import Settings from "../assets/Pages/Settings/Settings";
import UserLogHistory from "../assets/Pages/UserLogHistory/UserLogHistory";



export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout/>
      </PrivateRoute>
    ),
    children: [
      // user only
      {
        path: "dashboard",
        element:<Stats/>
      },
      {
        path: "newTicket",
        element:<NewTicket/>
      },
      {
        path: "myTickets",
        element: <MyTickets/>
      },
      {
        path: "userProfile",
        element: <UserProfile/>
      },
      {
        path: "/settings",
        element: <Settings/>
      },
      {
        path: "/userLogHistory",
        element: <UserLogHistory/>
      },
      {
        path: "/userProfile/editProfile",
        element: <EditProfile/>
      },
      {
        path: "/database/user",
        element: <UserDatabase/>
      },
      {
        path: "/database/operator",
        element: <OperatorDatabase/>
      },
      {
        path: "/database/technical",
        element: <TechnicalDatabase/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Signup/>
  },
  {
    path: "/forgetPassword",
    element: <ForgetPassword/>
  },
]);
