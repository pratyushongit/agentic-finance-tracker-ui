import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User } from "lucide-react";
import "./ChatMessages.scss";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  suggestedQuestions: string[];
  onSuggestionClick: (question: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  suggestedQuestions,
  onSuggestionClick,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-panel__messages">
      {messages.length === 0 ? (
        <div className="chat-panel__welcome-container">
          <motion.div
            className="chat-panel__welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="welcome__content">
              <div className="welcome__icon-container">
                <div className="welcome__icon-bg">
                  <Bot size={28} className="welcome__icon" />
                </div>
              </div>
              <h2 className="welcome__title">AI Finance Assistant</h2>
              <p className="welcome__description">
                Hello! I'm your AI finance assistant. I can help you analyze
                your spending patterns, create budgets, and answer questions
                about your financial data. What would you like to know?
              </p>
            </div>
          </motion.div>

          {/* Suggestions */}
          <AnimatePresence>
            <motion.div
              className="chat-panel__suggestions"
              initial={{
                opacity: 0,
                scaleY: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
                marginTop: 0,
                marginBottom: 0,
                paddingTop: "var(--spacing-md)",
                paddingBottom: "var(--spacing-md)",
              }}
              exit={{
                opacity: 0,
                scaleY: 0,
                marginTop: 0,
                marginBottom: 0,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ transformOrigin: "top" }}
            >
              <div className="suggestions-grid">
                {suggestedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    className="suggestion-chip"
                    onClick={() => onSuggestionClick(question)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <>
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
                  {message.type === "user" ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div className="message__content">
                  <div className="message__bubble">
                    {message.content.split("\n").map((line, index) => {
                      if (line.startsWith("**") && line.endsWith("**")) {
                        return <strong key={index}>{line.slice(2, -2)}</strong>;
                      }
                      if (line.startsWith("• ")) {
                        return <li key={index}>{line.slice(2)}</li>;
                      }
                      if (line.match(/^\d+\./)) {
                        return (
                          <div key={index} className="message__list-item">
                            {line}
                          </div>
                        );
                      }
                      return line ? (
                        <p key={index}>{line}</p>
                      ) : (
                        <br key={index} />
                      );
                    })}
                  </div>
                  <span className="message__timestamp">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
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
                <Bot size={16} />
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
        </>
      )}
    </div>
  );
};

export default ChatMessages;
