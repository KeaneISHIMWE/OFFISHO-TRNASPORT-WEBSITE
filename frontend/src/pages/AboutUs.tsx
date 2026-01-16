import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-blue via-[#003366] to-navy-blue text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-3 sm:mb-4"
          >
            About Offisho Transport
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-center text-gray-200 max-w-3xl mx-auto px-4"
          >
            Your trusted partner for premium transportation services
          </motion.p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4 sm:mb-6">Our Story</h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
              Offisho Transport was founded with a vision to provide premium transportation services
              for special events across Rwanda. We understand that every occasion deserves the
              perfect vehicle to make it memorable.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-4 leading-relaxed">
              Starting with a small fleet of luxury vehicles, we have grown to become one of the
              leading car rental and sales companies in the region. Our commitment to excellence
              and customer satisfaction has earned us the trust of countless clients.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Today, we offer a diverse range of vehicles suitable for weddings, corporate
              functions, tours, and other special events. Whether you need a luxury sedan for a
              corporate meeting or a spacious SUV for a family tour, we have the perfect solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed px-4">
              To provide exceptional transportation services that exceed our customers' expectations,
              ensuring comfort, reliability, and style for every journey.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">
              We are committed to maintaining the highest standards of vehicle maintenance,
              customer service, and safety, making us the preferred choice for premium transportation
              in Rwanda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-blue text-center mb-8 sm:mb-12 px-4">
            Why Choose Offisho Transport?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Premium Fleet',
                description:
                  'Our vehicles are regularly maintained and updated to ensure the highest quality and comfort.',
              },
              {
                title: 'Flexible Options',
                description:
                  'Choose to rent with or without a driver, and select from various vehicle types to suit your needs.',
              },
              {
                title: 'Excellent Service',
                description:
                  'Our team is dedicated to providing exceptional customer service and ensuring your complete satisfaction.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-5 sm:p-6 rounded-xl text-center border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-blue bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-7 h-7 sm:w-8 sm:h-8 text-sky-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy-blue mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold text-navy-blue mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our experienced team of professionals is dedicated to ensuring your transportation
              needs are met with excellence. From our customer service representatives to our
              skilled drivers, every team member is committed to providing the best possible
              experience.
            </p>
            <p className="text-lg text-gray-600">
              We believe in building lasting relationships with our clients, understanding their
              needs, and delivering solutions that exceed expectations.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
