// import PropTypes from 'prop-types';

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../Providers/AuthProvider";



const useTicket = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
 const {data: ticket=[], refetch} = useQuery({
    queryKey: ["ticket", user?.email],
    queryFn: async()=>{
        const res = await axiosPublic.get(`/ticket?userEmail=${user?.email}`)
        console.log(res.data);
        return res.data
    }
 });
 return [ticket, refetch]

};

useTicket.propTypes = {};

export default useTicket;
