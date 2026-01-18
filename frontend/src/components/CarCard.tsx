import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car } from '../types';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RWF', // Changed to RWF as per context
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('RWF', 'FRW'); // Formatting as FRW
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Car Image */}
      <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
        {car.image_url ? (
          <motion.img
            src={car.image_url}
            alt={`${car.name} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-700 bg-slate-800">
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-60" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-lg bg-primary text-white">
          {getCategoryLabel()}
        </span>
      </div>

      {/* Car Details */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
          {car.name} <span className="text-slate-400 font-normal">{car.model}</span>
        </h3>

        {/* Specs Icons */}
        <div className="flex items-center gap-4 text-slate-400 mb-6 text-sm">
          <div className="flex items-center gap-1.5" title="Seats">
            <Users className="w-4 h-4 text-primary" />
            <span>{getSeats()}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Transmission">
            <Gauge className="w-4 h-4 text-primary" />
            <span>{getTransmission()}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Fuel Type">
            <Fuel className="w-4 h-4 text-primary" />
            <span>{getFuelType()}</span>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-white">
              {formatPrice(car.rental_price_per_day)}
              <span className="text-xs font-normal text-slate-500 ml-1">/day</span>
            </p>
          </div>
          {car.availability_status === 'available' ? (
            <Link
              to={`/cars/${car.id}?action=rent`}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary text-white font-medium transition-all duration-300 border border-white/10 hover:border-transparent flex items-center gap-2 group/btn"
            >
              Book
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-white/5 text-slate-500 font-medium text-sm border border-white/5 cursor-not-allowed">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
