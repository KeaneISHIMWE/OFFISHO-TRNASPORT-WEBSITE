import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthResponse, Car, Request, User, ApiError } from '../types';
import { retryWithBackoff } from '../utils/retry';

// Support both Vite (import.meta.env) and Webpack (process.env) for compatibility
const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL) ||
  'http://localhost:5000/api';

// Create axios instance with timeout
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Enhance error messages for network issues
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      error.message = 'Request timeout. The server is taking too long to respond.';
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      error.message = 'Cannot reach server. Please check your network connection and ensure the backend is running.';
    }

    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Health check endpoint
export const healthCheck = async (): Promise<{ status: string }> => {
  try {
    const response = await api.get<{ status: string }>('/health');
    return response.data;
  } catch (error) {
    // If /health doesn't exist, try root endpoint
    try {
      const response = await api.get<{ status: string }>('/');
      return { status: 'ok' };
    } catch {
      throw error;
    }
  }
};

// Auth API with retry logic
export const authAPI = {
  register: async (name: string, email: string, password: string, phone_number?: string): Promise<AuthResponse> => {
    return retryWithBackoff(async () => {
      const response = await api.post<AuthResponse>('/auth/register', {
        name,
        email,
        password,
        phone_number: phone_number || undefined
      });
      return response.data;
    });
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    return retryWithBackoff(async () => {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      return response.data;
    });
  },

  getMe: async (): Promise<{ user: User }> => {
    return retryWithBackoff(async () => {
      const response = await api.get<{ user: User }>('/auth/me');
      return response.data;
    });
  },
};

// Cars API
export const carsAPI = {
  getCars: async (params?: {
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    availability?: string;
    search?: string;
    eventType?: string;
  }): Promise<{ cars: Car[] }> => {
    const response = await api.get<{ cars: Car[] }>('/cars', { params });
    return response.data;
  },

  getCarById: async (id: string): Promise<{ car: Car }> => {
    const response = await api.get<{ car: Car }>(`/cars/${id}`);
    return response.data;
  },

  createCar: async (carData: FormData): Promise<{ car: Car }> => {
    const response = await api.post<{ car: Car }>('/cars', carData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateCar: async (id: string, carData: FormData): Promise<{ car: Car }> => {
    const response = await api.put<{ car: Car }>(`/cars/${id}`, carData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteCar: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/cars/${id}`);
    return response.data;
  },
};

// Requests API
export const requestsAPI = {
  getRequests: async (): Promise<{ requests: Request[] }> => {
    const response = await api.get<{ requests: Request[] }>('/requests');
    return response.data;
  },

  getRequestById: async (id: string): Promise<{ request: Request }> => {
    const response = await api.get<{ request: Request }>(`/requests/${id}`);
    return response.data;
  },

  createRequest: async (requestData: {
    car_id: string;
    request_type: 'rent' | 'buy' | 'sell';
    with_driver?: boolean;
    event_date?: string;
    event_type?: string;
    agreement_text?: string;
  }): Promise<{ message: string; request: Request }> => {
    const response = await api.post<{ message: string; request: Request }>(
      '/requests',
      requestData
    );
    return response.data;
  },

  updateRequestStatus: async (
    id: string,
    status: Request['status']
  ): Promise<{ request: Request }> => {
    const response = await api.put<{ request: Request }>(`/requests/${id}/status`, { status });
    return response.data;
  },

  deleteRequest: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/requests/${id}`);
    return response.data;
  },
};

// Contact API
export const contactAPI = {
  sendMessage: async (data: { name: string; email: string; message: string }): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/contact', data);
    return response.data;
  },
};

export default api;
