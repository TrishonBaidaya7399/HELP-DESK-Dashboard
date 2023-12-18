// import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const formData = { email };
    console.log(formData);
  };
  return (
    <div className="bg-[#55D6C2] p-[150px] h-full w-full">
      <div className="bg-[#EFEDED] rounded-md bg-opacity-50 p-[100px] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-lg text-center font-semibold lg:w-[70%] mt-6">
            Don’t worry, Enter your email below and we will send you a link to
            change password.
          </h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-6 mt-6 w-[37vw] text-black"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input border-1 text-black border-black w-full"
            />
            <input
              type="submit"
              value={"Reset Password"}
              className="bg-[#03CC17] px-12 py-2 text-white font-semibold rounded-md w-fit mx-auto"
            />
            <div className="flex flex-row justify-between w-full mt-12">
              <div className="ml-auto">
                <Link to="/register" className="text-xl font-semibold ">
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

ForgetPassword.propTypes = {};

export default ForgetPassword;
