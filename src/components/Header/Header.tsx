import React, { useState } from 'react'
import { Menu, Bell, Moon, Sun, User } from 'lucide-react'
import { motion } from 'framer-motion'
import './Header.scss'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark')
  }

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

        <button className="header__action-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="header__notification-badge">3</span>
        </button>

        <div className="header__user">
          <button className="header__user-btn" aria-label="User menu">
            <User size={20} />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
