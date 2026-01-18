import React, { useState, useEffect } from 'react';
import { carsAPI, requestsAPI } from '../services/api';
import { Car, Request } from '../types';
import { LayoutDashboard, Car as CarIcon, FileText, BarChart3, Plus, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8 text-primary" />
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 border-b border-white/10">
          {[
            { id: 'cars', label: 'Cars', icon: CarIcon },
            { id: 'requests', label: 'Requests', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-6 py-4 font-semibold capitalize flex items-center gap-2 transition-all relative top-[1px]",
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary bg-primary/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border-b-2 border-transparent"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-slate-400 mb-2 font-medium">Total Cars</h3>
              <p className="text-3xl font-bold text-white">{analytics.totalCars}</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-slate-400 mb-2 font-medium">Available Cars</h3>
              <p className="text-3xl font-bold text-green-400">{analytics.availableCars}</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-slate-400 mb-2 font-medium">Pending Requests</h3>
              <p className="text-3xl font-bold text-yellow-400">{analytics.pendingRequests}</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-white/10">
              <h3 className="text-slate-400 mb-2 font-medium">Total Revenue</h3>
              <p className="text-3xl font-bold text-primary">
                {new Intl.NumberFormat('en-RW', {
                  style: 'currency',
                  currency: 'RWF',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(analytics.totalRevenue).replace('RWF', 'FRW')}
              </p>
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Cars Management</h2>
              <button
                onClick={() => {
                  setEditingCar(null);
                  setShowCarForm(true);
                }}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-slate-300">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Image</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Price/Day</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {cars.map((car) => (
                        <tr key={car.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            {car.image_url ? (
                              <img
                                src={car.image_url}
                                alt={car.name}
                                className="w-16 h-12 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-12 bg-slate-800 rounded-lg flex items-center justify-center">
                                <CarIcon className="w-6 h-6 text-slate-600" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 font-medium text-white">{car.name}</td>
                          <td className="px-6 py-4 text-slate-300 capitalize">{car.car_type}</td>
                          <td className="px-6 py-4 text-white font-mono">
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
                                "px-2 py-1 rounded text-xs font-semibold border",
                                car.availability_status === 'available' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                  car.availability_status === 'rented' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                                    "bg-red-500/10 text-red-400 border-red-500/20"
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
                                className="text-primary hover:text-primary/80 transition-colors"
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
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Requests Management</h2>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-slate-300">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Customer</th>
                        <th className="px-6 py-4 font-semibold">Car</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Amount</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {requests.map((request) => (
                        <tr key={request.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-white">{request.user_name || 'N/A'}</td>
                          <td className="px-6 py-4 text-slate-300">
                            {request.car_name} {request.car_model}
                          </td>
                          <td className="px-6 py-4 text-slate-300 capitalize">{request.request_type}</td>
                          <td className="px-6 py-4 text-white font-mono">
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
                                "px-2 py-1 rounded text-xs font-semibold border flex items-center w-fit gap-1",
                                request.status === 'approved' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                  request.status === 'rejected' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                    request.status === 'completed' ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
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
                                    className="text-green-400 hover:text-green-300 transition-colors"
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
                                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 text-sm font-medium"
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
          </div>
        )}
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
      setError(err.response?.data?.error || 'Failed to save car');
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
              <select
                name="car_type"
                value={formData.car_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="convertible">Convertible</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
              <select
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="sold">Sold</option>
                <option value="maintenance">Maintenance</option>
              </select>
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
