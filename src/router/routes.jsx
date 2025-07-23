import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import App from '../App'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/explore' element={<></>}/>
      <Route path='/contact-us' element={<></>}/>
      <Route path='/login' element={<></>}/>
      <Route path='/signup' element={<></>}/>
    </Route>
  )
)

export default routes