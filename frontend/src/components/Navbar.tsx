import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContextConvex';
import { cn } from '../utils/cn';

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

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getUserInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-effect border-b border-purple-electric/30 neon-glow py-3 sm:py-4' : 'bg-purple-midnight/95 backdrop-blur-md py-4 sm:py-6'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group touch-target">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 relative">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain brightness-0 invert"
                style={{ filter: 'drop-shadow(0 0 8px rgba(157, 80, 255, 0.6))' }}
                onError={(e) => {
                  const parent = e.currentTarget.parentElement!;
                  parent.innerHTML = '<span class="text-purple-electric font-bold text-lg sm:text-xl font-display neon-glow px-2 py-1 rounded">OT</span>';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-display text-silver tracking-tight">
                Offisho <span className="electric-gradient-text">Transport</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-silver hover:text-purple-electric font-medium transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 electric-gradient group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/cars" className="text-silver hover:text-purple-electric font-medium transition-colors relative group">
              Cars
              <span className="absolute bottom-0 left-0 w-0 h-0.5 electric-gradient group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="text-silver hover:text-purple-electric font-medium transition-colors relative group">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 electric-gradient group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-silver hover:text-purple-electric font-medium transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 electric-gradient group-hover:w-full transition-all duration-300"></span>
            </Link>

            <div className="h-6 w-px bg-purple-electric/30 mx-2"></div>

            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="touch-target text-silver hover:text-purple-electric transition-colors p-2"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Auth section */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="touch-target flex items-center gap-2 pl-2 pr-3 sm:pr-4 py-2 rounded-full bg-purple-card hover:bg-purple-card/80 active:bg-purple-card border border-purple-electric/30 transition-all neon-border">
                  <div className="w-8 h-8 rounded-full electric-gradient flex items-center justify-center text-white font-bold text-sm neon-glow">
                    {getUserInitials(user?.name)}
                  </div>
                  <span className="text-sm font-medium text-silver hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4 text-purple-electric" />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right neon-border">
                  <div className="p-2 space-y-1">
                    {isAdmin && (
                      <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-silver hover:bg-purple-card hover:text-purple-electric rounded-lg transition-colors">
                        <Shield className="w-4 h-4" />
                        Admin Portal
                      </Link>
                    )}
                    <Link to="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-silver hover:bg-purple-card hover:text-purple-electric rounded-lg transition-colors">
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
              <div className="flex items-center gap-2 sm:gap-4">
                <Link to="/login" className="touch-target text-silver hover:text-purple-electric font-medium transition-colors px-3 sm:px-4 py-2">Login</Link>
                <Link
                  to="/booking"
                  className="touch-target px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg electric-gradient hover:opacity-90 active:opacity-80 text-white font-semibold shadow-lg neon-glow transition-all hover:scale-105 active:scale-95 text-sm sm:text-base"
                >
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden touch-target text-silver hover:bg-purple-card active:bg-purple-card/80 rounded-lg transition-colors p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
              className="lg:hidden glass-effect border-t border-purple-electric/30 overflow-hidden bg-purple-midnight/95"
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

                <div className="space-y-1">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="touch-target block px-4 py-3 rounded-lg hover:bg-purple-card active:bg-purple-card/80 text-silver font-medium transition-colors">Home</Link>
                  <Link to="/cars" onClick={() => setIsMenuOpen(false)} className="touch-target block px-4 py-3 rounded-lg hover:bg-purple-card active:bg-purple-card/80 text-silver font-medium transition-colors">Cars</Link>
                  <Link to="/about" onClick={() => setIsMenuOpen(false)} className="touch-target block px-4 py-3 rounded-lg hover:bg-purple-card active:bg-purple-card/80 text-silver font-medium transition-colors">About Us</Link>
                  <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="touch-target block px-4 py-3 rounded-lg hover:bg-purple-card active:bg-purple-card/80 text-silver font-medium transition-colors">Contact</Link>
                </div>

                <div className="pt-4 border-t border-white/10">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                          {getUserInitials(user?.name)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user?.name}</p>
                          <p className="text-white/50 text-xs">{user?.email}</p>
                        </div>
                      </div>
                      {isAdmin && (
                        <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="touch-target block px-4 py-3 text-purple-electric hover:bg-purple-card rounded-lg transition-colors">Admin Portal</Link>
                      )}
                      <button onClick={handleLogout} className="touch-target block w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">Logout</button>
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
