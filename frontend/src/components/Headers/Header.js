import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-sky-600">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="sr-only">SkillSwap</span>
              <h1 className="text-3xl font-bold text-sky-600" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Skill<span className="text-sky-700">Swap</span>
              </h1>
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link to="/skills" className="text-base font-medium text-gray-700 hover:text-sky-600 transition-colors duration-300">
                Explore Skills
              </Link>
              <Link to="/about" className="text-base font-medium text-gray-700 hover:text-sky-600 transition-colors duration-300">
                About Us
              </Link>
            </div>
          </div>
          <div className="ml-10 flex items-center space-x-4">
            <Link
              to="/login"
              className="inline-block bg-sky-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-sky-700 transition-colors duration-300"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="hidden sm:inline-block bg-white py-2 px-4 border border-sky-600 rounded-md text-base font-medium text-sky-600 hover:bg-sky-50 transition-colors duration-300"
            >
              Sign up
            </Link>
            <button
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/skills" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-colors duration-300">
                Explore Skills
              </Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-sky-600 hover:bg-sky-50 transition-colors duration-300">
                About Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;