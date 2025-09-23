import React, { useState } from "react";
import { motion } from "framer-motion";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import "./ChatPanel.scss";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateBotResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes("spending") || input.includes("expense")) {
      return "Based on your recent transactions, your top spending categories are:\n\n1. **Food & Dining**: $1,200 (38%)\n2. **Transportation**: $800 (25%)\n3. **Shopping**: $600 (19%)\n4. **Entertainment**: $400 (13%)\n5. **Bills & Utilities**: $200 (6%)\n\nWould you like me to analyze any specific category or time period?";
    }

    if (input.includes("budget") || input.includes("save")) {
      return "Great question about budgeting! Based on your income of $4,200/month and expenses of $3,150/month, you're saving about 25% of your income.\n\n**Budget Recommendations:**\n- Food: $1,000 (currently $1,200) - Try meal planning\n- Transportation: $700 (currently $800) - Consider carpooling\n- Entertainment: $300 (currently $400) - Look for free activities\n\nThis could increase your savings rate to 30%. Would you like specific tips for any category?";
    }

    if (input.includes("income") || input.includes("salary")) {
      return "Your income analysis:\n\n**Monthly Income**: $4,200\n**Income Sources:**\n- Primary Salary: $3,800 (90%)\n- Side Projects: $300 (7%)\n- Investments: $100 (3%)\n\n**Growth**: +5.2% compared to last month\n\nYour income is quite stable! Would you like suggestions on increasing your side income?";
    }

    return "I understand you're asking about your finances. I can help you with:\n\n• **Spending Analysis** - Track where your money goes\n• **Budget Planning** - Create and manage budgets\n• **Savings Goals** - Set and monitor financial targets\n• **Transaction Search** - Find specific purchases\n• **Financial Insights** - Get personalized recommendations\n\nWhat specific area would you like to explore?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSuggestionClick = (question: string) => {
    setInputValue(question);
  };

  const suggestedQuestions = [
    "Show my spending this month",
    "How can I save more money?",
    "What's my biggest expense category?",
    "Create a budget for next month",
  ];

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const minimizedVariants = {
    minimized: {
      height: "60px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    expanded: {
      height: "700px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="chat-panel"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={panelVariants}
    >
      <motion.div
        className={`chat-panel__container ${
          isMinimized ? "chat-panel__container--minimized" : ""
        }`}
        variants={minimizedVariants}
        animate={isMinimized ? "minimized" : "expanded"}
      >
        <ChatHeader
          isMinimized={isMinimized}
          onToggleMinimize={toggleMinimize}
          onClose={onClose}
        />

        {!isMinimized && (
          <>
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              suggestedQuestions={suggestedQuestions}
              onSuggestionClick={handleSuggestionClick}
            />

            <ChatInput
              inputValue={inputValue}
              isRecording={isRecording}
              isOpen={isOpen}
              isMinimized={isMinimized}
              onInputChange={setInputValue}
              onSendMessage={handleSendMessage}
              onToggleRecording={toggleRecording}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatPanel;
