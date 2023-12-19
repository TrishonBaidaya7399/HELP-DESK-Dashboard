// import PropTypes from 'prop-types';

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Signup = () => {
  const axiosPublic = useAxiosPublic();
    const { createUser, updateUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignup = async (e)=>{
        e.preventDefault()
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        const email = form.email.value;
        const formData = {username, password, email}
        console.log(formData);
        createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUser(username)
          .then(() => {
            console.log('Profile Updated');
            const userData = {
              name: username,
              email: email,
              role: 'user',
            };
            axiosPublic.post('/users', userData).then((res) => {
              if (res.data.insertedId) {
                console.log('User info added to the database!');
                Swal.fire({
                  title: 'Profile Created!',
                  text: `UserProfile created successfully!`,
                  icon: "success",
                  confirmButtonText: 'Ok!',
                });
                form.reset();
                logOut()
                  .then(() => {
                    console.log('Logged Out Successfully!');
                    navigate('/login');
                  })
                  .catch((error) => {
                    console.error(error.message);
                  });
              }
            });
          })
          .catch((error) => {
            console.error(error.message);
            Swal.fire({
                title: 'Failed!',
                text: "Failed to Create Profile!",
                confirmButtonText: 'Ok!',
                icon: "error"
              });
          });
      })
      .catch((error) => {
        console.error(error.message);
        Swal.fire({
            title: 'Failed!',
            text: "Failed to Create Profile!",
            confirmButtonText: 'Ok!',
            icon: "error"
          });
      });
    }
  return (
    <div className="bg-[#55D6C2] p-[150px] h-full w-full">
      <div className="bg-[#EFEDED] rounded-md bg-opacity-50 p-[100px] flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Helpdesk System</h1>
        <div>
            <h1 className="text-xl font-semibold text-center mt-4">Sign up here</h1>
          <form onSubmit={handleSignup} className="flex flex-col gap-6 mt-6 w-[37vw] text-black">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input border-1 text-black border-black w-full"
            />
            <input
            name="password"
              type="password"
              placeholder="Password"
              className="input border-1 text-black border-black w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input border-1 text-black border-black w-full"
            />
            <input
              type="submit"
              value={"Sign Up"}
              className="bg-[#296EF2] px-12 py-2 text-white font-semibold rounded-md w-fit mx-auto"
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
                <Link to="/login" className="text-xl font-semibold ">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
