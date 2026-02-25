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

  const getSeats = () => {
    const seats = car.specs?.seats;
    return seats !== null && seats !== undefined && seats !== '' ? seats : 'N/A';
  };
  const getFuelType = () => {
    const fuelType = car.specs?.fuel_type;
    return fuelType && fuelType.trim() !== '' ? fuelType : 'N/A';
  };
  const getTransmission = () => {
    const transmission = car.specs?.transmission;
    return transmission && transmission.trim() !== '' ? transmission : 'N/A';
  };
  const getHP = () => car.specs?.hp ?? 'N/A';
  const getTopSpeed = () => car.specs?.top_speed ?? 'N/A';
  const getYear = () => car.specs?.year ?? new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-purple-card rounded-2xl overflow-hidden border border-purple-electric/30 hover:border-purple-electric transition-all duration-300 flex flex-col h-full neon-border neon-border-hover"
    >
      {/* Car Image */}
      <div className="relative h-48 sm:h-56 bg-purple-midnight overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center text-silver/40 bg-purple-midnight">
            <CarIcon className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-midnight via-purple-midnight/80 to-transparent opacity-80" />

        {/* Global Illumination behind image */}
        <div className="absolute inset-0 global-illumination opacity-40"></div>

        {/* Specs Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center bg-purple-midnight/95 backdrop-blur-sm z-10"
        >
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-purple-electric">
              <Zap className="w-5 h-5 neon-glow" />
              <span className="text-xl font-bold text-silver">{getHP()}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-silver">
              <Gauge className="w-5 h-5 text-purple-electric neon-glow" />
              <span className="text-lg">{getTopSpeed()}</span>
            </div>
            <div className="text-silver/60 text-sm">Year {getYear()}</div>
          </div>
        </motion.div>
      </div>

      {/* Car Details */}
      <div className="p-6 flex flex-col flex-grow bg-purple-card">
        <h3 className="text-xl font-display font-bold mb-4 text-silver group-hover:text-purple-electric transition-colors">
          {car.name} <span className="text-silver/60 font-normal">{car.model}</span>
        </h3>

        {/* Specs Icons */}
        <div className="flex items-center gap-4 text-silver/70 mb-6 text-sm">
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

        {/* Price and Status Card */}
        <div className="mt-auto space-y-4">
          <div className="pt-4 border-t border-purple-electric/20 flex items-center justify-between gap-4">
            <div>
              <p className="text-lg font-bold electric-gradient-text">
                {formatPrice(car.rental_price_per_day)}
                <span className="text-xs font-normal text-silver/60 ml-1">/day</span>
              </p>
            </div>
            {car.availability_status === 'available' ? (
              <Link
                to={`/cars/${car._id}?action=rent`}
                className="touch-target px-4 py-2.5 sm:py-2 rounded-lg electric-gradient hover:opacity-90 active:opacity-80 text-white font-medium transition-all duration-300 flex items-center gap-2 group/btn hover:scale-105 active:scale-95 neon-glow"
              >
                Book Now
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <span className="px-4 py-2.5 sm:py-2 rounded-lg bg-red-500/10 text-red-400 font-medium text-sm border border-red-500/20 cursor-not-allowed">
                {car.availability_status === 'rented' ? 'Booked' : car.availability_status.toUpperCase()}
              </span>
            )}
          </div>

          {/* Booking Period Card */}
          <div className={cn(
            "p-3 rounded-xl border text-xs space-y-2 transition-all duration-300",
            car.availability_status === 'available'
              ? "bg-green-500/5 border-green-500/20 text-green-400/80"
              : "bg-purple-midnight border-purple-electric/20 text-silver/60"
          )}>
            <div className="flex items-center justify-between">
              <span className="font-semibold uppercase tracking-wider">Status</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full font-bold",
                car.availability_status === 'available' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              )}>
                {car.availability_status === 'available' ? 'AVAILABLE' : 'BOOKED'}
              </span>
            </div>

            {car.availability_status === 'rented' && car.booked_from && car.booked_until ? (
              <>
                <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
                  <div className="flex flex-col">
                    <span className="text-silver/40">From</span>
                    <span className="font-medium text-silver">{new Date(car.booked_from).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-silver/40">Until</span>
                    <span className="font-medium text-silver">{new Date(car.booked_until).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-purple-electric/10 mt-2 flex items-center justify-between">
                  <span className="text-purple-electric font-medium">Next Available</span>
                  <span className="text-silver font-bold">
                    {(() => {
                      const nextDate = new Date(car.booked_until);
                      nextDate.setDate(nextDate.getDate() + 1);
                      return nextDate.toLocaleDateString();
                    })()}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2 text-green-400">
                <Users className="w-3 h-3" />
                <span>Ready for immediate booking</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
