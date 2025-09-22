import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import './Layout.scss'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="layout__main">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <motion.main 
          className="layout__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}

export default Layout
