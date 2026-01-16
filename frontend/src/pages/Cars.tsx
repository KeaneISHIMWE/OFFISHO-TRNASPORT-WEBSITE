import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CarCard from '../components/CarCard';
import { carsAPI } from '../services/api';
import { Car } from '../types';

const Cars: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    availability: searchParams.get('availability') || '',
    search: searchParams.get('search') || '',
    eventType: searchParams.get('eventType') || '',
  });

  useEffect(() => {
    loadCars();
  }, [filters]);

  const loadCars = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (filters.type) params.type = filters.type;
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);
      if (filters.availability) params.availability = filters.availability;
      if (filters.search) params.search = filters.search;
      if (filters.eventType) params.eventType = filters.eventType;

      const response = await carsAPI.getCars(params);
      setCars(response.cars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-sky-blue font-semibold text-sm uppercase tracking-wider">Our Collection</span>
          <h1 className="text-4xl md:text-5xl font-bold text-navy-blue mt-4 mb-4">
            Explore Our Premium Fleet
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-blue to-navy-blue mx-auto"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 xl:w-72 bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 h-fit lg:sticky lg:top-24">
            <div className="flex items-center mb-6">
              <svg className="w-6 h-6 text-sky-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h2 className="text-xl font-bold text-navy-blue">Filters</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search cars..."
                  className="w-full px-4 py-2.5 pl-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300"
                />
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Car Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Car Type</label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="">All Types</option>
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="convertible">Convertible</option>
                <option value="van">Van</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price Range (FRW)
              </label>
              <div className="space-y-3">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="Min price"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="Max price"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="sold">Sold</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Event Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
              <select
                value={filters.eventType}
                onChange={(e) => handleFilterChange('eventType', e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent transition-all duration-300 bg-white"
              >
                <option value="">All Events</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="tour">Tour</option>
                <option value="party">Party</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() =>
                setFilters({
                  type: '',
                  minPrice: '',
                  maxPrice: '',
                  availability: '',
                  search: '',
                  eventType: '',
                })
              }
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Cars Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-blue border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Loading cars...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-xl font-semibold text-gray-700 mb-2">No cars found</p>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold text-navy-blue">{cars.length}</span> {cars.length === 1 ? 'car' : 'cars'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cars;
