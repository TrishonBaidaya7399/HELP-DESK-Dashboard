// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";



const useUserInfo = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    // console.log("Inside useUserInfo: ",user?.email);
    const { data: userInfo = [] } = useQuery({
        queryKey: ["userInfo", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
          const res = await axiosPublic.get(`/users?email=${user?.email}`);
          // console.log("User from database: ", res?.data);
          return res.data;
        }
      });
      console.log("UserInfo inside useUserInfo: ", userInfo);
 return [userInfo]

};

useUserInfo.propTypes = {};

export default useUserInfo;
