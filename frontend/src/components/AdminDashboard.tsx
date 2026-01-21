import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { carsAPI, requestsAPI } from '../services/api';
import { Car, Request } from '../types';
import { LayoutDashboard, Car as CarIcon, FileText, BarChart3, Plus, Edit, Trash2, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { cn } from '../utils/cn';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cars' | 'requests' | 'analytics'>('cars');
  const [cars, setCars] = useState<Car[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [showCarForm, setShowCarForm] = useState<boolean>(false);

  useEffect(() => {
    if (activeTab === 'cars') {
      loadCars();
    } else if (activeTab === 'requests') {
      loadRequests();
    }
  }, [activeTab]);

  const loadCars = async () => {
    try {
      setLoading(true);
      const response = await carsAPI.getCars();
      setCars(response.cars);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await requestsAPI.getRequests();
      setRequests(response.requests);
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCar = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) {
      return;
    }
    try {
      await carsAPI.deleteCar(id);
      loadCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      alert('Failed to delete car');
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: Request['status']) => {
    try {
      await requestsAPI.updateRequestStatus(id, status);
      loadRequests();
    } catch (error) {
      console.error('Error updating request status:', error);
      alert('Failed to update request status');
    }
  };

  const analytics = {
    totalCars: cars.length,
    availableCars: cars.filter((c) => c.availability_status === 'available').length,
    pendingRequests: requests.filter((r) => r.status === 'pending').length,
    totalRevenue: requests
      .filter((r) => r.status === 'completed' || r.status === 'approved')
      .reduce((sum, r) => sum + r.total_amount, 0),
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20 sm:pt-24 pb-8 sm:pb-12">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Side Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="glass-card rounded-2xl p-4 sm:p-6 sticky top-20 sm:top-24">
              <h1 className="text-xl sm:text-2xl font-display font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Dashboard
              </h1>
              <nav className="space-y-2">
                {[
                  { id: 'cars', label: 'Cars', icon: CarIcon },
                  { id: 'requests', label: 'Requests', icon: FileText },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "touch-target w-full px-4 py-3 font-semibold capitalize flex items-center gap-3 transition-all duration-300 rounded-xl",
                      activeTab === tab.id
                        ? "bg-primary/20 text-primary border border-primary/30 glow-blue"
                        : "text-slate-400 hover:text-white hover:bg-white/5 active:bg-white/10 border border-transparent"
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Mobile Tabs */}
            <div className="lg:hidden mb-6 sm:mb-8 flex space-x-1 sm:space-x-2 border-b border-purple-electric/30 overflow-x-auto px-4">
              {[
                { id: 'cars', label: 'Cars', icon: CarIcon },
                { id: 'requests', label: 'Requests', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "touch-target px-3 sm:px-4 py-3 font-semibold capitalize flex items-center gap-2 transition-all relative top-[1px] whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-b-2 border-purple-electric text-purple-electric neon-glow"
                      : "text-silver/60 hover:text-silver active:text-silver border-b-2 border-transparent"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm sm:text-base">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Analytics Tab - Bento Style */}
            <AnimatePresence mode="wait">
              {activeTab === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0"
                >
                  {/* Large Revenue Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 bento-tile p-8 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-electric/20 rounded-full blur-3xl aurora-glow" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-silver/70 font-medium flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-purple-electric neon-glow" />
                          Total Revenue
                        </h3>
                        <span className="text-xs text-purple-glow bg-purple-electric/20 px-2 py-1 rounded-full border border-purple-electric/30 neon-border">
                          +12.5%
                        </span>
                      </div>
                      <p className="text-4xl md:text-5xl font-display font-bold text-purple-electric mb-4 neon-glow">
                        {new Intl.NumberFormat('en-RW', {
                          style: 'currency',
                          currency: 'RWF',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(analytics.totalRevenue).replace('RWF', 'FRW')}
                      </p>
                      {/* Mini Sparkline Chart */}
                      <div className="flex items-end gap-1 h-16 mt-6">
                        {[65, 72, 68, 80, 75, 85, 90].map((height, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: 0.2 + idx * 0.05, duration: 0.5 }}
                            className="flex-1 electric-gradient rounded-t"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Total Cars Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bento-tile p-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-electric/15 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <h3 className="text-silver/70 mb-2 font-medium">Total Cars</h3>
                      <p className="text-4xl font-display font-bold text-purple-electric neon-glow">{analytics.totalCars}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-silver/60">
                        <CarIcon className="w-4 h-4 text-purple-electric" />
                        <span>In fleet</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Available Cars Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bento-tile p-6 relative overflow-hidden border border-purple-electric/40 neon-border"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-electric/20 rounded-full blur-2xl aurora-glow" />
                    <div className="relative z-10">
                      <h3 className="text-silver/70 mb-2 font-medium">Available Cars</h3>
                      <p className="text-4xl font-display font-bold text-purple-electric neon-glow">{analytics.availableCars}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-purple-electric">
                        <CheckCircle className="w-4 h-4 neon-glow" />
                        <span>Ready to rent</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Pending Requests Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bento-tile p-6 relative overflow-hidden border border-purple-glow/30 neon-border"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-glow/15 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <h3 className="text-silver/70 mb-2 font-medium">Pending Requests</h3>
                      <p className="text-4xl font-display font-bold text-purple-glow neon-glow">{analytics.pendingRequests}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-purple-glow">
                        <Clock className="w-4 h-4 neon-glow" />
                        <span>Awaiting review</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cars Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'cars' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-display font-bold text-white">Cars Management</h2>
                    <button
                onClick={() => {
                  setEditingCar(null);
                  setShowCarForm(true);
                }}
                      className="touch-target bg-primary hover:bg-primary/90 active:bg-primary/80 text-white px-4 py-2.5 sm:py-2 rounded-xl flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 glow-blue text-sm sm:text-base"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Car
                    </button>
                  </div>

            {showCarForm && (
              <CarForm
                car={editingCar}
                onClose={() => {
                  setShowCarForm(false);
                  setEditingCar(null);
                }}
                onSuccess={() => {
                  setShowCarForm(false);
                  setEditingCar(null);
                  loadCars();
                }}
              />
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-electric neon-glow"></div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl overflow-hidden neon-border">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-purple-card border-b border-purple-electric/20 text-silver/70">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Image</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Price/Day</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-electric/10">
                      {cars.map((car, idx) => (
                        <tr key={car.id} className={cn(
                          "hover:bg-purple-card/50 transition-colors",
                          idx % 2 === 0 ? "bg-purple-card/30" : "bg-purple-midnight"
                        )}>
                          <td className="px-6 py-4">
                            {car.image_url ? (
                              <img
                                src={car.image_url}
                                alt={car.name}
                                className="w-16 h-12 object-cover rounded-lg neon-border"
                              />
                            ) : (
                              <div className="w-16 h-12 bg-purple-card rounded-lg flex items-center justify-center neon-border">
                                <CarIcon className="w-6 h-6 text-purple-electric/50" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 font-medium text-silver">{car.name}</td>
                          <td className="px-6 py-4 text-purple-electric font-mono font-bold">
                            {new Intl.NumberFormat('en-RW', {
                              style: 'currency',
                              currency: 'RWF',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(car.rental_price_per_day).replace('RWF', 'FRW')}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs font-semibold border",
                                car.availability_status === 'available' 
                                  ? "bg-purple-electric/20 text-purple-electric border-purple-electric/50 neon-glow" :
                                  car.availability_status === 'rented' 
                                    ? "bg-purple-glow/20 text-purple-glow border-purple-glow/50 neon-glow" :
                                    "bg-red-500/20 text-red-400 border-red-500/30"
                              )}
                            >
                              {car.availability_status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    setEditingCar(car);
                                    setShowCarForm(true);
                                  }}
                                  className="text-purple-electric hover:text-purple-glow transition-colors neon-glow"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCar(car.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Requests Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'requests' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-display font-bold text-silver mb-6">Requests Management</h2>
                  {loading ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-electric neon-glow"></div>
                    </div>
                  ) : (
                    <div className="glass-card rounded-2xl overflow-hidden neon-border">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left">
                          <thead className="bg-purple-card border-b border-purple-electric/20 text-silver/70">
                            <tr>
                              <th className="px-6 py-4 font-semibold">Customer</th>
                              <th className="px-6 py-4 font-semibold">Car</th>
                              <th className="px-6 py-4 font-semibold">Type</th>
                              <th className="px-6 py-4 font-semibold">Amount</th>
                              <th className="px-6 py-4 font-semibold">Status</th>
                              <th className="px-6 py-4 font-semibold">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-electric/10">
                            {requests.map((request, idx) => (
                              <tr key={request.id} className={cn(
                                "hover:bg-purple-card/50 transition-colors",
                                idx % 2 === 0 ? "bg-purple-card/30" : "bg-purple-midnight"
                              )}>
                                <td className="px-6 py-4 text-silver">{request.user_name || 'N/A'}</td>
                                <td className="px-6 py-4 text-silver/70">
                                  {request.car_name} {request.car_model}
                                </td>
                                <td className="px-6 py-4 text-silver/70 capitalize">{request.request_type}</td>
                                <td className="px-6 py-4 text-purple-electric font-mono font-bold">
                                  {new Intl.NumberFormat('en-RW', {
                                    style: 'currency',
                                    currency: 'RWF',
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  }).format(request.total_amount).replace('RWF', 'FRW')}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={cn(
                                      "px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center w-fit gap-1",
                                      request.status === 'approved' 
                                        ? "bg-purple-electric/20 text-purple-electric border-purple-electric/50 neon-glow" :
                                        request.status === 'rejected' 
                                          ? "bg-red-500/20 text-red-400 border-red-500/30" :
                                        request.status === 'completed' 
                                          ? "bg-purple-glow/20 text-purple-glow border-purple-glow/50 neon-glow" :
                                          "bg-purple-glow/20 text-purple-glow border-purple-glow/50 neon-glow"
                                    )}
                                  >
                                    {request.status}
                                  </span>
                                </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {request.status === 'pending' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                                    className="text-purple-electric hover:text-purple-glow transition-colors neon-glow"
                                    title="Approve"
                                  >
                                    <CheckCircle className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                    title="Reject"
                                  >
                                    <XCircle className="w-5 h-5" />
                                  </button>
                                </>
                              )}
                              {request.status === 'approved' && (
                                <button
                                  onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                                  className="text-purple-glow hover:text-purple-electric transition-colors flex items-center gap-1 text-sm font-medium neon-glow"
                                >
                                  <Clock className="w-4 h-4" />
                                  Complete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// Car Form Component
interface CarFormProps {
  car: Car | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CarForm: React.FC<CarFormProps> = ({ car, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: car?.name || '',
    model: car?.model || '',
    description: car?.description || '',
    rental_price_per_day: car?.rental_price_per_day || 0,
    buy_price: car?.buy_price || '',
    sell_price: car?.sell_price || '',
    car_type: car?.car_type || 'sedan',
    availability_status: car?.availability_status || 'available',
    event_suitability: car?.event_suitability?.join(', ') || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('rental_price_per_day', formData.rental_price_per_day.toString());
      if (formData.buy_price) {
        formDataToSend.append('buy_price', formData.buy_price.toString());
      }
      if (formData.sell_price) {
        formDataToSend.append('sell_price', formData.sell_price.toString());
      }
      formDataToSend.append('car_type', formData.car_type);
      formDataToSend.append('availability_status', formData.availability_status);
      formDataToSend.append(
        'event_suitability',
        JSON.stringify(
          formData.event_suitability
            .split(',')
            .map((e) => e.trim())
            .filter((e) => e)
        )
      );

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      if (car) {
        await carsAPI.updateCar(car.id, formDataToSend);
      } else {
        await carsAPI.createCar(formDataToSend);
      }

      onSuccess();
    } catch (err: any) {
      console.error('Save car error:', err);
      let errorMessage = 'Failed to save car';

      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        errorMessage = err.response.data.errors
          .map((e: any) => e.message.replace(/['"]/g, ''))
          .join('. ');
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-white/10 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {car ? 'Edit Car' : 'Add New Car'}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Rental Price/Day
              </label>
              <input
                type="number"
                name="rental_price_per_day"
                value={formData.rental_price_per_day}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Buy Price</label>
              <input
                type="number"
                name="buy_price"
                value={formData.buy_price}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Sell Price</label>
              <input
                type="number"
                name="sell_price"
                value={formData.sell_price}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Car Type</label>
              <div className="nebula-select-container">
                <select
                  name="car_type"
                  value={formData.car_type}
                  onChange={handleChange}
                  required
                  className="nebula-select"
                >
                  <option value="luxury">Luxury</option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="convertible">Convertible</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
              <div className="nebula-select-container">
                <select
                  name="availability_status"
                  value={formData.availability_status}
                  onChange={handleChange}
                  required
                  className="nebula-select"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="sold">Sold</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Event Suitability (comma-separated)
            </label>
            <input
              type="text"
              name="event_suitability"
              value={formData.event_suitability}
              onChange={handleChange}
              placeholder="wedding, corporate, tour"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-white/10 rounded-xl text-slate-300 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : car ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
