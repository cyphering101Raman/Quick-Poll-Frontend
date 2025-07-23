import React from 'react'
import { Button } from './index.js'

const PollCard = ({
  question,
  options,
  timePosted,
  author
}) => {
  return (
    <div className="bg-gradient-to-br from-teal-500 via-indigo-600 to-pink-600 text-black rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto transition flex flex-col justify-between">

  {/* Poll Question */}
  <h2 className="text-2xl font-semibold mb-5">
    {question}
  </h2>

  {/* Options */}
  <ul className="list-none pl-2 space-y-3">
    {options?.map((option, idx) => (
      <li key={idx}>
        <Button className='bg-white text-fuchsia-700 w-full text-left px-5 py-2 rounded-xl hover:bg-gray-700 font-semibold'>
          {option}
        </Button>
      </li>
    ))}
  </ul>

  {/* Spacer to push footer down */}
  <div className="flex-grow" />

  {/* Author + Time */}
  <div className="text-sm text-gray-200 flex justify-between pt-4 border-t border-fuchsia-300/30 mt-4">
    <span>By {author}</span>
    <span>{timePosted}</span>
  </div>
</div>

  )
}

export default PollCard
