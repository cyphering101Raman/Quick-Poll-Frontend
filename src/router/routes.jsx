import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'
import { Home, Explore, Login, SignUp, PageNotFound, ContactUs } from "../pages/index.js"

import PollCard from '../components/PollCard.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>}/>
      <Route path='/pollcard' element={<PollCard />}/>
      <Route path='/explore' element={<Explore />}/>
      <Route path='/contact-us' element={<ContactUs/>}/>
      <Route path='/dashboard' element={<></>}/>
      <Route path='/profile' element={<></>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='*' element={<PageNotFound />}/>
    </Route>
  )
)

export default routes