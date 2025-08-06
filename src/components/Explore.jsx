import { useState, useEffect } from 'react'

import { PollCard } from './index.js'
import axiosInstance from '../utils/axiosInstance.js'
import { Link } from 'react-router-dom'

const Explore = () => {

  const [activePolls, setActivePolls] = useState([]);
  const [expiredPolls, setExpiredPolls] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axiosInstance.get("/polls");
        const { activePolls, expiredPolls } = res.data.data;

        setActivePolls(activePolls);
        setExpiredPolls(expiredPolls);
        setLoading(false)

      } catch (error) {
        console.error("Failed to fetch polls:", error);
        setLoading(false)
      }
    }
    fetchPolls();
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center text-white font-semibold">
        <p className="text-2xl text-gray-200 tracking-widest animate-bounce">L o a d i n g . . .</p>
      </main>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 py-12 px-4">

      {/* Explore Section Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Explore Polls</h1>
        <p className="text-gray-300 text-lg">See what's trending and cast your vote.</p>
      </div>

      {/* Poll Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-9 gap-y-8 sm:gap-y-12 px-2 sm:px-4">
        {activePolls && activePolls.length > 0 ? (
          activePolls.map((poll) => (
            <PollCard key={poll._id} {...poll} showPollBtn={true} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl shadow-xl py-16 px-6 text-center">
            <p className="text-gray-100 text-2xl font-medium mb-6">
              No active polls at the moment.
            </p>
            <Link to="/create-poll">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200">
                Create a New Poll
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Expired Polls Section */}
      {expiredPolls.length > 0 && (
        <>
          <div className="mt-20 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-1">Past Polls</h2>
            <p className="text-gray-300 text-base mb-8">These polls have concluded. View results below.</p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-9 gap-y-8 sm:gap-y-12 px-2 sm:px-4">
            {expiredPolls.map((poll) => (
              <PollCard key={poll._id} {...poll} showPollBtn={true} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Explore
