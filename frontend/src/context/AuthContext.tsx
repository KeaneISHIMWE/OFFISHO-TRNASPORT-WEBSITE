import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthResponse } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, phone_number?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Verify token is still valid
        authAPI
          .getMe()
          .then((data) => {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          })
          .catch(() => {
            // Token invalid, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response: AuthResponse = await authAPI.login(email, password);
      console.log('Login successful. User:', response.user);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
      // Ensure state is updated before returning
      await new Promise(resolve => setTimeout(resolve, 50));
      return response.user;
    } catch (error: any) {
      // Re-throw with better error message
      const errorMessage = error.response?.data?.error || error.message || 'Login failed';
      const errorDetails = error.response?.data?.details;
      
      if (errorDetails && process.env.NODE_ENV === 'development') {
        throw new Error(`${errorMessage}: ${errorDetails}`);
      }
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, phone_number?: string): Promise<void> => {
    const response: AuthResponse = await authAPI.register(name, email, password, phone_number);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Protected Route Component
interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();

  // Check localStorage as fallback (for immediate checks after login)
  const token = localStorage.getItem('token');
  const storedUserStr = localStorage.getItem('user');
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
  const hasToken = !!token;
  const storedIsAdmin = storedUser?.role === 'admin';

  useEffect(() => {
    // Debug logging
    console.log('ProtectedRoute check:', { 
      loading, 
      isAuthenticated, 
      isAdmin, 
      userRole: user?.role, 
      requireAdmin,
      hasToken,
      storedUserRole: storedUser?.role
    });
    
    // Only redirect if we're done loading and definitely not authenticated
    // Check both state and localStorage
    if (!loading && !isAuthenticated && !hasToken) {
      console.log('Redirecting to login - not authenticated');
      navigate('/login', { replace: true });
    }
  }, [loading, isAuthenticated, isAdmin, user, requireAdmin, navigate, hasToken, storedUser]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
      </div>
    );
  }

  // If not authenticated (check both state and localStorage), return null (redirect will happen in useEffect)
  if (!isAuthenticated && !hasToken) {
    return null;
  }

  // Check admin requirement (use state first, fallback to localStorage)
  const effectiveIsAdmin = isAdmin || storedIsAdmin;
  const effectiveUserRole = user?.role || storedUser?.role;

  if (requireAdmin && !effectiveIsAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy-blue mb-4">Access Denied</h1>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">Your role: {effectiveUserRole || 'unknown'}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
