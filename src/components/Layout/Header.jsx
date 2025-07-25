import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Logo, Button} from "../index.js"
import { FaRegSmile } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Header = () => {

  const userStatus = useSelector((state) => state.auth.isLoggedIn)
  const navigate = useNavigate();

  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Explore",
      slug: "/explore",
      active: true
    },
    {
      name: "Contact Us",
      slug: "/contact-us",
      active: true
    },
  ]

  const authLinks = [
    {
      name: "Login",
      slug: "/login",
      active: !userStatus
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !userStatus
    },
    {
      name: "Dashboard",
      slug: "/dashboard",
      active: userStatus
    },
    {
      name: "Profile",
      slug: "/profile",
      active: userStatus,
      icon: <FaRegSmile className='text-white text-xl'/>
      
    },
    {
      name: "Logout",
      slug: "/logout",
      active: userStatus
    }
  ]

  

  return (
    <header className="bg-gradient-to-r from-purple-700 to-blue-600 shadow-md text-white border-b border-purple-500/40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo Section */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex gap-4 items-center">
          {navLinks.map((link) => (
            link.active && (
              <NavLink
                key={link.name}
                to={link.slug}
                className={({ isActive }) =>
                  `transition duration-200 px-3 py-1 rounded-md
                  ${isActive ? "text-white font-bold underline underline-offset-4" : "hover:text-white"}`
                }
              >
                {link.name}
              </NavLink>
            )
          ))}
        </nav>

        {/* Auth Links */}
        <div className="flex gap-3 items-center">
          {authLinks.map((link) =>
            link.active && (
              <Button
                key={link.name}
                onClick={() => navigate(link.slug)}
                className={`px-4 py-2 rounded-2xl transition font-semibold
                  ${
                    link.name === "Login" || link.name === "Sign Up"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : link.name === "Logout"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-sky-500 hover:bg-sky-600 text-white"
                  }`}
              >
                {link.icon? link.icon: link.name}
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  )
}

export default Header