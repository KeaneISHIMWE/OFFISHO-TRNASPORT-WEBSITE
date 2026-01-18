import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, User, LogOut, Shield } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming utils exists or I will just use clsx directly

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" onError={(e) => {
                // Fallback if image fails
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<span class="text-primary font-bold text-xl">OT</span>';
              }} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold font-sans text-white tracking-tight">
                Offisho<span className="text-primary">Transport</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-white/90 hover:text-primary font-medium transition-colors">Home</Link>
            <Link to="/cars" className="text-white/90 hover:text-primary font-medium transition-colors">Cars</Link>
            <Link to="/about" className="text-white/90 hover:text-primary font-medium transition-colors">About Us</Link>
            <Link to="/contact" className="text-white/90 hover:text-primary font-medium transition-colors">Contact</Link>

            <div className="h-6 w-px bg-white/20 mx-2"></div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white/90 hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth section */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-white/70" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-card border border-white/10 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="p-2 space-y-1">
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                        <Shield className="w-4 h-4" />
                        Admin Portal
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-white/80 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-white/90 hover:text-white font-medium transition-colors">Login</Link>
                <Link
                  to="/booking"
                  className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="hidden lg:block overflow-hidden"
            >
              <form onSubmit={handleSearch} className="py-4 flex justify-center">
                <div className="relative w-full max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search for luxury cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full bg-background/50 backdrop-blur-md border border-white/20 ttext-white placeholder:text-white/50 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-white/50" />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-3.5 hover:text-white text-white/50">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary/50"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-white/50" />
                </form>

                <div className="space-y-2">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium">Home</Link>
                  <Link to="/cars" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium">Cars</Link>
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium">About Us</Link>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-white/5 text-white font-medium">Contact</Link>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user?.name}</p>
                          <p className="text-white/50 text-xs">{user?.email}</p>
                        </div>
                      </div>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-primary hover:underline">Admin Portal</Link>
                      )}
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300">Logout</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-4 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 font-medium transition-colors">
                        Login
                      </Link>
                      <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 font-medium transition-colors shadow-lg shadow-primary/20">
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
