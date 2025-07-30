import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../features/authSlice.js"
// import { removeActiveUser } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance.js'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await axiosInstance.post("/users/logout")
        dispatch(logout());
        navigate('/');
      } catch (error) {
        console.error("Logout error:", error)
      }
    }

    handleLogout()
  }, [dispatch, navigate])

  return (
    <></>
  )
}

export default Logout