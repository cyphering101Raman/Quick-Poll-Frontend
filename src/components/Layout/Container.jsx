import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "../index.js"

import { useDispatch } from 'react-redux'
import { login } from "../../features/authSlice.js"
import axiosInstance from '../../utils/axiosInstance.js'

const Container = ({ children, width = '100%' }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const hydrateUserData = async()=>{

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      if(!isLoggedIn) return;

      try {
        const res = await axiosInstance.get("/users/me");
        dispatch(login(res.data));
        // console.log("User hydrated:", res.data);
      } catch (err) {
        console.warn("Token invalid or expired:", err.message);
      }
    }
    
    hydrateUserData();
  }, [])

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Container