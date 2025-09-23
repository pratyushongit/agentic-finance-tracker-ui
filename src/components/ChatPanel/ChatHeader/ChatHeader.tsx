import React from 'react';
import { Bot, X, Minimize2 } from 'lucide-react';
import './ChatHeader.scss';

interface ChatHeaderProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  onToggleMinimize,
  onClose,
}) => {
  return (
    <div className="chat-panel__header">
      <div className="chat-panel__title">
        <Bot className="chat-panel__bot-icon" size={30} />
        <div>
          <h3>AI Finance Assistant</h3>
          {!isMinimized && (
            <div className="chat-panel__status">
              <div className="status-indicator status-indicator--online" />
              <span>Online</span>
            </div>
          )}
        </div>
      </div>
      <div className="chat-panel__controls">
        <button
          className="chat-panel__control-btn"
          onClick={onToggleMinimize}
          aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
        >
          <Minimize2 size={20} />
        </button>
        <button
          className="chat-panel__control-btn"
          onClick={onClose}
          aria-label="Close chat"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
