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
    <div className="min-h-screen flex pt-20 bg-background">
      {/* Left Section - Informational */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface text-white p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 z-0" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <span className="text-primary font-semibold tracking-wider text-sm uppercase mb-4 block">
            Book Your Ride
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to Make Your Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">Unforgettable?</span>
          </h1>
          <p className="text-lg mb-10 text-slate-300 leading-relaxed">
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
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-slate-200">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Section - Booking Form */}
      <div className="w-full lg:w-1/2 bg-card p-8 lg:p-16 flex items-center justify-center border-l border-white/5">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <div className="mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-white mb-2">Book Your Ride</h1>
            <p className="text-slate-400">Fill in the details below to request a booking.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Select Vehicle */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <CarIcon className="w-4 h-4 text-primary" />
                Select Vehicle
              </label>
              <select
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
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
                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [color-scheme:dark]"
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
                  <div className="px-4 py-3 bg-background border border-white/10 rounded-xl text-white text-center peer-checked:border-primary peer-checked:bg-primary/20 transition-all hover:bg-white/5">
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
                  <div className="px-4 py-3 bg-background border border-white/10 rounded-xl text-white text-center peer-checked:border-primary peer-checked:bg-primary/20 transition-all hover:bg-white/5">
                    Without Driver (Self Drive)
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Additional Details
              </label>
              <textarea
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your event and any special requirements..."
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
            >
              Submit Booking Request
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
