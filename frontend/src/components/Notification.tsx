import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === 'success'
      ? 'bg-green-500/20 border-green-500/50'
      : type === 'error'
      ? 'bg-red-500/20 border-red-500/50'
      : 'bg-blue-500/20 border-blue-500/50';

  const textColor =
    type === 'success'
      ? 'text-green-400'
      : type === 'error'
      ? 'text-red-400'
      : 'text-blue-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, x: '-50%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} border rounded-xl px-6 py-4 shadow-lg backdrop-blur-sm min-w-[300px] max-w-[500px]`}
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className={`w-5 h-5 ${textColor} flex-shrink-0`} />
        <p className={`${textColor} font-medium flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className={`${textColor} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface NotificationManagerProps {
  notifications: Array<{ id: string; message: string; type?: 'success' | 'error' | 'info' }>;
  onRemove: (id: string) => void;
}

export const NotificationManager: React.FC<NotificationManagerProps> = ({
  notifications,
  onRemove,
}) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className="pointer-events-auto mb-2"
            style={{ marginTop: `${index * 80}px` }}
          >
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => onRemove(notification.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
