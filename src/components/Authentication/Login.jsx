import React, { useState } from 'react'
import { Logo, Button, Input } from "../index.js"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { login } from "../../features/authSlice.js"
import axiosInstance from '../../utils/axiosInstance.js';

import { toast } from 'react-toastify';

const Login = () => {

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginSuccessUser, setLoginSuccessUser] = useState(null);

  const loginHandler = async (userData) => {
    try {
      const res = await axiosInstance.post("/users/login", userData);
      const user = res.data.data;
      console.log("Frontend user: ", user);

      dispatch(login(user));

      setLoginSuccessUser(user);

      toast.success(`Welcome back, ${user.username}!`, {
        position: "top-center",
        autoClose: 3000
      });

      setTimeout(() => navigate("/explore"), 2000);

      console.log("Login Success: ", user);

    } catch (error) {
      console.log(error.response.data.message);
      console.log(error.response.data);
      setError("password", {
        type: "manual",
        message: error.response.data.message || "Invalid credentials"
      })

      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center"
      });
    }
  }

  return (
    <div className="py-10 min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 px-4">
      <div className="bg-white/50 backdrop-blur-sm text-black max-w-md w-full rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex justify-center mb-4">
          <Link to='/'> <Logo /> </Link>
        </div>

        {loginSuccessUser ? (
          <p className="text-center text-grey-500 text-2xl font-semibold">
            Welcome back, {loginSuccessUser.username || "user"}!<br />
            Loading Explore...
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up</Link>
            </p>

            <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
              <Input
                label="User ID"
                placeholder="Enter your username / email"
                className={
                  errors.password
                    ? "border-red-500 bg-red-200 focus:border-red-700"
                    : ""
                }
                {...register("userid", {
                  required: "User ID is required"
                })}
              />
              {errors.userid && (
                <p className="text-red-500 text-sm">{errors.userid.message}</p>
              )}

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                className={
                  errors.password
                    ? "border-red-500 bg-red-200 focus:border-red-700"
                    : ""
                }
                {...register("password", {
                  required: "Password is required"
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-sky-600 text-white font-medium py-2 w-full rounded-lg shadow-md"
              >
                Login
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default Login