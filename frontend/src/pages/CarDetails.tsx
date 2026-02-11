import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import BookingForm from '../components/BookingForm';
import { ArrowLeft, Car as CarIcon, Calendar, DollarSign, CheckCircle2, XCircle, AlertCircle, Fuel, Gauge, Users } from 'lucide-react';
import { cn } from '../utils/cn';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);

  // Fetch car details using Convex query
  const carData = useQuery(api.cars.getById, {
    id: id as Id<"cars">
  });

  const car = carData?.car || null;
  const loading = carData === undefined;
  const error = carData === null ? 'Car not found' : null;

  useEffect(() => {
    if (searchParams.get('action') === 'rent') {
      setShowBookingForm(true);
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('RWF', 'FRW');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!car && !loading) {
    return (
      <div className="min-h-screen bg-purple-midnight pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            {error || 'Car not found'}
          </h1>
          {error && error.includes('Server error') && (
            <p className="text-silver/70 text-sm mb-4">
              There was an issue loading the car details. Please try again later.
            </p>
          )}
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-purple-electric hover:text-purple-glow transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/cars"
          className="text-slate-400 hover:text-white transition-colors mb-6 inline-flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Car Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl overflow-hidden border border-white/10"
          >
            {car.image_url ? (
              <img
                src={car.image_url}
                alt={`${car.name} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-slate-800 flex items-center justify-center text-slate-600 flex-col gap-4">
                <CarIcon className="w-24 h-24 opacity-50" />
                <span>No Image Available</span>
              </div>
            )}
          </motion.div>

          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-8 border border-white/10 flex flex-col h-full"
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold text-white">
                  {car.name} <span className="font-normal text-slate-400">{car.model}</span>
                </h1>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                  car.availability_status === 'available' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    car.availability_status === 'rented' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                      "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {car.availability_status}
                </span>
              </div>
              <p className="text-slate-400 text-lg">{car.description || 'Premium vehicle for your special events.'}</p>
            </div>

            <div className="space-y-6 mb-8 flex-1">
              {/* Type and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Type</span>
                  <span className="text-white font-medium capitalize flex items-center gap-2">
                    <CarIcon className="w-4 h-4 text-primary" />
                    {car.car_type}
                  </span>
                </div>
                <div className="bg-background/50 p-4 rounded-xl border border-white/5">
                  <span className="block text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Rental Price</span>
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    {formatPrice(car.rental_price_per_day)}/day
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              {car.specs && Object.keys(car.specs).length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-primary" />
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Object.entries(car.specs).map(([key, value]) => (
                      <div key={key} className="bg-background/30 px-3 py-2 rounded-lg border border-white/5 flex flex-col">
                        <span className="text-slate-500 text-xs capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-white font-medium text-sm">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitability */}
              {car.event_suitability && car.event_suitability.length > 0 && (
                <div>
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Perfect For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {car.event_suitability.map((event, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {car.availability_status === 'available' && (
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-primary/25"
              >
                {showBookingForm ? 'Hide Booking Form' : 'Book This Car'}
              </button>
            )}
          </motion.div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="bg-card border border-white/10 rounded-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Complete Your Booking</h2>
              <BookingForm carId={car._id} car={car as any} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
