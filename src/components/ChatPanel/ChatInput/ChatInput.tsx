import React, { useRef, useEffect } from "react";
import { Send, Paperclip, Mic, MicOff } from "lucide-react";
import "./ChatInput.scss";

interface ChatInputProps {
  inputValue: string;
  isRecording: boolean;
  isOpen: boolean;
  isMinimized: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onToggleRecording: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  isRecording,
  isOpen,
  isMinimized,
  onInputChange,
  onSendMessage,
  onToggleRecording,
  onKeyPress,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <div className="chat-panel__input">
      <div className="input-container">
        <button className="input-action-btn" aria-label="Attach file">
          <Paperclip size={16} />
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Ask about your finances..."
          className="chat-input"
        />

        <button
          className={`input-action-btn ${
            isRecording ? "input-action-btn--recording" : ""
          }`}
          onClick={onToggleRecording}
          aria-label="Voice input"
        >
          {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
        </button>

        <button
          onClick={onSendMessage}
          disabled={!inputValue.trim()}
          className="send-btn"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
