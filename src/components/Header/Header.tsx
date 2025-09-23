import React, { useState, useRef, useEffect } from 'react'
import { Menu, Bell, Moon, Sun } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import NotificationPanel, { Notification } from '../NotificationPanel/NotificationPanel'
import './Header.scss'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'budget',
      title: 'Budget Alert',
      message: 'You\'ve spent 85% of your monthly food budget',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      amount: 1020
    },
    {
      id: '2',
      type: 'transaction',
      title: 'Large Transaction',
      message: 'New transaction detected: Online Shopping',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      amount: -299.99
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Savings Goal',
      message: 'Congratulations! You\'ve reached 75% of your monthly savings goal',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      amount: 1500
    },
    {
      id: '4',
      type: 'alert',
      title: 'Unusual Activity',
      message: 'Multiple transactions detected in Entertainment category',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: true
    }
  ])
  
  const notificationRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark')
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
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

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const handleViewAll = () => {
    setShowNotifications(false)
    navigate('/notifications')
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header__left">
        <button 
          className="header__menu-btn lg:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="header__right">
        <button
          className="header__action-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="header__notifications" ref={notificationRef}>
          <button 
            className={`header__action-btn ${showNotifications ? 'header__action-btn--active' : ''}`}
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="header__notification-badge">{unreadCount}</span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <NotificationPanel
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onDismissNotification={dismissNotification}
                onClose={() => setShowNotifications(false)}
                onViewAll={handleViewAll}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="header__user">
          <button className="header__user-btn" aria-label="User menu">
            <span>PB</span>
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
