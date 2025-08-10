import React from 'react'
import { Input, Button, Logo } from "../index.js"
import { useDispatch } from 'react-redux'
import { login } from "../../features/authSlice.js"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axiosInstance from "../../utils/axiosInstance.js"
import { toast } from 'react-toastify'

// --- firebase imports for Google sign-in ---
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import firebaseApp from "../../utils/firebase.js"

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formSubmitHandler = async (userData) => {
    try {
      const res = await axiosInstance.post("/users/signup", userData)

      const user = res.data;
      dispatch(login(user));
      toast.success(`Signed up successfully. Welcome, ${user.username || 'user'}!`, { autoClose: 3000 });
      navigate("/explore")
    } catch (error) {
      if (error.response && error.response.data?.message) {
        setError("confirmPassword", {
          type: "manual",
          message: error.response.data.message
        })
      } else {
        setError("confirmPassword", {
          type: "manual",
          message: "Server error. Try again later."
        });
      }
    }
  }

  const handleGoogleSignIn = async () => {
    const toastId = toast.info("Signing you in with Google...", { autoClose: false });
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      const res = await axiosInstance.post("/users/google-login", { credential: idToken });
      const backendUser = res.data.data;
      dispatch(login(backendUser));
      toast.update(toastId, { render: `Logged in as ${backendUser.username || 'user'}`, type: "success", autoClose: 3000 });
      navigate("/explore");
    } catch (error) {
      toast.update(toastId, { render: "Google login failed", type: "error", autoClose: 3000 });
    }
  };


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
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/,
                message:
                  "Must include uppercase, lowercase, number, and special character"
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

        <div className="my-4 flex items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-600 font-medium text-xs">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google sign-in button using Firebase */}
        <Button
          onClick={handleGoogleSignIn}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 w-full rounded-lg shadow-md mt-2"
        >
          Continue with Google
        </Button>

      </div>
    </div>
  )
}

export default SignUp
