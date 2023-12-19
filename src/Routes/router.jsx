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
