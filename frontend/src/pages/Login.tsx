import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useServerStatus } from '../hooks/useServerStatus';
import { healthCheck } from '../services/api';
import { useNotification } from '../context/NotificationContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(false);
  const { status: serverStatus, checkServerStatus } = useServerStatus();

  // IMPORTANT: All hooks must be called before any conditional returns
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      if (isAdmin) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate]);

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleCheckConnection = async () => {
    setCheckingConnection(true);
    setError('');
    try {
      await healthCheck();
      await checkServerStatus();
      setError('');
    } catch (err: any) {
      setError('Cannot reach server. Please check your network connection and ensure the backend is running.');
    } finally {
      setCheckingConnection(false);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError('');
      const user = await login(data.email, data.password);
      
      // Wait a bit longer to ensure React state has updated
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Show success notification
      showNotification('Login successful! Welcome back.', 'success');
      
      // Double-check user role before navigation
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('Navigating after login. User role:', parsedUser.role);
        
        if (parsedUser.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        // Fallback to user object from login response
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      }
    } catch (err: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
        // Add details if available (for development or database errors)
        if (err.response.data.details) {
          if (process.env.NODE_ENV === 'development') {
            errorMessage += ` (${err.response.data.details})`;
          } else if (err.response.data.error.includes('Database')) {
            // Show details for database errors even in production for debugging
            errorMessage += `. ${err.response.data.details}`;
          }
        }
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.status === 0 || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
        errorMessage = 'Cannot reach database server. Please check your network connection and database host.';
      }
      
      setError(errorMessage);
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        code: err.code,
        status: err.response?.status
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-8 md:p-10 border border-white/10 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
            <LogIn className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-500/10 to-red-600/5 border-l-4 border-red-500 text-red-400 px-4 py-3 mb-6"
            style={{ borderRadius: '12px' }}
          >
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
              <div className="flex-1">
                <p className="text-red-400 font-medium">{error}</p>
                {(error.includes('Cannot reach') || error.includes('network') || error.includes('server')) && (
                  <div className="mt-3 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleCheckConnection}
                      disabled={checkingConnection}
                      className="inline-flex items-center justify-center px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {checkingConnection ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        <>
                          <Wifi className="w-4 h-4 mr-2" />
                          Check Connection
                        </>
                      )}
                    </button>
                    <a
                      href="https://github.com/your-repo/docs/troubleshooting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-purple-card hover:bg-purple-card/80 border border-purple-electric/30 rounded-lg text-purple-electric text-sm font-medium transition-all duration-200"
                    >
                      Troubleshooting Guide
                    </a>
                  </div>
                )}
                {error.includes('Database connection') && (
                  <p className="text-red-400/70 text-sm mt-2">
                    Please check your database configuration. See QUICK_DATABASE_SETUP.md for help.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email')}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                {...register('password')}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || serverStatus === 'offline'}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed relative overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center relative z-10">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting to server...
              </span>
            ) : serverStatus === 'offline' ? (
              <span className="flex items-center justify-center">
                <WifiOff className="w-5 h-5 mr-2" />
                Server Offline
              </span>
            ) : (
              'Sign In'
            )}
            {loading && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
            Create one here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
