import React, { useState } from 'react'
import { Logo, Button, Input } from "../index.js"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from "../../features/authSlice.js"
import axiosInstance from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify'
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Firebase imports for Google sign-in
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import firebaseApp from "../../utils/firebase.js"

const Login = () => {

  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginSuccessUser, setLoginSuccessUser] = useState(null);

  const loginHandler = async (userData) => {
    try {
      const res = await axiosInstance.post("/users/login", userData);
      const user = res.data.data;
      // console.log("Frontend user: ", user);

      dispatch(login(user));
      setLoginSuccessUser(user);

      toast.success(`Welcome back, ${user.username}!`, {
        position: "top-center",
        autoClose: 3000
      });

      setTimeout(() => navigate("/explore"), 2000);

      // console.log("Login Success: ", user);

    } catch (error) {
      // console.log(error.response.data.message);
      // console.log(error.response.data);
      setError("password", {
        type: "manual",
        message: error.response.data.message || "Invalid credentials"
      })

      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center"
      });
    }
  }

  // New Google sign-in handler (Firebase Auth)
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

  const [showPassword, setShowPassword] = useState(false);
  const passwordTimeout = React.useRef(null);

  const handleShowPassword = () => {
    setShowPassword(true);
    if (passwordTimeout.current) clearTimeout(passwordTimeout.current);
    passwordTimeout.current = setTimeout(() => setShowPassword(false), 2000);
  };


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

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`pr-12 ${errors.password ? "border-red-500 bg-red-200 focus:border-red-700" : ""
                    }`}
                  {...register("password", {
                    required: "Password is required"
                  })}
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute right-3 top-9 text-xl text-gray-500 hover:text-gray-800"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

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
          </>
        )}
      </div>
    </div>
  );
}

export default Login
