import React from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Check,
  Bell,
  AlertCircle,
  DollarSign,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import './NotificationPanel.scss';

export interface Notification {
  id: string;
  type: 'budget' | 'transaction' | 'alert' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  amount?: number;
}

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismissNotification: (id: string) => void;
  onClose: () => void;
  onViewAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismissNotification,
  onClose,
  onViewAll,
}) => {
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'budget':
        return <AlertCircle size={20} />;
      case 'transaction':
        return <DollarSign size={20} />;
      case 'achievement':
        return <TrendingUp size={20} />;
      case 'alert':
        return <CreditCard size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <motion.div
      className="notification-panel"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="notification-panel__header">
        <h3>Notifications</h3>
        <div className="notification-panel__actions">
          {unreadCount > 0 && (
            <button
              className="notification-panel__mark-all"
              onClick={onMarkAllAsRead}
            >
              <Check size={16} />
              Mark all read
            </button>
          )}
          <button className="notification-panel__close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="notification-panel__content">
        {notifications.length === 0 ? (
          <div className="notification-panel__empty">
            <Bell size={48} />
            <p>No notifications</p>
            <span>You're all caught up!</span>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                className={`notification-item ${
                  !notification.isRead ? 'notification-item--unread' : ''
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                whileHover={{ backgroundColor: 'var(--gray-50)' }}
                onClick={() =>
                  !notification.isRead && onMarkAsRead(notification.id)
                }
              >
                <div
                  className={`notification-item__icon notification-item__icon--${notification.type}`}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div className="notification-item__content">
                  <div className="notification-item__header">
                    <h4>{notification.title}</h4>
                    <span className="notification-item__time">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                  </div>

                  <p className="notification-item__message">
                    {notification.message}
                  </p>

                  {notification.amount && (
                    <div className="notification-item__amount">
                      <span
                        className={
                          notification.amount > 0 ? 'positive' : 'negative'
                        }
                      >
                        {notification.amount > 0 ? '+' : ''}$
                        {Math.abs(notification.amount).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  className="notification-item__dismiss"
                  onClick={e => {
                    e.stopPropagation();
                    onDismissNotification(notification.id);
                  }}
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="notification-panel__footer">
          <button className="notification-panel__view-all" onClick={onViewAll}>
            View All Notifications
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default NotificationPanel;
