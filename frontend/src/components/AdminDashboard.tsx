import React, { useState, useEffect } from 'react';
import { carsAPI, requestsAPI } from '../services/api';
import { Car, Request } from '../types';

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-navy-blue mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {(['cars', 'requests', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-sky-blue text-sky-blue'
                  : 'text-gray-600 hover:text-navy-blue'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-600 mb-2">Total Cars</h3>
              <p className="text-3xl font-bold text-navy-blue">{analytics.totalCars}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-600 mb-2">Available Cars</h3>
              <p className="text-3xl font-bold text-green-600">{analytics.availableCars}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-600 mb-2">Pending Requests</h3>
              <p className="text-3xl font-bold text-yellow-600">{analytics.pendingRequests}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-600 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-sky-blue">
                {new Intl.NumberFormat('en-RW', {
                  style: 'currency',
                  currency: 'RWF',
                  minimumFractionDigits: 0,
                }).format(analytics.totalRevenue)}
              </p>
            </div>
          </div>
        )}

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-navy-blue">Cars Management</h2>
              <button
                onClick={() => {
                  setEditingCar(null);
                  setShowCarForm(true);
                }}
                className="bg-sky-blue text-white px-4 py-2 rounded hover:bg-opacity-80"
              >
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-navy-blue text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Image</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Price/Day</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => (
                      <tr key={car.id} className="border-b">
                        <td className="px-4 py-3">
                          {car.image_url ? (
                            <img
                              src={car.image_url}
                              alt={car.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded"></div>
                          )}
                        </td>
                        <td className="px-4 py-3 font-semibold">{car.name}</td>
                        <td className="px-4 py-3 capitalize">{car.car_type}</td>
                        <td className="px-4 py-3">
                          {new Intl.NumberFormat('en-RW', {
                            style: 'currency',
                            currency: 'RWF',
                            minimumFractionDigits: 0,
                          }).format(car.rental_price_per_day)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              car.availability_status === 'available'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {car.availability_status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              setEditingCar(car);
                              setShowCarForm(true);
                            }}
                            className="text-sky-blue hover:underline mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-2xl font-bold text-navy-blue mb-4">Requests Management</h2>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-navy-blue text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Customer</th>
                      <th className="px-4 py-3 text-left">Car</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Amount</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b">
                        <td className="px-4 py-3">{request.user_name || 'N/A'}</td>
                        <td className="px-4 py-3">
                          {request.car_name} {request.car_model}
                        </td>
                        <td className="px-4 py-3 capitalize">{request.request_type}</td>
                        <td className="px-4 py-3">
                          {new Intl.NumberFormat('en-RW', {
                            style: 'currency',
                            currency: 'RWF',
                            minimumFractionDigits: 0,
                          }).format(request.total_amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              request.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : request.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {request.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                                className="text-green-600 hover:underline mr-4"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                                className="text-red-600 hover:underline"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {request.status === 'approved' && (
                            <button
                              onClick={() => handleUpdateRequestStatus(request.id, 'completed')}
                              className="text-blue-600 hover:underline"
                            >
                              Mark Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-navy-blue mb-4">
          {car ? 'Edit Car' : 'Add New Car'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rental Price/Day
              </label>
              <input
                type="number"
                name="rental_price_per_day"
                value={formData.rental_price_per_day}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Buy Price</label>
              <input
                type="number"
                name="buy_price"
                value={formData.buy_price}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sell Price</label>
              <input
                type="number"
                name="sell_price"
                value={formData.sell_price}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Car Type</label>
              <select
                name="car_type"
                value={formData.car_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              >
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="sedan">Sedan</option>
                <option value="convertible">Convertible</option>
                <option value="van">Van</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="sold">Sold</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Suitability (comma-separated)
            </label>
            <input
              type="text"
              name="event_suitability"
              value={formData.event_suitability}
              onChange={handleChange}
              placeholder="wedding, corporate, tour"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-sky-blue"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-sky-blue text-white rounded hover:bg-opacity-80 disabled:opacity-50"
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
