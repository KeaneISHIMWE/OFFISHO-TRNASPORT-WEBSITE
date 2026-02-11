import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CarCard from '../components/CarCard';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

const Cars: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    availability: searchParams.get('availability') || '',
    search: searchParams.get('search') || '',
    eventType: searchParams.get('eventType') || '',
  });

  // Fetch cars using Convex query
  const carsData = useQuery(api.cars.list, {
    type: filters.type || undefined,
    minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
    availability: filters.availability || undefined,
    search: filters.search || undefined,
    eventType: filters.eventType || undefined,
  });

  const cars = carsData?.cars || [];
  const loading = carsData === undefined;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-purple-midnight pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-purple-electric uppercase bg-purple-card/50 border border-purple-electric/30 rounded-full mb-3 sm:mb-4 neon-border">
            Our Fleet
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-silver mb-3 sm:mb-4">
            Choose Your Perfect Ride
          </h1>
          <p className="text-silver/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            From elegant sedans to luxurious limousines, find the vehicle that suits your style.
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4 sm:mb-6 px-4">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="touch-target w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-card border border-purple-electric/30 rounded-xl text-silver font-medium active:bg-purple-card/80 transition-colors neon-border"
          >
            <Filter className="w-5 h-5" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {/* Filters Sidebar */}
          <aside className={cn(
            "lg:w-72 glass-card p-4 sm:p-6 rounded-2xl h-fit lg:sticky lg:top-24 transition-all duration-300 neon-border",
            showMobileFilters ? "block" : "hidden lg:block"
          )}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filters
              </h2>
              {showMobileFilters && (
                <button onClick={() => setShowMobileFilters(false)} className="lg:hidden text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Search</label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Car Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Car Type</label>
              <div className="nebula-select-container">
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="nebula-select"
                >
                  <option value="">All Types</option>
                  <option value="luxury">Luxury</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="convertible">Convertible</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Price Range (FRW)
              </label>
              <div className="space-y-3">
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="Min price"
                  className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50"
                />
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="Max price"
                  className="w-full px-4 py-2.5 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            {/* Event Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Event Type</label>
              <div className="nebula-select-container">
                <select
                  value={filters.eventType}
                  onChange={(e) => handleFilterChange('eventType', e.target.value)}
                  className="nebula-select"
                >
                  <option value="">All Events</option>
                  <option value="wedding">Wedding</option>
                  <option value="corporate">Corporate</option>
                  <option value="tour">Tour</option>
                  <option value="party">Party</option>
                </select>
              </div>
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
              className="touch-target w-full py-3 rounded-xl font-semibold bg-purple-midnight hover:bg-purple-midnight/80 active:bg-purple-midnight/60 text-silver transition-colors border border-purple-electric/30 neon-border"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Cars Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                <p className="text-slate-400 font-medium">Loading cars...</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-white/5">
                <p className="text-xl font-bold text-white mb-2">No cars found</p>
                <p className="text-slate-400">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-slate-400">
                    Showing <span className="font-bold text-white">{cars.length}</span> {cars.length === 1 ? 'car' : 'cars'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {cars.map((car) => (
                    <CarCard key={car._id} car={car} />
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
