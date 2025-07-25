import React from 'react'
import { Logo, Button, Input } from "../index.js"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUser, saveUser } from "../../utils/localStorage.js";
import { useDispatch } from 'react-redux';
import { login } from "../../features/authSlice.js"

const Login = () => {

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = (userData) => {
    const allUser = getAllUser();

    // console.log("Local storage data: ", allUser);
    // console.log("Logged User Data: ", userData);

    const doesUserExist = allUser.some(user =>
      user.username === userData.userid || user.email === userData.userid
    )
    // console.log("User exist: ",doesUserExist);
    
    if(!doesUserExist) setError("password", {
      type: "manual",
      message: "User does not exist. Sign Up"
    })
    else{
      const currentUser = allUser.find(user => (user.username === userData.userid || user.email === userData.userid) && (user.password === userData.password)
      );

      if(currentUser){
        dispatch(login(currentUser));
        saveUser(currentUser);
        navigate("/explore");
      }
      else{
        setError("password", {
          type: "manual",
          message: "Invalid user credentials"
        });
      }

    }
  }

  return (
    <div className="py-10 min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 px-4">

      <div className="bg-white/50 backdrop-blur-sm text-black max-w-md w-full rounded-2xl shadow-lg p-8 space-y-6">

        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-blue-600 hover:underline">Sign Up</Link>
        </p>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
          <Input
            label="User ID"
            placeholder="Enter your username / email"
            {...register("userid", {
              required: "User ID is required"
            })}
          />

          {errors.username && <p className="text-red-500 text-sm">
            {errors.username.message}</p>}

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required"
            })} />

          {errors.password && <p className="text-red-500 text-sm">
            {errors.password.message}</p>}

          <Button type='submit' className='bg-blue-500 hover:bg-sky-600 text-white font-medium py-2 w-full rounded-lg shadow-md'>
            Login
          </Button>

        </form>
      </div>
    </div>
  )
}

export default Login