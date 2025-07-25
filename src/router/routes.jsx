import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'
import { Home, Explore, Login, SignUp, PageNotFound, ContactUs, Logout, CreatePoll } from "../pages/index.js"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>}/>
      <Route path='/explore' element={<Explore />}/>
      <Route path='/create-poll' element={<CreatePoll />}/>
      <Route path='/dashboard' element={<></>}/>
      <Route path='/profile' element={<></>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/Logout' element={<Logout />}/>
      <Route path='*' element={<PageNotFound />}/>
    </Route>
  )
)

export default routes