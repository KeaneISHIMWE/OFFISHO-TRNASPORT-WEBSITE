import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { carsAPI } from '../services/api';
import { Car } from '../types';
import BookingForm from '../components/BookingForm';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      loadCar();
    }
    if (searchParams.get('action') === 'rent') {
      setShowBookingForm(true);
    }
  }, [id, searchParams]);

  const loadCar = async () => {
    try {
      setLoading(true);
      const response = await carsAPI.getCarById(id!);
      setCar(response.car);
    } catch (error) {
      console.error('Error loading car:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-blue mb-4">Car not found</h1>
          <Link to="/cars" className="text-sky-blue hover:underline">
            Back to Cars
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/cars"
          className="text-sky-blue hover:underline mb-4 inline-block"
        >
          ← Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {car.image_url ? (
              <img
                src={car.image_url}
                alt={`${car.name} ${car.model}`}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </motion.div>

          {/* Car Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h1 className="text-4xl font-bold text-navy-blue mb-2">
              {car.name} {car.model}
            </h1>
            <p className="text-gray-600 mb-6">{car.description || 'Premium vehicle for your special events.'}</p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Car Type:</span>
                <span className="text-navy-blue capitalize">{car.car_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Availability:</span>
                <span className={`px-3 py-1 rounded ${
                  car.availability_status === 'available' ? 'bg-green-100 text-green-800' :
                  car.availability_status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {car.availability_status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Rental Price:</span>
                <span className="text-navy-blue font-bold text-xl">
                  {formatPrice(car.rental_price_per_day)}/day
                </span>
              </div>
              {car.buy_price && (
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">Buy Price:</span>
                  <span className="text-navy-blue font-bold text-xl">
                    {formatPrice(car.buy_price)}
                  </span>
                </div>
              )}
            </div>

            {car.event_suitability && car.event_suitability.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Suitable for:</h3>
                <div className="flex flex-wrap gap-2">
                  {car.event_suitability.map((event, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-blue bg-opacity-20 text-sky-blue rounded"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {car.specs && Object.keys(car.specs).length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-2">Specifications:</h3>
                <ul className="space-y-2">
                  {Object.entries(car.specs).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/_/g, ' ')}:</span>
                      <span className="text-navy-blue">{String(value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {car.availability_status === 'available' && (
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className="w-full bg-sky-blue text-white py-3 rounded font-semibold hover:bg-opacity-80 transition-colors"
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
            className="mt-8"
          >
            <BookingForm carId={car.id} car={car} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
