import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Filter, 
  Search, 
  Check, 
  Trash2,
  Bell,
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  CreditCard,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Notification } from '../../components/NotificationPanel/NotificationPanel'
import './ViewAllNotifications.scss'

const ViewAllNotifications: React.FC = () => {
  const navigate = useNavigate()
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'budget',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your monthly food budget. Consider reducing dining out expenses.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      amount: 1020
    },
    {
      id: '2',
      type: 'transaction',
      title: 'Large Transaction',
      message: 'New transaction detected: Online Shopping at Amazon for electronics.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      amount: -299.99
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Savings Goal',
      message: 'Congratulations! You\'ve reached 75% of your monthly savings goal. Keep it up!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true,
      amount: 1500
    },
    {
      id: '4',
      type: 'alert',
      title: 'Unusual Activity',
      message: 'Multiple transactions detected in Entertainment category. Review your spending.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: '5',
      type: 'transaction',
      title: 'Salary Deposit',
      message: 'Monthly salary has been deposited to your checking account.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isRead: true,
      amount: 4200
    },
    {
      id: '6',
      type: 'budget',
      title: 'Budget Exceeded',
      message: 'You\'ve exceeded your transportation budget by $50 this month.',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isRead: true,
      amount: -50
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | Notification['type']>('all')
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'budget':
        return <AlertCircle size={20} />
      case 'transaction':
        return <DollarSign size={20} />
      case 'achievement':
        return <TrendingUp size={20} />
      case 'alert':
        return <CreditCard size={20} />
      default:
        return <Bell size={20} />
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `${days} ${days === 1 ? 'day' : 'days'} ago`
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(notification => !notification.isRead))
  }

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || notification.type === filterType
    const matchesReadStatus = !showUnreadOnly || !notification.isRead
    
    return matchesSearch && matchesType && matchesReadStatus
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <motion.div 
      className="view-all-notifications"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="view-all-notifications__header" variants={itemVariants}>
        <div className="view-all-notifications__title">
          <button 
            className="view-all-notifications__back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>All Notifications</h1>
            <p>{notifications.length} total • {unreadCount} unread</p>
          </div>
        </div>
        
        <div className="view-all-notifications__actions">
          {unreadCount > 0 && (
            <button 
              className="btn btn--secondary"
              onClick={markAllAsRead}
            >
              <Check size={16} />
              Mark all read
            </button>
          )}
          <button 
            className="btn btn--danger"
            onClick={deleteAllRead}
          >
            <Trash2 size={16} />
            Clear read
          </button>
        </div>
      </motion.div>

      <motion.div className="view-all-notifications__filters" variants={itemVariants}>
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={16} />
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              <option value="all">All Types</option>
              <option value="budget">Budget Alerts</option>
              <option value="transaction">Transactions</option>
              <option value="achievement">Achievements</option>
              <option value="alert">General Alerts</option>
            </select>
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
            />
            <span>Unread only</span>
          </label>
        </div>
      </motion.div>

      <motion.div className="view-all-notifications__content" variants={itemVariants}>
        {filteredNotifications.length === 0 ? (
          <div className="view-all-notifications__empty">
            <Bell size={64} />
            <h3>No notifications found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="notifications-grid">
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`notification-card ${!notification.isRead ? 'notification-card--unread' : ''}`}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                onClick={() => !notification.isRead && markAsRead(notification.id)}
              >
                <div className="notification-card__header">
                  <div className={`notification-card__icon notification-card__icon--${notification.type}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-card__meta">
                    <h3>{notification.title}</h3>
                    <span className="notification-card__time">
                      {formatTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <button
                    className="notification-card__delete"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteNotification(notification.id)
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <p className="notification-card__message">
                  {notification.message}
                </p>

                {notification.amount && (
                  <div className="notification-card__amount">
                    <span className={notification.amount > 0 ? 'positive' : 'negative'}>
                      {notification.amount > 0 ? '+' : ''}${Math.abs(notification.amount).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="notification-card__footer">
                  <span className={`notification-card__type notification-card__type--${notification.type}`}>
                    {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                  </span>
                  {!notification.isRead && (
                    <span className="notification-card__unread-indicator">
                      New
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default ViewAllNotifications
