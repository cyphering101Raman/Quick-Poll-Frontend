import React from 'react'
import { PollCard } from './index.js'

const Explore = () => {
  const dummyPolls = [
    {
      id: 1,
      question: "What's your favorite programming language?",
      options: ["JavaScript", "Python", "C++", "Java", "React"],
      author: "Alice",
      timePosted: "2 hours ago",
    },
    {
      id: 2,
      question: "Dark mode or Light mode?",
      options: ["Dark", "Light"],
      author: "Bob",
      timePosted: "30 minutes ago",
    },
    {
      id: 3,
      question: "Which frontend framework do you prefer?",
      options: ["React", "Vue", "Angular", "Svelte"],
      author: "Charlie",
      timePosted: "1 day ago",
    },
    {
      id: 4,
      question: "Best way to manage state in React?",
      options: ["Redux", "Context API", "Recoil", "Zustand"],
      author: "DevMaster",
      timePosted: "3 days ago",
    },
    {
      id: 5,
      question: "Do you use TypeScript?",
      options: ["Always", "Sometimes", "Never"],
      author: "Eve",
      timePosted: "5 hours ago",
    }
  ]

  return (
    <section className="min-h-screen bg-gradient-to-br from-cyan-900 via-indigo-800 to-purple-700 py-12 px-4">

      {/* Explore Section Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Explore Polls</h1>
        <p className="text-gray-300 text-lg">See what's trending and cast your vote.</p>
      </div>

      {/* Poll Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 px-4">
        {dummyPolls.map((poll) => (
          <PollCard key={poll.id} {...poll} />
        ))}
      </div>
    </section>
  )
}

export default Explore
