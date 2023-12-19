// import PropTypes from 'prop-types';
import { BarChart, Bar, ResponsiveContainer } from "recharts";
import technicalImg from "../../../assets/images/icons/technical-support.png";
import operatorImg from "../../../assets/images/icons/operator.png";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const DashboardHome = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);
    // console.log("Inside useUserInfo: ",user?.email);
    const { data: userInfo = [] } = useQuery({
        queryKey: ["userInfo", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
          const res = await axiosPublic.get(`/users?email=${user?.email}`);
          return res.data;
        }
      });
      console.log("UserInfo inside useUserInfo: ", userInfo);
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className=" mb-auto mt-6">
      <h1 className="text-2xl font-semibold text-center">Dashboard</h1>
      <div className="card-section flex gap-4 mt-6">
        <div className="card rounded-lg bg-[#2F82FF] w-[200px] flex justify-center items-center p-5">
          <h1 className="text-xl text-[#05386B] font-bold">Total Tickets</h1>
          <h1 className="text-6xl font-bold text-[#05386B]">12</h1>
        </div>
        <div className="card rounded-lg bg-[#0BFF68] w-[200px] flex justify-center items-center p-5">
          <h1 className="text-xl text-[#05386B] font-bold">Total Solved</h1>
          <h1 className="text-6xl font-bold text-[#05386B]">8</h1>
        </div>
        <div className="card rounded-lg bg-[#FE594E] w-[200px] flex justify-center items-center p-5">
          <h1 className="text-xl text-[#05386B] text-center font-bold">
            Total Awaiting Approval
          </h1>
          <h1 className="text-6xl font-bold text-[#05386B]">2</h1>
        </div>
        <div className="card rounded-lg bg-[#FCFF6C] w-[200px] flex justify-center items-center p-5">
          <h1 className="text-xl text-[#05386B] font-bold">
            Total in Progress
          </h1>
          <h1 className="text-6xl font-bold text-[#05386B]">12</h1>
        </div>
      </div>
      {
        userInfo?.role ==="admin"
        &&
      <div className="flex gap-12 w-full my-8">
        <div className="stat-section w-full bg-[#55D6C2] rounded-md p-12">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <Bar dataKey="uv" fill="#05386B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="help-section flex flex-col gap-9 w-full rounded-md">
          <div className="flex justify-evenly gap-6 items-center bg-[#55D6C2] p-6 rounded-md">
            <div className="flex flex-col gap-1 justify-center items-center">
              <img src={technicalImg} alt="" className="w-[60px]" />
              <p className="text-blue-700 text-2xl font-semibold text-center">
                3
              </p>
              <p className="text-black text-xl font-semibold text-center">
                Technical Supports
              </p>
            </div>
            <div className="flex flex-col gap-1 justify-center items-center">
              <img src={operatorImg} alt="" className="w-[70px]" />
              <p className="text-blue-700 text-2xl font-semibold text-center">
                4
              </p>
              <p className="text-black text-xl font-semibold text-center">
                Operation Team
              </p>
            </div>
          </div>
          <div className="feedback bg-[#55D6C2] p-6 rounded-md">
            <h1 className="text-black text-xl font-semibold text-center">
              Customer feedback
            </h1>
            <div className="rating mt-4 flex justify-center">
              <input type="radio" name="rating-1" className="bg-white mask mask-star w-12" />
              <input type="radio"  name="rating-1" className="bg-white mask mask-star w-12" />
              <input type="radio" name="rating-1" className="bg-white mask mask-star w-12" />
              <input
                type="radio"
                name="rating-1"
                className="bg-white mask mask-star w-12"
                checked
              />
              <input type="radio" name="rating-1" className="bg-white mask mask-star w-12" />
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
