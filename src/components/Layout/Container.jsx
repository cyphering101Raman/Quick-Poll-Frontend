import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "../index.js"

import { getActiveUser } from "../../utils/localStorage.js"
import { useDispatch } from 'react-redux'
import {login} from "../../features/authSlice.js"

const Container = ({ children, width = '100%' }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const activeUser = getActiveUser();
    if (activeUser) dispatch(login(activeUser));

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