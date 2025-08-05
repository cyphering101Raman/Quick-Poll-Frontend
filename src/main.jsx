import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import routes from './router/routes.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { Provider } from 'react-redux'
import store from './store/store.js'

const clientId = "376083123400-iha42boa205nullu3iioto699luev937.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
)
