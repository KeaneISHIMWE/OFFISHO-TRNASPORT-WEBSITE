import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = () => {
    switch (car.car_type) {
      case 'luxury':
      case 'sedan':
        return 'Luxury Sedan';
      case 'suv':
        return 'Premium SUV';
      case 'convertible':
        return 'Ultra Luxury';
      default:
        return car.car_type.charAt(0).toUpperCase() + car.car_type.slice(1);
    }
  };

  const getSeats = () => {
    return car.specs?.seats || (car.car_type === 'suv' ? 5 : 4);
  };

  const getFuelType = () => {
    return car.specs?.fuel_type || 'Petrol';
  };

  const getTransmission = () => {
    return car.specs?.transmission || 'Auto';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      {/* Car Image */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
        {car.image_url ? (
          <motion.img
            src={car.image_url}
            alt={`${car.name} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-20 h-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Category Badge */}
        <span className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-lg bg-sky-blue text-navy-blue">
          {getCategoryLabel()}
        </span>
      </div>

      {/* Car Details */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-navy-blue transition-colors">
          {car.name} {car.model}
        </h3>

        {/* Specs Icons */}
        <div className="flex items-center flex-wrap gap-3 sm:gap-4 mb-3 sm:mb-4 text-gray-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-medium">{getSeats()} Seats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{getTransmission()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm font-medium">{getFuelType()}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-200">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-navy-blue">
              {formatPrice(car.rental_price_per_day)}
              <span className="text-xs sm:text-sm font-normal text-gray-600">/day</span>
            </p>
          </div>
          {car.availability_status === 'available' ? (
            <Link
              to={`/cars/${car.id}?action=rent`}
              className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center sm:text-left"
            >
              Book Now
            </Link>
          ) : (
            <button
              disabled
              className="w-full sm:w-auto px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
