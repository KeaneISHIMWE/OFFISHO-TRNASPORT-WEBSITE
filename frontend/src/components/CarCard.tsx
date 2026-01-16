import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getAvailabilityBadgeColor = () => {
    switch (car.availability_status) {
      case 'available':
        return 'bg-green-500';
      case 'rented':
        return 'bg-yellow-500';
      case 'sold':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
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
      <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Availability Badge */}
        <span
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg backdrop-blur-sm ${getAvailabilityBadgeColor()}`}
        >
          {car.availability_status.toUpperCase()}
        </span>
      </div>

      {/* Car Details */}
      <div className="p-4 sm:p-6">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-navy-blue mb-1 group-hover:text-sky-blue transition-colors line-clamp-1">
            {car.name} {car.model}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
            {car.description || 'Premium vehicle for your special events.'}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Rental Price</p>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-navy-blue truncate">
              {formatPrice(car.rental_price_per_day)}<span className="text-xs sm:text-sm font-normal text-gray-600">/day</span>
            </p>
          </div>
          {car.buy_price && (
            <div className="text-right ml-2 min-w-0 flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Buy Price</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-blue truncate">
                {formatPrice(car.buy_price)}
              </p>
            </div>
          )}
        </div>

        {/* Event Suitability Tags */}
        {car.event_suitability && car.event_suitability.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {car.event_suitability.slice(0, 3).map((event, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-sky-blue to-blue-400 bg-opacity-10 text-sky-blue text-xs rounded-full font-medium border border-sky-blue border-opacity-20"
              >
                {event}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link
            to={`/cars/${car.id}`}
            className="flex-1 bg-gradient-to-r from-sky-blue to-blue-400 text-white text-center py-2.5 sm:py-3 rounded-xl hover:from-sky-blue hover:to-sky-blue transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Details
          </Link>
          {car.availability_status === 'available' && (
            <Link
              to={`/cars/${car.id}?action=rent`}
              className="flex-1 bg-gradient-to-r from-navy-blue to-[#003366] text-white text-center py-2.5 sm:py-3 rounded-xl hover:from-[#003366] hover:to-navy-blue transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Rent Now
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
