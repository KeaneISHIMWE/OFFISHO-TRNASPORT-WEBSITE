import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { Users, Fuel, Gauge, ArrowRight, Zap, Car as CarIcon } from 'lucide-react';
import { cn } from '../utils/cn';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('RWF', 'FRW');
  };

  const getCategoryLabel = () => {
    switch (car.car_type) {
      case 'luxury':
      case 'sedan': return 'Luxury Sedan';
      case 'suv': return 'Premium SUV';
      case 'convertible': return 'Ultra Luxury';
      default: return car.car_type.charAt(0).toUpperCase() + car.car_type.slice(1);
    }
  };

  const getSeats = () => car.specs?.seats || (car.car_type === 'suv' ? 5 : 4);
  const getFuelType = () => car.specs?.fuel_type || 'Petrol';
  const getTransmission = () => car.specs?.transmission || 'Auto';
  const getHP = () => car.specs?.hp || 'N/A';
  const getTopSpeed = () => car.specs?.top_speed || 'N/A';
  const getYear = () => car.specs?.year || new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white rounded-2xl overflow-hidden border border-lavender hover:border-purple-electric/50 transition-all duration-300 flex flex-col h-full neumorphism purple-glow-hover"
    >
      {/* Car Image */}
      <div className="relative h-48 sm:h-56 bg-lavender-light overflow-hidden">
        {!imageLoaded && car.image_url && (
          <div className="absolute inset-0 skeleton" />
        )}
        {car.image_url ? (
          <motion.img
            src={car.image_url}
            alt={`${car.name} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-purple-deep/40 bg-lavender-light">
            <CarIcon className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-80" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg electric-gradient text-white glow-purple-soft">
          {getCategoryLabel()}
        </span>

        {/* Specs Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-10"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-electric">
              <Zap className="w-5 h-5" />
              <span className="text-xl font-bold text-purple-deep">{getHP()}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-deep">
              <Gauge className="w-5 h-5 text-purple-electric" />
              <span className="text-lg">{getTopSpeed()}</span>
            </div>
            <div className="text-purple-deep/60 text-sm">Year {getYear()}</div>
          </div>
        </motion.div>
      </div>

      {/* Car Details */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <h3 className="text-xl font-display font-black mb-4 text-purple-deep group-hover:text-purple-electric transition-colors">
          {car.name} <span className="text-purple-deep/60 font-normal">{car.model}</span>
        </h3>

        {/* Specs Icons */}
        <div className="flex items-center gap-4 text-purple-deep/60 mb-6 text-sm">
          <div className="flex items-center gap-1.5" title="Seats">
            <Users className="w-4 h-4 text-purple-electric" />
            <span>{getSeats()}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Transmission">
            <Gauge className="w-4 h-4 text-purple-electric" />
            <span>{getTransmission()}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Fuel Type">
            <Fuel className="w-4 h-4 text-purple-electric" />
            <span>{getFuelType()}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="mt-auto pt-4 border-t border-lavender flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-black electric-gradient bg-clip-text text-transparent">
              {formatPrice(car.rental_price_per_day)}
              <span className="text-xs font-normal text-purple-deep/60 ml-1">/day</span>
            </p>
          </div>
          {car.availability_status === 'available' ? (
            <Link
              to={`/cars/${car.id}?action=rent`}
              className="touch-target px-4 py-2.5 sm:py-2 rounded-lg electric-gradient hover:opacity-90 active:opacity-80 text-white font-medium transition-all duration-300 flex items-center gap-2 group/btn hover:scale-105 active:scale-95 glow-purple-soft"
            >
              Book
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="px-4 py-2.5 sm:py-2 rounded-lg bg-lavender text-purple-deep/40 font-medium text-sm border border-lavender cursor-not-allowed">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
