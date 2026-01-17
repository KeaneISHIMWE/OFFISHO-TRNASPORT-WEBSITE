import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const testimonials = [
    {
      name: 'John Doe',
      event: 'Wedding',
      comment: 'Perfect service for our special day! The car was immaculate and the driver was professional.',
    },
    {
      name: 'Jane Smith',
      event: 'Corporate Event',
      comment: 'Excellent transportation for our corporate function. Highly recommended!',
    },
    {
      name: 'Robert Johnson',
      event: 'Tour',
      comment: 'Great experience touring Rwanda in style. The luxury SUV was perfect.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-20" style={{ backgroundColor: '#001F3F' }}>
        {/* Background Image Overlay - Blurred luxury car */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)',
            filter: 'blur(3px) brightness(0.3)',
          }}
        ></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-12 sm:py-16 lg:py-20"
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
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight px-2" style={{ color: '#FFFFFF' }}>
            <span className="block">Arrive in Style at</span>
            <span className="block">Every Event</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4" style={{ color: '#FFFFFF' }}>
            From weddings to corporate events, make a lasting impression with our premium fleet of luxury vehicles. Experience elegance, comfort, and reliability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              to="/booking"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
            >
              Book Your Ride
            </Link>
            <Link
              to="/cars"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white rounded-lg font-bold text-base sm:text-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
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
              View Our Fleet
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-sky-blue font-semibold text-xs sm:text-sm uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-blue mb-4 sm:mb-6 leading-tight px-4">
              Welcome to <span className="text-sky-blue">Offisho Transport</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-blue to-navy-blue mx-auto mb-6 sm:mb-8"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed px-4">
              We specialize in providing premium vehicles for all your special occasions. Whether
              you're planning a wedding, corporate event, or a luxury tour, we have the perfect car
              for you.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
              Our fleet includes luxury sedans, SUVs, convertibles, and vans, all maintained to
              the highest standards. With options to rent with or without a driver, we ensure your
              transportation needs are met with style and comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="text-sky-blue font-semibold text-xs sm:text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-blue mt-3 sm:mt-4 mb-3 sm:mb-4 px-4">
              Perfect for Every Event
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-blue to-navy-blue mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              { name: 'Weddings', icon: '💍', description: 'Make your special day unforgettable with our elegant wedding fleet.' },
              { name: 'Corporate Functions', icon: '💼', description: 'Professional transportation for business events and meetings.' },
              { name: 'Tours', icon: '🗺️', description: 'Explore Rwanda in comfort and style with our luxury tour vehicles.' }
            ].map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center border border-gray-100 transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-blue to-navy-blue rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <span className="text-3xl sm:text-4xl">{event.icon}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-navy-blue mb-2 sm:mb-3">{event.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <span className="text-sky-blue font-semibold text-xs sm:text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-blue mt-3 sm:mt-4 mb-3 sm:mb-4 px-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-blue to-navy-blue mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300"
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-sky-blue to-navy-blue rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg mr-3 sm:mr-4 shadow-lg flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-navy-blue text-base sm:text-lg truncate">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-sky-blue font-medium">{testimonial.event}</p>
                  </div>
                </div>
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-blue via-[#003366] to-navy-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(135, 206, 235, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(135, 206, 235, 0.2) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed">
              Browse our premium fleet and find the perfect vehicle for your special event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/cars"
                className="group relative px-10 py-4 bg-sky-blue text-navy-blue rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <span className="relative z-10">View All Cars</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-navy-blue transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
