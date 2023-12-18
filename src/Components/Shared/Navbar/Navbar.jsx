// import PropTypes from 'prop-types';
import { useContext } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { TbLogin, TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import SwitchSelector from "react-switch-selector";
import { AuthContext } from "../../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const options = [
    {
      label: <span>BM</span>,
      value: {
        BM: true,
      },
      selectedBackgroundColor: "black",
      selectedFontColor: "#fff",
    },
    {
      label: <span>BI</span>,
      value: {
        BI: true,
      },
      selectedBackgroundColor: "black",
      selectedFontColor: "#fff",
    },
  ];

  const onChange = (newValue) => {
    console.log(newValue);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "bar"
  );
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged Out Successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="navbar bg-[#55D6C2] px-6 max-h-[100px]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a className="text-2xl md:text-3xl text-white font-bold">
          <i>Helpdesk</i>
        </a>
      </div>

      <div className="navbar-end flex gap-4">
        {/* <input type="checkbox" className="toggle toggle-info" checked /> */}
        <div className="language-toggle">
          <div
            className="your-required-wrapper text-white border-2 border-black rounded-full"
            style={{ width: 100, height: 30 }}
          >
            <SwitchSelector
              className=""
              onChange={onChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#55DD6C2"}
              fontSize={14}
              selectedBackgroundColor={"black"}
              selectedFontColor={"black"}
            />
          </div>
        </div>
        <div className="notification">
          <FaBell className="text-xl" />
        </div>
        <div className="user-profile">
          <FaUser className="text-xl" />
        </div>
        {user ? (
          <div className="logout">
            <button onClick={handleLogout}>
            <TbLogout className="text-xl" />
            </button>
          </div>
        ) : (
          <div className="login">
            <Link to="login">
              <TbLogin className="text-xl" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
