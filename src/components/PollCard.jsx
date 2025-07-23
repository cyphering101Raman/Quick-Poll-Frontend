import React from 'react'
import { Button } from './index.js'

const PollCard = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-fuchsia-500 text-white rounded-2xl shadow-xl p-6 w-full max-w-xl mx-auto space-y-4 transition">

      <h2 className="text-2xl font-semibold">
        What’s your favorite programming language?
      </h2>

      <ul className="list-disc pl-5 space-y-1">
        <li>JavaScript</li>
        <li>Python</li>
        <li>C++</li>
        <li>Java</li>
      </ul>

      <div className="pt-2">
        <Button className="bg-white text-fuchsia-600 hover:bg-gray-100 px-5 py-2.5 rounded-xl font-semibold">
          Vote Now
        </Button>
      </div>
    </div>
  )
}

export default PollCard
