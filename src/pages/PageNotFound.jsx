import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const PageNotFound = () => {
  return (
    <section className="min-h-[70vh] bg-gradient-to-r from-purple-700 to-blue-600 flex items-center justify-center px-6">
      <div className="text-center text-white max-w-lg space-y-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold">404</h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Page Not Found</h2>
        <p className="text-gray-200 text-sm sm:text-base">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition"
        >
          <AiOutlineArrowLeft size={18} /> Go back home
        </Link>
      </div>
    </section>
  )
}

export default PageNotFound
