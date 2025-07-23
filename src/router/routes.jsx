import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'
import { Home, Explore } from "../pages/index.js"

import PollCard from '../components/PollCard.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home/>}/>
      <Route path='/pollcard' element={<PollCard />}/>
      <Route path='/explore' element={<Explore />}/>
      <Route path='/contact-us' element={<></>}/>
      <Route path='/dashboard' element={<></>}/>
      <Route path='/profile' element={<></>}/>
      <Route path='/login' element={<></>}/>
      <Route path='/signup' element={<></>}/>
      <Route path='*' element={<></>}/>
    </Route>
  )
)

export default routes