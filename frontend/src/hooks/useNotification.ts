import { useState, useCallback } from 'react';

interface Notification {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Math.random().toString(36).substring(7);
      setNotifications((prev) => [...prev, { id, message, type }]);
      return id;
    },
    []
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification,
  };
};
