// import PropTypes from 'prop-types';

import { useContext } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";

const EditProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="my-6 h-full w-full px-12">
        <h1 className="text-2xl font-semibold text-left mb-8">User Profile</h1>
        <button disabled className="w-1/4 rounded-t-sm text-center text-lg font-semibold bg-[#55D6C2] h-10">Edit Profile</button>
        <div className="bg-gray-300 flex flex-col gap-2 w-full py-2">
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Username
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="text" className="h-10 input input-ghost w-full border-none pl-4" defaultValue={user?.name} />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Current Password
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="password" className="h-10 input input-ghost w-full border-none pl-4" />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   New Password
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="password" className="h-10 input input-ghost w-full border-none pl-4" />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Confirm Password
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="password" className="h-10 input input-ghost w-full border-none pl-4" />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Email
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="email" className="h-10 input input-ghost w-full border-none pl-4" defaultValue={user?.email} />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Real Name
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="text" className="h-10 input input-ghost w-full border-none pl-4" defaultValue={user?.name} />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Access Level
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="text" className="h-10 input input-ghost w-full border-none pl-4" defaultValue={user?.role} />
                </div>
            </div>
            <div className="flex w-full">
                <div className="h-10 flex items-center bg-gray-400 text-lg font-semibold text-white text-left pl-4 w-1/2">
                   <p className="">
                   Project Access Level
                   </p>
                </div>
                <div className="h-10 bg-white w-1/2">
                <input type="text" className="h-10 input input-ghost w-full border-none pl-4" defaultValue={user?.role} />
                </div>
            </div>
            <div className="flex w-full">
            <button className="w-1/4 rounded-md ml-2 text-center text-lg font-semibold bg-[#55D6C2] h-10">Update User</button>
            </div>
        </div>
            
        </div>
    );
};

EditProfile.propTypes = {
    
};

export default EditProfile;