import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  MessageCircle, 
  Upload, 
  BarChart3, 
  Bell, 
  X,
  TrendingUp
} from 'lucide-react'
import './Sidebar.scss'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigationItems = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/',
    description: 'Overview & Analytics'
  },
  {
    title: 'Chat Interface',
    icon: MessageCircle,
    path: '/chat',
    description: 'Natural Language Queries'
  },
  {
    title: 'Input Sources',
    icon: Upload,
    path: '/input-sources',
    description: 'Data Import & Management'
  },
  {
    title: 'Visualization',
    icon: BarChart3,
    path: '/visualization',
    description: 'Charts & Reports'
  },
  {
    title: 'Alerts & Notifications',
    icon: Bell,
    path: '/alerts',
    description: 'Budget & Anomaly Alerts'
  }
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  }

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar__overlay lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className="sidebar"
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={sidebarVariants}
      >
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <div className="sidebar__logo-icon">
              <TrendingUp size={24} />
            </div>
            <span className="sidebar__logo-text">Finance Agent</span>
          </div>
          
          <button 
            className="sidebar__close-btn lg:hidden"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`
              }
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <item.icon className="sidebar__nav-icon" size={20} />
              <div className="sidebar__nav-content">
                <span className="sidebar__nav-title">{item.title}</span>
                <span className="sidebar__nav-description">{item.description}</span>
              </div>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user-info">
            <div className="sidebar__user-avatar">
              <span>PB</span>
            </div>
            <div className="sidebar__user-details">
              <span className="sidebar__user-name">Pratyush Biswas</span>
              <span className="sidebar__user-email">pratyush@example.com</span>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
