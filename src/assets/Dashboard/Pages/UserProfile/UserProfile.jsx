import { FaEdit, FaUser } from "react-icons/fa";
import useUserInfo from "../../../../Hooks/useUserInfo";
import { NavLink } from "react-router-dom";

const UserProfile = () => {
  const [userInfo] = useUserInfo();

  return (
    <div className="my-6 h-full w-full px-12">
      <h1 className="text-2xl font-semibold text-left mb-8">User Profile</h1>
      <div className="p-12 flex gap-12 bg-[#55D6C2] bg-opacity-70 rounded-lg justify-center">
        <div className="profileCard bg-white rounded-lg p-6 w-[330px] relative">
            <div className="absolute right-5 text-xl">
            <NavLink to="/userProfile/editProfile">
                <FaEdit/>
            </NavLink>
            </div>
          <div className="flex justify-center">
            {userInfo?.image ? (
              <img src={userInfo.image} alt="" />
            ) : (
              <FaUser className="text-[100px] text-black bg-gray-300 p-2 rounded-full drop-shadow-lg" />
            )}
          </div>
          <div className="flex flex-col text-left gap-1 mt-4">
            <h1><span className="font-semibold">User Name:</span> {userInfo.name}</h1>
            <h1><span className="font-semibold">Contact Info:</span> +8801*********</h1>
            <h1><span className="font-semibold">Email:</span> {userInfo.email}</h1>
            <h1><span className="font-semibold">Designation</span>: {userInfo.role}</h1>
            <h1><span className="font-semibold">Department:</span> N/A</h1>
          </div>
        </div>
        <div className="feedback bg-white rounded-lg p-6 w-[330px]">
            <h1 className="text-xl font-semibold text-center">Give Feedback</h1>
            <div className="flex flex-col gap-2 mt-4">
            <input type="text" placeholder="Write your feedback" className="bg-gray-300 px-2 rounded-md w-full h-10" />
            <div className="rating mx-auto">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
<button className="w-full rounded-lg text-center text-lg font-semibold bg-[#55D6C2] h-10">Submit Feedback</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
