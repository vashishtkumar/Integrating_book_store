import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6">
        <p className="text-zinc-200 text-xl">Log In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded"
              placeholder="username"
              name="username"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-700">
            LogIn
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Don't have an account?&nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>SignUp</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
