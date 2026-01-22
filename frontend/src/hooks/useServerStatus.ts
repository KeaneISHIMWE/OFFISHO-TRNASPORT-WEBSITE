import { useState, useEffect } from 'react';
import api from '../services/api';

export type ServerStatus = 'online' | 'offline' | 'checking';

export const useServerStatus = () => {
  const [status, setStatus] = useState<ServerStatus>('checking');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkServerStatus = async () => {
    setStatus('checking');
    try {
      // Try health check endpoint first
      try {
        await api.get('/health', { timeout: 5000 });
      } catch {
        // If /health doesn't exist, try root endpoint
        await api.get('/', { timeout: 5000 });
      }
      setStatus('online');
      setLastChecked(new Date());
    } catch (error) {
      setStatus('offline');
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    // Check on mount
    checkServerStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    status,
    lastChecked,
    checkServerStatus,
  };
};
