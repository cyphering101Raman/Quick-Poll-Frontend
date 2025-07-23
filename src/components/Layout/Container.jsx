import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from "../index.js"

const Container = ({ children, width = '100%' }) => {
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