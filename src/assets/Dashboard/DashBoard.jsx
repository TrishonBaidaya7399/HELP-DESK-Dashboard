// import PropTypes from 'prop-types';
import { MdDashboard } from "react-icons/md";
import { BsFillTicketFill } from "react-icons/bs";
import { HiTicket } from "react-icons/hi2";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
   
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-gray-300 text-black text-xl ">
          {/* Sidebar content here */}
          <li>
            <NavLink to="dashboard"
              className={({ isActive }) =>
                isActive ? "active bg-[transparent] " : ""
              }
            >
              <div className="flex items-center gap-2">
                <div>
                  <MdDashboard />
                </div>
                <div>
                  <h1>Dashboard</h1>
                </div>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="newTicket"
              className={({ isActive }) =>
                isActive ? "active bg-[transparent] " : ""
              }
            >
              <div className="flex items-center gap-2">
                <div>
                  <BsFillTicketFill />
                </div>
                <div>
                  <h1>New Ticket</h1>
                </div>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="myTickets"
              className={({ isActive }) =>
                isActive ? "active bg-[transparent] " : ""
              }
            >
              <div className="flex items-center gap-2">
                <div>
                  <HiTicket />
                </div>
                <div>
                  <h1>My Tickets</h1>
                </div>
              </div>
            </NavLink>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

DashBoard.propTypes = {};

export default DashBoard;
