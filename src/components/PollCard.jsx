import React from 'react'
import { Button } from './index.js'

const PollCard = ({
  question,
  options,
  timePosted,
  author
}) => {
  const timepublished = new Date(timePosted).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const expiredTime = new Date(timePosted).getTime() + 24*60*60*1000;
  const currentTime = new Date().getTime();
  

  const isExpired = expiredTime < currentTime;

  return (
    <div className="relative group bg-gradient-to-br from-teal-500 via-indigo-600 to-pink-600 text-black rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto transition flex flex-col justify-between overflow-hidden">

      {/* === EXPIRED Watermark === */}
      {isExpired && (
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] text-6xl font-extrabold text-gray-700 opacity-50 group-hover:text-red-500 group-hover:opacity-90 transition-all duration-300 select-none z-[80]">
          EXPIRED
        </div>
      )}

      {/* Poll Question */}
      <h2 className="text-2xl font-semibold mb-5 relative z-20">
        {question}
      </h2>

      {/* Options */}
      <ul className="list-none pl-2 space-y-3 relative z-20">
        {options?.map((option, idx) => (
          <li key={idx}>
            <Button className='bg-white text-fuchsia-700 w-full text-left px-5 py-2 rounded-xl hover:bg-gray-700 font-semibold'>
              {option.text}
            </Button>
          </li>
        ))}
      </ul>

      {/* Spacer to push footer down */}
      <div className="flex-grow" />

      {/* Author + Time */}
      <div className="text-sm text-gray-200 flex justify-between pt-4 border-t border-fuchsia-300/30 mt-4 relative z-20">
        <span>By {author}</span>
        <span>{timepublished}</span>
      </div>
    </div>
  )
}

export default PollCard
