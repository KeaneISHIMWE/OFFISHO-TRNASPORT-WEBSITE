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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row pt-20 sm:pt-24 bg-purple-midnight">
      {/* Left Section - Informational */}
      <div className="hidden lg:flex lg:w-1/2 bg-purple-card text-silver p-8 lg:p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-electric/10 z-0 global-illumination opacity-30" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <span className="text-purple-electric font-semibold tracking-wider text-sm uppercase mb-4 block neon-glow">
            Book Your Ride
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-silver leading-tight">
            Ready to Make Your Event <span className="electric-gradient-text">Unforgettable?</span>
          </h1>
          <p className="text-lg mb-10 text-silver/80 leading-relaxed">
            Fill out the form and our team will get back to you within 24 hours with availability and a personalized quote.
          </p>
          <div className="space-y-6">
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
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-purple-electric/20 flex items-center justify-center text-purple-electric neon-border">
                  <Check className="w-5 h-5 neon-glow" />
                </div>
                <span className="text-silver/90">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Section - Booking Form */}
      <div className={cn(
        "w-full lg:w-1/2 glass-card p-4 sm:p-6 md:p-8 lg:p-16 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-purple-electric/30 transition-all duration-500 neon-border",
        transactionType === 'buy' ? "border-t-purple-glow/30 lg:border-l-purple-glow/30" : "border-t-purple-electric/30 lg:border-l-purple-electric/30"
      )}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <div className="mb-6 sm:mb-8 lg:hidden">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-silver mb-2">Book Your Ride</h1>
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
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow [&>option]:bg-purple-card"
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

            {/* Event Type & Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-silver/80 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-electric" />
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver focus:outline-none focus:border-purple-electric focus:ring-1 focus:ring-purple-electric transition-all neon-border focus:neon-glow [&>option]:bg-purple-card"
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

            {/* With Driver Option */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Driver Preference
              </label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="withDriver"
                    value="yes"
                    checked={formData.withDriver === true}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className={cn(
                    "px-4 py-3 bg-background border border-white/10 rounded-xl text-white text-center transition-all hover:bg-white/5",
                    transactionType === 'buy'
                      ? "peer-checked:border-gold peer-checked:bg-gold/20"
                      : "peer-checked:border-primary peer-checked:bg-primary/20"
                  )}>
                    With Driver (+10,000 FRW)
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="withDriver"
                    value="no"
                    checked={formData.withDriver === false}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className={cn(
                    "px-4 py-3 bg-background border border-white/10 rounded-xl text-white text-center transition-all hover:bg-white/5",
                    transactionType === 'buy'
                      ? "peer-checked:border-gold peer-checked:bg-gold/20"
                      : "peer-checked:border-primary peer-checked:bg-primary/20"
                  )}>
                    Without Driver (Self Drive)
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
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
