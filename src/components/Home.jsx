import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "./index.js"
import { login } from "../features/authSlice.js"
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  
  const { isLoggedIn, userData } = useSelector((state) => state.auth);

  console.log("User Status: ", isLoggedIn);
  console.log("User Data: ", userData);
  
  return (
    <section className="min-h-[calc(100vh-100px)] bg-gradient-to-r from-purple-700 to-blue-600 text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Instant, Anonymous, Powerful Polling</h1>
      <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-2xl">
        Quick Poll lets you create, share, and vote on polls effortlessly. No hassle. No login required for viewers.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/explore">
          <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-2xl shadow">
            Explore Polls
          </Button>
        </Link>

        {!isLoggedIn && 
        <Link to="/login">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl shadow">
            Login to Vote
          </Button>
        </Link> }

        {isLoggedIn && 
        <Link to="/create-poll">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2xl shadow">
            Create a Poll
          </Button>
        </Link> }
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl w-full px-4">
        <div>
          <h3 className="text-xl font-semibold">🗳 Easy Poll Creation</h3>
          <p className="text-gray-200 text-sm">Create and share polls in seconds—no signup required.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">🔒 Secure & Anonymous</h3>
          <p className="text-gray-200 text-sm">Your votes are private and secure with us.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">📊 Real-time Results</h3>
          <p className="text-gray-200 text-sm">Get instant feedback with live result tracking.</p>
        </div>
      </div>
    </section>
  )
}

export default Home
