import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-navy-blue text-white fixed w-full top-0 z-50 shadow-xl backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-sky-blue rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-navy-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-sky-blue leading-tight">Offisho</span>
              <span className="text-sm font-medium text-gray-300 leading-tight">Transport</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <Link
              to="/"
              className="px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium text-sm xl:text-base"
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium text-sm xl:text-base"
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium text-sm xl:text-base"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium text-sm xl:text-base"
            >
              Contact
            </Link>

            {/* Search Bar - Hidden on smaller screens */}
            <form onSubmit={handleSearch} className="hidden xl:flex items-center ml-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent w-48 2xl:w-64 transition-all duration-300"
                />
                <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="ml-2 bg-sky-blue px-4 xl:px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm xl:text-base"
              >
                Search
              </button>
            </form>

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="relative group ml-2 xl:ml-4">
                <button className="flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 transition-all duration-300">
                  <div className="w-7 h-7 xl:w-8 xl:h-8 bg-sky-blue rounded-full flex items-center justify-center">
                    <span className="text-navy-blue font-semibold text-xs xl:text-sm">{user?.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="font-medium text-sm xl:text-base hidden 2xl:inline">{user?.name}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-gray-800 hover:bg-sky-blue hover:bg-opacity-10 hover:text-navy-blue transition-colors duration-200 font-medium"
                    >
                      Admin Portal
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 xl:space-x-3 ml-2 xl:ml-4">
                <Link
                  to="/login"
                  className="px-3 xl:px-4 py-2 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium text-sm xl:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-sky-blue px-4 xl:px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm xl:text-base"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white border-opacity-20"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4 px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white bg-opacity-10 backdrop-blur-sm text-white placeholder-gray-300 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            <div className="space-y-1">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/cars"
                className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Portal
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-10 text-gray-200 hover:text-red-300 transition-all duration-300 font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-3 rounded-lg hover:bg-sky-blue hover:bg-opacity-10 text-gray-200 hover:text-sky-blue transition-all duration-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-3 rounded-lg bg-sky-blue bg-opacity-20 hover:bg-opacity-30 text-white transition-all duration-300 font-semibold mx-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
