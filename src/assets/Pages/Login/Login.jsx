// import PropTypes from 'prop-types';

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const {signInUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin= (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const formData = {email, password}
        console.log(formData);
        signInUser(email, password)
        .then(result=>{
          console.log("Logged in successfully!", result.user);
          Swal.fire({
            title: 'Logged In!',
            text: `${result.user?.displayName ? result.user.displayName : 'User'} logged in successfully!`,
            confirmButtonText: 'Ok!',
            icon:"success"
          })
          navigate('/dashboard');
        })
        .catch(error=>{
          console.error(error.message);
        })
    }
  return (
    <div className="bg-[#55D6C2] p-[150px] h-full w-full">
      <div className="bg-[#EFEDED] rounded-md bg-opacity-50 p-[100px] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Helpdesk System</h1>
        <div>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-6 w-[37vw] text-black">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input border-1 text-black border-black w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input border-1 text-black border-black w-full"
            />
            <input
              type="submit"
              value={"Sign In"}
              className="bg-[#03CC17] px-12 py-2 text-white font-semibold rounded-md w-fit mx-auto"
            />
            <div className="flex flex-row justify-between w-full mt-12">
              <div className="mr-auto">
                <Link to="/forgetPassword">
                <h1 className="text-lg text-red-500 font-semibold">
                  Forget Password
                </h1>
                </Link>
                    
              </div>
              <div className="ml-auto">
                <Link to="/register" className="text-xl font-semibold ">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
