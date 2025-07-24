import React from 'react'
import { Logo, Button, Input } from "../index.js"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { saveUser } from "../../utils/localStorage.js";

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const loginHandler = (userData) =>{

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
            label="Username"
            placeholder="Enter your username / email"
            {...register("username", {
              required: "Username is required"
            })}
          />

          {errors.username && <p className="text-red-500 text-sm">
            {errors.username.message}</p>}

          <Input
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required"
            })} />

            {errors.username && <p className="text-red-500 text-sm">
            {errors.username.message}</p>}

          <Button type='submit' className='bg-blue-500 hover:bg-sky-600 text-white font-medium py-2 w-full rounded-lg shadow-md'>
            Login
          </Button>

        </form>
      </div>
    </div>
  )
}

export default Login