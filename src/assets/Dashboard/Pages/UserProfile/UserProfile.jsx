// import PropTypes from 'prop-types';

import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const UserProfile = () => {
    const {user} = useContext(AuthContext);
    
    const 
  return (
    <div className="pt-6 pb-12 mb-auto">
      <h1 className="text-2xl font-semibold text-center">User Profile</h1>
      <div className="p-12 flex gap-8">
        <div className="profileCard bg-white rounded-lg p-6">

        </div>
        <div className="feedback"></div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
