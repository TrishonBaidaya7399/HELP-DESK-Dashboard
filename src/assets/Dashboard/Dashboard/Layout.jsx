// import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";
import DashBoard from "../DashBoard";
import Navbar from "../../../Components/Shared/Navbar/Navbar";

const Layout = () => {
    const location =useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes("register")

    return (
        <div>
             {noHeaderFooter || <Navbar/>}
             <DashBoard/>
        </div>
    );
};

Layout.propTypes = {
    
};

export default Layout;