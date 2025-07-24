import React from 'react'
import { Input, Button, Logo } from "../index.js"
import { useDispatch } from 'react-redux'
import { login } from "../../features/authSlice.js"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { saveUser } from "../../utils/localStorage.js";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formSubmitHandler = (userData) => {
    dispatch(login(userData));
        saveUser(userData);
        navigate('/explore');
  }

  return (
    <div className="py-10 min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 px-4">

      <div className="bg-white/50 backdrop-blur-sm text-black max-w-md w-full rounded-2xl shadow-lg p-8 space-y-6">


        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">Sign up to create account</h2>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log In</Link>
        </p>

        <form onSubmit={handleSubmit(formSubmitHandler)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("fullName", {
              required: "Full name required"
            })}
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}

          <Input
            label="Username"
            placeholder="Choose a username"
            {...register("username", {
              required: "Username required"
            })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email"
              }
            })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <div>
            <label htmlFor="gender" className="block mb-1 text-sm font-medium">Gender</label>
            <select
              id="gender"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("gender", { required: "Gender is required" })}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min 6 characters required"
              }
            })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => {
                return value === watch("password") || "Passwords do not match"
              }
            })}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

          <Button type='submit' className='bg-blue-500 hover:bg-sky-600 text-white font-medium py-2 w-full rounded-lg shadow-md'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
