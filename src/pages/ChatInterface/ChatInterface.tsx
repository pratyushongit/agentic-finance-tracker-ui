import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Paperclip, Mic, MicOff } from 'lucide-react'
import './ChatInterface.scss'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isLoading?: boolean
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI finance assistant. I can help you analyze your spending patterns, create budgets, and answer questions about your financial data. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateBotResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('spending') || input.includes('expense')) {
      return 'Based on your recent transactions, your top spending categories are:\n\n1. **Food & Dining**: $1,200 (38%)\n2. **Transportation**: $800 (25%)\n3. **Shopping**: $600 (19%)\n4. **Entertainment**: $400 (13%)\n5. **Bills & Utilities**: $200 (6%)\n\nWould you like me to analyze any specific category or time period?'
    }
    
    if (input.includes('budget') || input.includes('save')) {
      return 'Great question about budgeting! Based on your income of $4,200/month and expenses of $3,150/month, you\'re saving about 25% of your income.\n\n**Budget Recommendations:**\n- Food: $1,000 (currently $1,200) - Try meal planning\n- Transportation: $700 (currently $800) - Consider carpooling\n- Entertainment: $300 (currently $400) - Look for free activities\n\nThis could increase your savings rate to 30%. Would you like specific tips for any category?'
    }
    
    if (input.includes('income') || input.includes('salary')) {
      return 'Your income analysis:\n\n**Monthly Income**: $4,200\n**Income Sources:**\n- Primary Salary: $3,800 (90%)\n- Side Projects: $300 (7%)\n- Investments: $100 (3%)\n\n**Growth**: +5.2% compared to last month\n\nYour income is quite stable! Would you like suggestions on increasing your side income?'
    }
    
    return 'I understand you\'re asking about your finances. I can help you with:\n\n• **Spending Analysis** - Track where your money goes\n• **Budget Planning** - Create and manage budgets\n• **Savings Goals** - Set and monitor financial targets\n• **Transaction Search** - Find specific purchases\n• **Financial Insights** - Get personalized recommendations\n\nWhat specific area would you like to explore?'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Voice recording logic would go here
  }

  const suggestedQuestions = [
    "Show my spending this month",
    "How can I save more money?",
    "What's my biggest expense category?",
    "Create a budget for next month",
    "Find all restaurant transactions"
  ]

  return (
    <motion.div 
      className="chat-interface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-interface__header">
        <div className="chat-interface__title">
          <Bot className="chat-interface__bot-icon" size={24} />
          <div>
            <h1>AI Finance Assistant</h1>
            <p>Ask me anything about your finances</p>
          </div>
        </div>
        <div className="chat-interface__status">
          <div className="status-indicator status-indicator--online" />
          <span>Online</span>
        </div>
      </div>

      <div className="chat-interface__messages">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              className={`message message--${message.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message__avatar">
                {message.type === 'user' ? (
                  <User size={20} />
                ) : (
                  <Bot size={20} />
                )}
              </div>
              <div className="message__content">
                <div className="message__bubble">
                  {message.content.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <strong key={index}>{line.slice(2, -2)}</strong>
                    }
                    if (line.startsWith('• ')) {
                      return <li key={index}>{line.slice(2)}</li>
                    }
                    if (line.match(/^\d+\./)) {
                      return <div key={index} className="message__list-item">{line}</div>
                    }
                    return line ? <p key={index}>{line}</p> : <br key={index} />
                  })}
                </div>
                <span className="message__timestamp">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="message message--bot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message__avatar">
              <Bot size={20} />
            </div>
            <div className="message__content">
              <div className="message__bubble message__bubble--typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="chat-interface__suggestions">
          <h3>Try asking:</h3>
          <div className="suggestions-grid">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-chip"
                onClick={() => setInputValue(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-interface__input">
        <div className="input-container">
          <button className="input-action-btn" aria-label="Attach file">
            <Paperclip size={20} />
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your finances..."
            className="chat-input"
          />
          
          <button 
            className={`input-action-btn ${isRecording ? 'input-action-btn--recording' : ''}`}
            onClick={toggleRecording}
            aria-label="Voice input"
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="send-btn"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatInterface
