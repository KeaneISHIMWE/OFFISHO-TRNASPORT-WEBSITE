import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { carsAPI } from '../services/api';
import { Car } from '../types';
import { User, Mail, Phone, Car as CarIcon, Calendar, CalendarDays, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [transactionType, setTransactionType] = useState<'rent' | 'buy'>('rent');
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    vehicle: '',
    eventType: '',
    eventDate: '',
    withDriver: false, // Default to false (Self Drive)
    additionalDetails: '',
  });

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    try {
      const response = await carsAPI.getCars({ availability: 'available' });
      setCars(response.cars);
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'withDriver') {
      setFormData({
        ...formData,
        withDriver: e.target.value === 'yes',
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking submitted:', formData);
    navigate('/cars', { state: { message: 'Booking request submitted successfully!' } });
  };

  // Parallax scroll effect state
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lazy load background image
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const [bgImageError, setBgImageError] = useState(false);
  // Using multiple fallback URLs for reliability - dark luxury car
  const bgImageUrls = [
    process.env.REACT_APP_HERO_CAR_IMAGE,
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&w=1920&q=80',
  ].filter(Boolean);
  
  const bgImageUrl = bgImageUrls[0] || '';

  React.useEffect(() => {
    if (!bgImageUrl) {
      console.warn('No background image URL provided');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed
    img.src = bgImageUrl;
    
    // Log for debugging
    console.log('🖼️ Loading hero background image:', bgImageUrl);
    
    img.onload = () => {
      console.log('✅ Hero background image loaded successfully');
      setBgImageLoaded(true);
      setBgImageError(false);
    };
    img.onerror = (error) => {
      console.error('❌ Failed to load hero background image:', bgImageUrl, error);
      setBgImageError(true);
      setBgImageLoaded(false);
    };

    // Timeout fallback - if image takes too long, show error
    const timeout = setTimeout(() => {
      if (!bgImageLoaded) {
        console.warn('⏱️ Image loading timeout');
      }
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [bgImageUrl]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 relative overflow-hidden">
      {/* Hero Section with Car Background */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: bgImageLoaded && !bgImageError && bgImageUrl ? `url("${bgImageUrl}")` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: bgImageLoaded ? 'opacity 0.8s ease-in, transform 0.1s ease-out' : 'none',
            opacity: bgImageLoaded ? 1 : 0,
            minHeight: '100vh',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        >
          {/* Loading placeholder */}
          {!bgImageLoaded && !bgImageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-midnight via-purple-card to-purple-midnight animate-pulse" />
          )}
          {/* Fallback if image fails to load */}
          {bgImageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-midnight via-purple-card to-purple-midnight">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-silver/50">
                  <CarIcon className="w-24 h-24 mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Car image unavailable</p>
                  <p className="text-xs mt-2">Check console for details</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Radial Gradient Overlay (Scrim) - Very light to show car clearly */}
        <div 
          className="absolute inset-0 z-10 hidden lg:block"
          style={{
            background: `
              radial-gradient(ellipse at left center, rgba(10, 1, 24, 0.4) 0%, rgba(10, 1, 24, 0.2) 40%, transparent 70%),
              radial-gradient(ellipse at right center, rgba(157, 80, 255, 0.08) 0%, rgba(110, 0, 255, 0.03) 50%, transparent 80%)
            `,
          }}
        />

        {/* Additional Scrim for Text Readability - Very light */}
        <div 
          className="absolute inset-0 z-10 hidden lg:block"
          style={{
            background: 'linear-gradient(to right, rgba(10, 1, 24, 0.35) 0%, rgba(10, 1, 24, 0.15) 50%, transparent 100%)',
          }}
        />

        {/* Mobile: Lighter gradient overlay to show car */}
        <div className="absolute inset-0 z-10 lg:hidden bg-gradient-to-b from-purple-midnight/70 via-purple-midnight/60 to-purple-midnight/70" />

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
            {/* Left Section - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full border border-purple-electric/30 bg-purple-card/50 text-purple-electric font-medium text-sm mb-6 glass-effect neon-border"
              >
                Book Your Ride
              </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-silver leading-tight">
                Ready to Make Your Event <span className="electric-gradient-text">Unforgettable?</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-silver/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Fill out the form and our team will get back to you within 24 hours with availability and a personalized quote.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                {[
                  'Professional and courteous drivers',
                  'Flexible pickup and drop-off locations',
                  '24/7 customer support',
                  'Competitive pricing with no hidden fees',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 justify-center lg:justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-electric/20 flex items-center justify-center text-purple-electric neon-border flex-shrink-0">
                      <Check className="w-5 h-5 neon-glow" />
                    </div>
                    <span className="text-silver/90 text-base">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Section - Glassmorphic Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div 
                className={cn(
                  "w-full glass-effect p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl border transition-all duration-500",
                  transactionType === 'buy' 
                    ? "border-purple-glow/30 shadow-[0_8px_32px_0_rgba(157,80,255,0.25)]" 
                    : "border-purple-electric/30 shadow-[0_8px_32px_0_rgba(157,80,255,0.2)]"
                )}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  backgroundColor: 'rgba(22, 11, 46, 0.6)',
                  borderWidth: '1px',
                }}
              >
                <div className="w-full max-w-lg mx-auto">
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-silver mb-2">Book Your Ride</h2>
                    <p className="text-sm sm:text-base text-silver/70">Fill in the details below to request a booking.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Transaction Type Toggle */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 sm:mb-3">Transaction Type</label>
              <div className="flex gap-2 sm:gap-3 p-1 glass-card rounded-xl neon-border">
                <button
                  type="button"
                  onClick={() => setTransactionType('rent')}
                  className={cn(
                    "touch-target flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 active:scale-95",
                    transactionType === 'rent'
                      ? "electric-gradient text-white neon-glow shadow-lg"
                      : "text-silver/60 hover:text-silver active:bg-purple-card/50"
                  )}
                >
                  Rent
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('buy')}
                  className={cn(
                    "touch-target flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 active:scale-95",
                    transactionType === 'buy'
                      ? "bg-gradient-to-r from-purple-glow to-purple-electric text-white neon-glow shadow-lg"
                      : "text-silver/60 hover:text-silver active:bg-purple-card/50"
                  )}
                >
                  Buy
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-electric" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver placeholder:text-silver/50 focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-electric" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver placeholder:text-silver/50 focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-electric" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver placeholder:text-silver/50 focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow"
                required
              />
            </div>

            {/* Select Vehicle */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                <CarIcon className="w-4 h-4 text-purple-electric" />
                Select Vehicle
              </label>
              <div className="nebula-select-container">
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="nebula-select"
                  required
                >
                  <option value="">Choose a car</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} {car.model}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Type & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-electric" />
                  Event Type
                </label>
                <div className="nebula-select-container">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="nebula-select"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="tour">Tour</option>
                    <option value="party">Party</option>
                    <option value="graduation">Prom & Graduation</option>
                    <option value="birthday">Birthday Celebration</option>
                    <option value="vip">VIP Service</option>
                  </select>
                </div>
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-purple-electric" />
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver placeholder:text-silver/50 focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            {/* Driver Preference Toggle */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-electric" />
                Driver Preference
              </label>
              <div className="flex gap-4">
                {/* With Driver Option */}
                <label className="flex-1 cursor-pointer touch-target">
                  <input
                    type="radio"
                    name="withDriver"
                    value="yes"
                    checked={formData.withDriver === true}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={cn(
                    "px-4 py-4 rounded-xl text-center transition-all duration-300 relative overflow-hidden border-2 min-h-[80px] flex flex-col items-center justify-center",
                    formData.withDriver
                      ? "bg-purple-electric/20 border-purple-electric text-silver neon-glow shadow-lg shadow-purple-electric/20"
                      : "bg-purple-card/50 border-purple-electric/20 text-silver/70 hover:bg-purple-card/70 hover:border-purple-electric/40"
                  )}>
                    <div className="relative z-10 w-full">
                      <div className="font-semibold mb-1">With Driver</div>
                      <div className={cn(
                        "text-xs mt-1",
                        formData.withDriver ? "text-purple-electric font-medium" : "text-silver/60"
                      )}>
                        +10,000 FRW
                      </div>
                      {formData.withDriver && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-electric neon-glow animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </label>

                {/* Without Driver Option */}
                <label className="flex-1 cursor-pointer touch-target">
                  <input
                    type="radio"
                    name="withDriver"
                    value="no"
                    checked={formData.withDriver === false}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div className={cn(
                    "px-4 py-4 rounded-xl text-center transition-all duration-300 relative overflow-hidden border-2 min-h-[80px] flex flex-col items-center justify-center",
                    !formData.withDriver
                      ? "bg-purple-electric/20 border-purple-electric text-silver neon-glow shadow-lg shadow-purple-electric/20"
                      : "bg-purple-card/50 border-purple-electric/20 text-silver/70 hover:bg-purple-card/70 hover:border-purple-electric/40"
                  )}>
                    <div className="relative z-10 w-full">
                      <div className="font-semibold mb-1">Self Drive</div>
                      <div className={cn(
                        "text-xs mt-1",
                        !formData.withDriver ? "text-purple-electric font-medium" : "text-silver/60"
                      )}>
                        No driver
                      </div>
                      {!formData.withDriver && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-electric neon-glow animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-electric" />
                Additional Details
              </label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your event and any special requirements..."
                className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver placeholder:text-silver/50 focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all resize-none neon-border focus:neon-glow"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="touch-target w-full py-3 sm:py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base electric-gradient neon-glow hover:shadow-xl"
            >
              {transactionType === 'buy' ? 'Submit Purchase Request' : 'Submit Booking Request'}
              <ArrowRight className="w-5 h-5" />
            </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
