import React, { useState, useEffect } from 'react'
import { Button } from './index.js'
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance.js';

const PollCard = ({
  _id,
  question,
  options,
  createdAt,
  expiredAt,
  createdBy,
  showDelete = false,
  showPollBtn = false,
  onDelete,
  votedUsers
}) => {

  const timepublished = new Date(createdAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const expiredTime = new Date(expiredAt).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const isExpired = new Date(expiredAt).getTime() < Date.now();

  const [error, setError] = useState("")
  const [userVoted, setuserVoted] = useState(false)

  const handleOptionVote = async (optionIndex) => {
    if(userVoted || isExpired) return;

    try {
      const res = await axiosInstance.post(`/poll/vote/${_id}`, { optionIndex })

    } catch (error) {
      setError(`Vote failed: ${error?.response?.data?.message || error.message}`)

      setTimeout(() => setError(""), 3000);
    }
  }

  useEffect(() => {
    if (!votedUsers?.length) return;

    const checkUserVoted = async () => {
      try {
        const res = await axiosInstance.get("/users/me");
        const userId = res.data._id;
        if (votedUsers.some(user => user._id === userId)) {
          setuserVoted(true);
        }

      } catch (error) {
        console.error("Error checking vote status:", error);
      }
    };

    checkUserVoted();
  }, []);


  return (
    <div className="relative group bg-gradient-to-br from-teal-500 via-indigo-600 to-pink-600 text-black rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto transition flex flex-col justify-between overflow-hidden">

      {/* EXPIRED Watermark */}
      {isExpired && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] text-6xl font-extrabold text-gray-700 opacity-50 group-hover:text-red-500 group-hover:opacity-90 transition-all duration-300 select-none z-[80]">
          EXPIRED
        </div>
      )}

      {/* Poll Question */}
      <h2 className="text-2xl text-center font-semibold mb-5 relative z-20">
        {question}
      </h2>

      {/* Option Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-200/80 text-red-900 font-semibold text-center shadow-lg animate-bounce-in border border-red-400">
          {error}
        </div>
      )}

      {userVoted && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-green-200/80 text-green-900 font-semibold text-center shadow-lg animate-bounce-in border border-green-400">
          You have already voted in this poll.
        </div>
      )}

      {/* Option */}
      <ul className="list-none pl-2 space-y-3 relative z-20 text-lg">
        {options?.map((option, optionIndex) => (
          <li key={option._id}>
            <Button
              onClick={() => handleOptionVote(optionIndex)}
              disabled={isExpired}
              className='bg-white text-purple-700 w-full text-left px-5 py-2 rounded-xl hover:bg-gray-700 font-semibold'>
              {option.text}
            </Button>
          </li>
        ))}
      </ul>

      {/* Spacer to push footer down */}
      <div className="flex-grow" />

      {/* Author + Time */}
      {showPollBtn && (
        <div className="text-sm text-gray-200 flex justify-between pt-4 border-t border-fuchsia-300/30 mt-4 relative z-20">
          <span>By {createdBy.fullName}</span>
          <span>Published: {timepublished}</span>
        </div>
      )}

      {/* Poll Page */}
      {!showPollBtn && (
        <div className="text-md text-gray-200 flex justify-between pt-4 border-t border-fuchsia-300/30 mt-4 relative z-20">
          <span>Created By: {createdBy.fullName}</span>
          <span className='flex flex-col'>
            <span>Published: <b>{timepublished}</b></span>
            <span>Voting Ends: <b>{expiredTime}</b></span>
          </span>
        </div>
      )}

      {/* Action Buttons (Dashboard Only) */}
      <div className="mt-5 flex gap-2 z-20 relative">
        {showPollBtn && (
          <Link
            to={`/poll/${_id}`}
            className={`${showDelete ? 'w-1/2' : 'w-full'
              } bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-medium text-center`}> See Poll </Link>
        )}

        {showDelete && (
          <Button
            onClick={onDelete}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-medium"> Delete </Button>
        )}
      </div>
    </div>
  )
}

export default PollCard
