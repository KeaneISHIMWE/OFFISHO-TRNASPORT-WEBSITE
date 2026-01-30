import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { NotificationManager } from '../components/Notification';

interface Notification {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface NotificationContextType {
  showNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Math.random().toString(36).substring(7);
      setNotifications((prev) => [...prev, { id, message, type }]);
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationManager notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  );
};
