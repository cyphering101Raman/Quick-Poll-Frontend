import { lazy, Suspense } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

const App = lazy(() => import("../App.jsx"));
const Home = lazy(() => import("../pages/Home.jsx"));
const Explore = lazy(() => import("../pages/Explore.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const SignUp = lazy(() => import("../pages/SignUp.jsx"));
const PageNotFound = lazy(() => import("../pages/PageNotFound.jsx"));
const ContactUs = lazy(() => import("../pages/ContactUs.jsx"));
const Logout = lazy(() => import("../pages/Logout.jsx"));
const CreatePoll = lazy(() => import("../pages/CreatePoll.jsx"));
const DashBoard = lazy(() => import("../pages/DashBoard.jsx"));
const PollPage = lazy(() => import("../pages/PollPage.jsx"));
const Profile = lazy(() => import("../pages/Profile.jsx"));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-blue-600">
          <img
            src="/Quick-Poll-Logo.png"
            alt="QuickPoll Logo"
            className="w-40 h-40 animate-pulse-fade-zoom"
          />
        </div>
      }><App/></Suspense>
    }>

      <Route index element={<Home />} />
      <Route path='explore' element={<Explore />} />
      <Route path='create-poll' element={<CreatePoll />} />
      <Route path='dashboard' element={<DashBoard />} />
      <Route path='poll/:id' element={<PollPage />} />
      <Route path='profile' element={<Profile />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='contact-us' element={<ContactUs />} />
      <Route path='Logout' element={<Logout />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  )
)

export default routes;