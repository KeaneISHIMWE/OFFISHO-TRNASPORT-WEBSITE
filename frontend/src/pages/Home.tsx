import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { carsAPI } from '../services/api';
import { Car } from '../types';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    loadFeaturedCars();
  }, []);

  const loadFeaturedCars = async () => {
    try {
      const response = await carsAPI.getCars({ availability: 'available' });
      setFeaturedCars(response.cars.slice(0, 3));
    } catch (error) {
      console.error('Error loading featured cars:', error);
    }
  };

  const testimonials = [
    {
      name: 'A. Mukamana',
      location: 'Kigali',
      event: 'Wedding',
      comment: 'Seamless service for our wedding day! The luxury sedan was immaculate and our driver was professional and punctual.',
      rating: 5,
    },
    {
      name: 'J. Nkurunziza',
      location: 'Musanze',
      event: 'Corporate Event',
      comment: 'Reliable transportation for our corporate function. Highly professional service that impressed our international guests.',
      rating: 5,
    },
    {
      name: 'R. Uwimana',
      location: 'Huye',
      event: 'Tour',
      comment: 'Exceptional experience touring Rwanda in style. The premium SUV was perfect for our family trip. Highly recommended!',
      rating: 5,
    },
  ];

  const services = [
    {
      name: 'Weddings',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Elegant wedding transport with professional drivers and luxury vehicles.',
      benefits: ['Arrive on time, stress-free', 'Professional chauffeurs'],
    },
    {
      name: 'Corporate Functions',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Impress clients with premium corporate transportation.',
      benefits: ['WiFi-enabled vehicles', 'Always on time'],
    },
    {
      name: 'Tours',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description: 'Explore Rwanda in comfort with our luxury tour vehicles.',
      benefits: ['Best routes & hidden gems', 'Experienced drivers'],
    },
  ];

  const whyChooseUs = [
    {
      title: 'Professional Drivers',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Experienced, licensed, and courteous drivers who prioritize your safety and comfort.',
    },
    {
      title: 'Luxury Fleet',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      description: 'Premium vehicles maintained to the highest standards. Clean, comfortable, and reliable.',
    },
    {
      title: 'On-Time Guarantee',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'We guarantee punctual arrival. Your event starts on time, every time.',
    },
    {
      title: 'Flexible Booking',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Book with or without a driver. Customize your experience to fit your needs.',
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Improved */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-20" style={{ backgroundColor: '#001F3F' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)',
            filter: 'blur(2px) brightness(0.4)',
          }}
        ></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-12 sm:py-16 lg:py-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm" style={{ color: '#87CEEB' }}>
              Premium Event Car Rentals
            </span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight px-2" style={{ color: '#FFFFFF' }}>
            <span className="block">Arrive in Style at</span>
            <span className="block">Every Event</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed px-4" style={{ color: '#FFFFFF' }}>
            Arrive relaxed, on time, and in style
          </p>
          <p className="text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed px-4" style={{ color: '#D1D5DB' }}>
            — with professional drivers and premium vehicles you can trust. Serving Kigali & across Rwanda.
          </p>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#87CEEB' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm" style={{ color: '#FFFFFF' }}>Trusted by 100+ clients</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#87CEEB' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm" style={{ color: '#FFFFFF' }}>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: '#87CEEB' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm" style={{ color: '#FFFFFF' }}>Professional Drivers</span>
            </div>
          </div>
          
          {/* Improved CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link
              to="/booking"
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB6D6';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(135, 206, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#87CEEB';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Book Your Ride Today
            </Link>
            <Link
              to="/cars"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white rounded-lg font-bold text-base sm:text-lg hover:bg-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              style={{ color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#001F3F';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Our Fleet
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us Section - New */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#001F3F' }}>
              Why Choose Offisho Transport
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#87CEEB' }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#001F3F' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section - Improved with 2-column layout */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#001F3F' }}>
                About Offisho Transport
              </h2>
              <p className="text-lg mb-6" style={{ color: '#87CEEB' }}>
                Reliable luxury transport for every occasion in Rwanda
              </p>
              <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#87CEEB' }}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>
                  We specialize in providing premium vehicles for all your special occasions. Whether you're planning a wedding, corporate event, or a luxury tour, we have the perfect car for you.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    'Luxury sedans, SUVs, convertibles, and vans',
                    'Maintained to the highest standards',
                    'Rent with or without a professional driver',
                    'Serving Kigali and across Rwanda',
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#87CEEB' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base" style={{ color: '#4B5563' }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#6BB6D6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#87CEEB';
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Request a Quote
                </Link>
              </div>
              <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
                  alt="Luxury car"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section - Improved */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold" style={{ color: '#87CEEB' }}>
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4" style={{ color: '#001F3F' }}>
              Perfect for Every Event
            </h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#87CEEB' }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={service.name}
                to="/cars"
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl text-left border-2 border-transparent transition-all duration-300"
                  style={{ borderColor: 'transparent' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#87CEEB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transform group-hover:scale-110 transition-all duration-300" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#001F3F' }}>{service.name}</h3>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: '#6B7280' }}>
                    {service.description}
                  </p>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs font-medium flex items-center gap-1" style={{ color: '#87CEEB' }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview Section - With actual cars */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold" style={{ color: '#87CEEB' }}>
              Our Fleet
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4" style={{ color: '#001F3F' }}>
              Premium Vehicles for Every Occasion
            </h2>
            <p className="text-base max-w-2xl mx-auto mb-2" style={{ color: '#6B7280' }}>
              Starting from $250/day. Prices vary by event & duration.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>Fully Insured</span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>Clean & Maintained</span>
              <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>Professional Drivers</span>
            </div>
          </motion.div>
          
          {featuredCars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
              {featuredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.name} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                      {car.car_type === 'suv' ? 'Premium SUV' : car.car_type === 'luxury' || car.car_type === 'sedan' ? 'Luxury Sedan' : 'Ultra Luxury'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#001F3F' }}>
                      {car.name} {car.model}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#6B7280' }}>
                      <span>4 Seats</span>
                      <span>Auto</span>
                      <span>Petrol</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-2xl font-bold" style={{ color: '#001F3F' }}>
                          {formatPrice(car.rental_price_per_day)}
                          <span className="text-sm font-normal" style={{ color: '#6B7280' }}>/day</span>
                        </p>
                      </div>
                      <Link
                        to={`/cars/${car.id}?action=rent`}
                        className="px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        style={{ backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-base mb-6" style={{ color: '#6B7280' }}>Loading our premium fleet...</p>
            </div>
          )}
          
          <div className="text-center">
            <Link
              to="/cars"
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB6D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#87CEEB';
              }}
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section - Complete */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#001F3F' }}>
              How It Works
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#87CEEB' }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {[
              {
                step: '1',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Choose Your Vehicle',
                description: 'Browse our premium fleet and select the perfect car for your event.',
              },
              {
                step: '2',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Book Online',
                description: 'Send a request in minutes. We\'ll confirm within 24 hours.',
              },
              {
                step: '3',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                ),
                title: 'Enjoy Your Ride',
                description: 'Arrive in comfort and style with our professional drivers.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="relative text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#001F3F' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/booking"
              className="inline-block px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB6D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#87CEEB';
              }}
            >
              Book Your Ride
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider font-semibold" style={{ color: '#87CEEB' }}>
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4" style={{ color: '#001F3F' }}>
              What Our Customers Say
            </h2>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
              Trusted by 100+ clients across Rwanda
            </p>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#87CEEB' }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 mr-3" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base mb-1" style={{ color: '#001F3F' }}>{testimonial.name}</h4>
                    <p className="text-xs mb-1" style={{ color: '#87CEEB' }}>{testimonial.location}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>{testimonial.event}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" style={{ color: '#FBBF24' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs ml-2" style={{ color: '#6B7280' }}>Google Review</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#4B5563' }}>
                  "{testimonial.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - New */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#001F3F' }}>
              Get In Touch
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#87CEEB' }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: 'Location',
                content: 'Musanze, Rwanda',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                title: 'Phone',
                content: '+250 785 344 214',
                link: 'tel:+250785344214',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Email',
                content: 'offishotransport@gmail.com',
                link: 'mailto:offishotransport@gmail.com',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border-2 border-gray-100 hover:border-sky-blue transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#001F3F' }}>{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-base hover:underline"
                    style={{ color: '#6B7280' }}
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-base" style={{ color: '#6B7280' }}>{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Improved */}
      <section className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: '#001F3F' }}>
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl mb-2 leading-relaxed" style={{ color: '#D1D5DB' }}>
              Browse our premium fleet and find the perfect vehicle for your special event
            </p>
            <p className="text-sm mb-8" style={{ color: '#87CEEB' }}>
              Available 24/7 • Fast booking & reliable drivers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Link
                to="/booking"
                className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6BB6D6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#87CEEB';
                }}
              >
                Book a Car
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white rounded-lg font-bold text-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
                style={{ color: '#FFFFFF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#001F3F';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
              >
                Contact Us
              </Link>
            </div>
            <a
              href="https://wa.me/250785344214"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: '#25D366', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20BA5A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#25D366';
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp: +250 785 344 214
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
