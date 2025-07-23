import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../index.js';
import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* Brand */}
        <section className="space-y-2">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
          <div>
            <h2 className="text-white font-bold text-lg">Quick Poll</h2>
            <p className="italic text-sm text-gray-400">Ask. Vote. Decide.</p>
          </div>
        </section>

        {/* Links */}
        <nav className="space-y-1">
          <h4 className="text-white font-semibold mb-2">Links</h4>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/explore" className="hover:text-white">Explore</Link></li>
          </ul>
        </nav>

        {/* Legal Section */}
        <section className="space-y-1">
          <h4 className="text-white font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-white">License</Link></li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="space-y-1">
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <ul className="space-y-1">
            <li><Link to="#" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-white">Support</Link></li>
            <li><Link to="#" className="hover:text-white">FAQs</Link></li>
          </ul>
        </section>

        {/* Socials Section */}
        <section className="space-y-1">
          <h4 className="text-white font-semibold mb-2">Follow Us</h4>
          <ul className="space-y-1">
            <li>
              <Link to="#" className="flex items-center gap-2 hover:text-white">
                <FaInstagram className="w-4 h-4" />
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 hover:text-white">
                <FaTwitter className="w-4 h-4" />
                <span>Twitter</span>
              </Link>
            </li>
            <li>
              <Link to="#" className="flex items-center gap-2 hover:text-white">
                <FaGithub className="w-4 h-4" />
                <span>Github</span>
              </Link>
            </li>
          </ul>
        </section>

      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 px-4">
        © 2025 <span className="text-white font-medium">Quick Poll</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
