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
    <nav className="text-white fixed w-full top-0 z-50 shadow-xl" style={{ backgroundColor: '#001F3F' }}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#001F3F' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight" style={{ color: '#FFFFFF' }}>OFFISHO</span>
              <span className="text-xs font-medium leading-tight" style={{ color: '#FFFFFF' }}>TRANSPORT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              to="/"
              className="px-4 xl:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base hover:bg-white hover:bg-opacity-10 hover:scale-105"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#87CEEB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="px-4 xl:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base hover:bg-white hover:bg-opacity-10 hover:scale-105"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#87CEEB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Cars
            </Link>
            <Link
              to="/about"
              className="px-4 xl:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base hover:bg-white hover:bg-opacity-10 hover:scale-105"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#87CEEB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-4 xl:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base hover:bg-white hover:bg-opacity-10 hover:scale-105"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#87CEEB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              Contact
            </Link>

            {/* Book Now Button */}
            <Link
              to="/booking"
              className="px-6 xl:px-8 py-2.5 rounded-lg transition-all duration-300 font-semibold shadow-lg text-sm xl:text-base text-white ml-2 hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: '#87CEEB' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB6D6';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#87CEEB';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Book Now
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
                className="ml-3 px-5 xl:px-6 py-2.5 rounded-lg transition-all duration-300 font-semibold shadow-lg text-sm xl:text-base text-white hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: '#87CEEB' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6BB6D6';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#87CEEB';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
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
              <div className="flex items-center gap-4 xl:gap-6 ml-2 xl:ml-4">
                <Link
                  to="/login"
                  className="px-4 xl:px-5 py-2.5 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base hover:bg-white hover:bg-opacity-10 hover:scale-105"
                  style={{ color: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = '#87CEEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 xl:px-8 py-2.5 rounded-lg transition-all duration-300 font-semibold shadow-lg text-sm xl:text-base text-white hover:shadow-xl hover:scale-105"
                  style={{ backgroundColor: '#87CEEB' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6BB6D6';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
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

            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium mx-2"
                style={{ color: '#D1D5DB' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(135, 206, 235, 0.1)';
                  e.currentTarget.style.color = '#87CEEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/cars"
                className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium mx-2"
                style={{ color: '#D1D5DB' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(135, 206, 235, 0.1)';
                  e.currentTarget.style.color = '#87CEEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
              <Link
                to="/about"
                className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium mx-2"
                style={{ color: '#D1D5DB' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(135, 206, 235, 0.1)';
                  e.currentTarget.style.color = '#87CEEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium mx-2"
                style={{ color: '#D1D5DB' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(135, 206, 235, 0.1)';
                  e.currentTarget.style.color = '#87CEEB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/booking"
                className="block px-6 py-3 rounded-lg transition-all duration-300 font-semibold mx-2 text-center hover:scale-105"
                style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6BB6D6';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#87CEEB';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
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
                    className="block px-4 py-3 rounded-lg transition-all duration-300 font-medium mx-2"
                    style={{ color: '#D1D5DB' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(135, 206, 235, 0.1)';
                      e.currentTarget.style.color = '#87CEEB';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#D1D5DB';
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-6 py-3 rounded-lg transition-all duration-300 font-semibold mx-2 text-center hover:scale-105"
                    style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#6BB6D6';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#87CEEB';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
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
