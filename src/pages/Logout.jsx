import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {logout} from "../features/authSlice.js"
import { removeActiveUser } from '../utils/localStorage'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    removeActiveUser();
    navigate('/');
  }, [])
  
  return (
    <div>Logout</div>
  )
}

export default Logout