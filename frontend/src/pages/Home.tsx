import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Make your special day unforgettable with our elegant wedding fleet. Arrive in style and create lasting memories.',
      benefit: 'Professional drivers ensure you arrive on time, stress-free.',
    },
    {
      name: 'Corporate Functions',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Impress clients and partners with our premium corporate transportation. Professional, reliable, and always on time.',
      benefit: 'WiFi-enabled vehicles for productive travel between meetings.',
    },
    {
      name: 'Tours',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      ),
      description: 'Explore Rwanda in comfort and style. Our luxury tour vehicles are perfect for discovering the beauty of our country.',
      benefit: 'Experienced drivers know the best routes and hidden gems.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden pt-20" style={{ backgroundColor: '#001F3F' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920)',
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

      {/* About Us Section - Fixed */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#001F3F' }}>
              About Offisho Transport
            </h2>
            <p className="text-lg mb-6" style={{ color: '#87CEEB' }}>
              Reliable luxury transport for every occasion in Rwanda
            </p>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: '#87CEEB' }}></div>
            
            <div className="space-y-4 text-left max-w-2xl mx-auto mb-8" style={{ color: '#4B5563' }}>
              <p className="text-base leading-relaxed">
                We specialize in providing premium vehicles for all your special occasions. Whether you're planning a wedding, corporate event, or a luxury tour, we have the perfect car for you.
              </p>
              <p className="text-base leading-relaxed">
                Our fleet includes luxury sedans, SUVs, convertibles, and vans, all maintained to the highest standards. With options to rent with or without a driver, we ensure your transportation needs are met with style and comfort.
              </p>
            </div>

            <Link
              to="/booking"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BB6D6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#87CEEB';
              }}
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Our Services Section - Improved */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl text-left border-2 border-transparent hover:border-sky-blue transition-all duration-300 cursor-pointer"
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
                <p className="text-xs font-medium" style={{ color: '#87CEEB' }}>
                  ✓ {service.benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Preview Section - New */}
      <section className="py-16 lg:py-24 bg-white">
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
            <p className="text-base max-w-2xl mx-auto mb-6" style={{ color: '#6B7280' }}>
              Starting from $250/day. All vehicles are fully insured and maintained to the highest standards.
            </p>
            <Link
              to="/cars"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
          </motion.div>
        </div>
      </section>

      {/* How It Works Section - New */}
      <section className="py-16 lg:py-24 bg-gray-50">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '1', title: 'Choose Your Vehicle', description: 'Browse our premium fleet and select the perfect car for your event.' },
              { step: '2', title: 'Book Online', description: 'Fill out our simple booking form. We\'ll confirm within 24 hours.' },
              { step: '3', title: 'Enjoy Your Ride', description: 'Arrive in style with our professional drivers and luxury vehicles.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold" style={{ backgroundColor: '#87CEEB', color: '#001F3F' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: '#001F3F' }}>{item.title}</h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Improved */}
      <section className="py-16 lg:py-24 bg-white">
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
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
              href="tel:+250785344214"
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
