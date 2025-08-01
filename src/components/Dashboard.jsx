import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { PollCard } from "./index.js";
import axiosInstance from "../utils/axiosInstance.js";
import { useSelector } from 'react-redux';
import { fetchUserData } from '../utils/fetchUserData.js';

const Dashboard = () => {

  const { isLoggedIn, userData } = useSelector(state => state.auth)

  const [authError, setAuthError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pollCount, setPollCount] = useState(0)
  const [votesReceived, setVotesReceived] = useState(0)
  const [userPolls, setUserPolls] = useState([])

  const [refreshToggle, setRefreshToggle] = useState(false);

  const deletePollHandler = async (pollId) => {
    try {
      await axiosInstance.post("/poll/delete", {pollId});
      setRefreshToggle(prev => !prev);
    } catch (error) {
      console.error("Failed to delete poll:", error);
    }
  }

  useEffect(() => {
    const fetchPolls = async () => {
      if (!isLoggedIn) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      try {
        const user = await fetchUserData();

        const res = await axiosInstance.get('/polls');
        const { activePolls, expiredPolls } = res.data.data;

        const combined = [...activePolls, ...expiredPolls];
        const userCreatedPolls = combined
          .filter(poll => poll.createdBy._id === user._id)
          .sort((a, b) => new Date(b.expiredAt) - new Date(a.expiredAt));

        setUserPolls(userCreatedPolls);
        setPollCount(userCreatedPolls.length);
        setVotesReceived(
          userCreatedPolls.reduce(
            (acc, poll) => acc + poll.options.reduce((sum, opt) => sum + opt.voteCounter, 0),
            0
          )
        );

      } catch (err) {
        console.error("Poll fetching Error:", err);
        setAuthError(true);
      } finally {
        setLoading(false)
      }
    };

    fetchPolls();
  }, [isLoggedIn, userData, refreshToggle]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-purple-700 to-blue-600  flex items-center justify-center text-white font-semibold">
        <p className="text-2xl text-gray-200 tracking-widest animate-bounce">L o a d i n g . . .</p>
      </main>
    );
  }

  if (authError) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-600 to-sky-500 px-6 md:px-12 py-10 text-white">
        <div className="bg-white/10 p-6 rounded-xl shadow-xl text-center">
          <h2 className="text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-gray-200">
            Please <Link to="/login" className="text-sky-400 underline hover:text-sky-300">log in</Link> to view your dashboard.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-900 px-6 md:px-12 py-10 text-white">


      <header className="mb-10 border-b border-gray-400 pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Dashboard</h1>
        <p className="text-gray-200 text-lg">View your poll statistics and activity summary.</p>
      </header>


      <section className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="bg-white/10 p-4 rounded-xl shadow-md w-full sm:w-auto">
          <div className="flex items-center gap-x-2">
            <p className="text-gray-100 text-sm">Total Polls Created:</p>
            <p className="text-2xl font-bold">{pollCount}</p>
          </div>
        </div>

        <div className="bg-white/10 p-4 rounded-xl shadow-md w-full sm:w-auto">
          <div className="flex items-center gap-x-2">
            <p className="text-gray-100 text-sm">Total Votes Received:</p>
            <p className="text-2xl font-bold">{votesReceived}</p>
          </div>
        </div>

        <Link
          to="/create-poll"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-3 rounded-xl shadow transition w-full sm:w-auto text-center"
        >
          + Create New Poll
        </Link>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPolls.map((poll) => (
          <PollCard key={poll._id}
            {...poll}
            showPollBtn={true}
            showDelete={true}
            onDelete={() => deletePollHandler(poll._id)}
          />
        ))}
      </section>
    </main>
  );

};

export default Dashboard;
