import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import ChatInterface from './pages/ChatInterface/ChatInterface'
import InputSources from './pages/InputSources/InputSources'
import Visualization from './pages/Visualization/Visualization'
import Alerts from './pages/Alerts/Alerts'

function App() {
  return (
    <motion.div 
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/input-sources" element={<InputSources />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </Layout>
    </motion.div>
  )
}

export default App
