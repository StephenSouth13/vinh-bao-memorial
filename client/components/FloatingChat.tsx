"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Star,
  Info,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot" | "admin";
  timestamp: Date;
  mode: "chatbot" | "direct";
}

interface DirectMessage {
  id: string;
  name: string;
  email: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  adminResponse?: string;
}

const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [mode, setMode] = useState<"chatbot" | "direct">("chatbot");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Chatbot knowledge base
  const chatbotResponses = {
    greeting: [
      "Xin chào! Tôi là trợ lý ảo của trang Tưởng Niệm Liệt Sĩ. Tôi có thể giúp bạn tìm hiểu về các nghĩa trang, thông tin liệt sĩ và các tính năng của website.",
      "Chào mừng bạn đến với trang Tưởng Niệm Liệt Sĩ! Tôi có thể hỗ trợ bạn tìm kiếm thông tin về các anh hùng liệt sĩ và sử dụng các tính năng của website.",
    ],
    features: [
      "Website có 6 nghĩa trang liệt sĩ tại Vĩnh Bảo, Hải Phòng:\n• Nghĩa trang Tân Liên (91 mộ)\n• Nghĩa trang Tam Đa (280 mộ)\n• Nghĩa trang Thị Trấn (176 mộ)\n• Nghĩa trang Tân Hưng (180 mộ)\n• Nghĩa trang Vinh Quang (80 mộ)\n• Nghĩa trang Nhân Hòa (198 mộ)",
      "Các tính năng chính:\n• Sơ đồ mộ tương tác với nhiều layout khác nhau\n• Tìm kiếm liệt sĩ theo tên với highlight vị trí\n• Thông tin chi tiết về từng liệt sĩ\n• Hệ thống CMS để quản lý dữ liệu\n• Giao diện responsive trên mọi thiết bị",
    ],
    search: [
      "Để tìm kiếm liệt sĩ:\n1. Vào trang chi tiết nghĩa trang\n2. Sử dụng thanh tìm kiếm ở phía trên\n3. Nhập tên liệt sĩ (có thể nhập một phần tên)\n4. Hệ thống sẽ highlight vị trí mộ trên sơ đồ\n5. Click vào ô mộ để xem thông tin chi tiết",
    ],
    technology: [
      "Website được xây dựng bằng:\n• Frontend: React 18 + TypeScript + Tailwind CSS\n• Animations: Framer Motion\n• Build: Vite\n• Package Manager: PNPM\n• Deployment: Vercel\n• Design: Memorial theme với màu sắc trang nghiêm",
    ],
    purpose: [
      "Mục tiêu của website:\n• Tưởng niệm và tri ân các anh hùng liệt sĩ\n• Gìn giữ thông tin lịch sử cho thế hệ tương lai\n• Hỗ trợ gia đình liệt sĩ tìm kiếm thông tin\n• Giáo dục về lòng biết ơn và tinh thần yêu nước\n\n'Tổ quốc ghi công - Nhân dân ghi ơn'",
    ],
    contact: [
      "Thông tin liên hệ:\n• Website: Memorial Website\n• Phạm vi: Vĩnh Bảo, Hải Phòng\n• Mục đích: Tưởng niệm liệt sĩ\n\nBạn có thể chuyển sang chế độ 'Tin nhắn trực tiếp' để gửi câu hỏi cụ thể cho đội ngũ quản lý.",
    ],
    default: [
      "Tôi có thể giúp bạn tìm hiểu về:\n• Thông tin các nghĩa trang\n• Cách sử dụng tính năng tìm kiếm\n• Công nghệ website\n• Mục đích và ý nghĩa dự án\n\nBạn có thể hỏi cụ thể hoặc chuyển sang chế độ 'Tin nhắn trực tiếp' để liên hệ với quản trị viên.",
    ],
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: chatbotResponses.greeting[0],
        sender: "bot",
        timestamp: new Date(),
        mode: "chatbot",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const getChatbotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("nghĩa trang") ||
      message.includes("bao nhiêu") ||
      message.includes("danh sách")
    ) {
      return chatbotResponses.features[0];
    }

    if (
      message.includes("tính năng") ||
      message.includes("làm gì") ||
      message.includes("sử dụng")
    ) {
      return chatbotResponses.features[1];
    }

    if (
      message.includes("tìm kiếm") ||
      message.includes("tìm") ||
      message.includes("search")
    ) {
      return chatbotResponses.search[0];
    }

    if (
      message.includes("công nghệ") ||
      message.includes("technology") ||
      message.includes("xây dựng") ||
      message.includes("react")
    ) {
      return chatbotResponses.technology[0];
    }

    if (
      message.includes("mục đích") ||
      message.includes("tại sao") ||
      message.includes("ý nghĩa") ||
      message.includes("purpose")
    ) {
      return chatbotResponses.purpose[0];
    }

    if (
      message.includes("liên hệ") ||
      message.includes("contact") ||
      message.includes("hỗ trợ")
    ) {
      return chatbotResponses.contact[0];
    }

    if (
      message.includes("chào") ||
      message.includes("hello") ||
      message.includes("hi")
    ) {
      return chatbotResponses.greeting[1];
    }

    return chatbotResponses.default[0];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      mode,
    };

    setMessages((prev) => [...prev, userMessage]);

    if (mode === "chatbot") {
      // Chatbot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getChatbotResponse(inputMessage),
          sender: "bot",
          timestamp: new Date(),
          mode: "chatbot",
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    } else {
      // Direct message - save for admin response
      if (userName && userEmail) {
        const directMessage: DirectMessage = {
          id: Date.now().toString(),
          name: userName,
          email: userEmail,
          content: inputMessage,
          timestamp: new Date(),
          isRead: false,
        };

        // Save to localStorage for CMS
        const existingMessages = JSON.parse(
          localStorage.getItem("directMessages") || "[]",
        );
        localStorage.setItem(
          "directMessages",
          JSON.stringify([...existingMessages, directMessage]),
        );

        // Auto response
        setTimeout(() => {
          const autoResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: `Cảm ơn ${userName} đã gửi tin nhắn! Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi qua email ${userEmail} trong thời gian sớm nhất.`,
            sender: "admin",
            timestamp: new Date(),
            mode: "direct",
          };
          setMessages((prev) => [...prev, autoResponse]);
        }, 1000);
      }
    }

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
      setHasNewMessage(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-memorial-primary text-memorial-secondary p-4 rounded-full shadow-2xl hover:bg-memorial-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={hasNewMessage ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: hasNewMessage ? Infinity : 0 }}
      >
        <MessageCircle className="w-6 h-6" />
        {hasNewMessage && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-memorial-accent/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-memorial-primary to-memorial-primary/90 text-memorial-secondary p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-memorial-bronze rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hỗ Trợ Tưởng Niệm</h3>
                    <p className="text-xs text-memorial-accent">
                      {mode === "chatbot" ? "Trợ lý ảo" : "Tin nhắn trực tiếp"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-memorial-primary/20 rounded transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-memorial-primary/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-memorial-primary/20 rounded-lg p-1 mt-3">
                <button
                  onClick={() => setMode("chatbot")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${
                    mode === "chatbot"
                      ? "bg-memorial-secondary text-memorial-primary"
                      : "text-memorial-accent hover:text-memorial-secondary"
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span className="text-sm font-medium">Chatbot</span>
                </button>
                <button
                  onClick={() => setMode("direct")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-colors ${
                    mode === "direct"
                      ? "bg-memorial-secondary text-memorial-primary"
                      : "text-memorial-accent hover:text-memorial-secondary"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Trực tiếp</span>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* User Info for Direct Messages */}
                {mode === "direct" && (!userName || !userEmail) && (
                  <div className="p-4 bg-memorial-accent/10 border-b">
                    <p className="text-sm text-memorial-primary mb-3 font-medium">
                      Vui lòng cung cấp thông tin để chúng tôi có thể phản hồi:
                    </p>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Họ và tên"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none"
                      />
                      <input
                        type="email"
                        placeholder="Email liên hệ"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-memorial-primary text-memorial-secondary"
                            : message.sender === "bot"
                              ? "bg-white dark:bg-gray-800 border border-memorial-accent/20"
                              : "bg-memorial-bronze text-memorial-secondary"
                        }`}
                      >
                        {message.sender !== "user" && (
                          <div className="flex items-center gap-2 mb-2">
                            {message.sender === "bot" ? (
                              <Bot className="w-4 h-4 text-memorial-bronze" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            <span className="text-xs font-medium">
                              {message.sender === "bot"
                                ? "Trợ lý ảo"
                                : "Quản trị viên"}
                            </span>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-line">
                          {message.content}
                        </p>
                        <div className="flex items-center gap-1 mt-2 opacity-70">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">
                            {message.timestamp.toLocaleTimeString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {mode === "direct" && (!userName || !userEmail) ? (
                    <div className="text-center">
                      <p className="text-sm text-gray-500">
                        Vui lòng nhập thông tin liên hệ phía trên
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                          mode === "chatbot"
                            ? "Hỏi về nghĩa trang, liệt sĩ, tính năng..."
                            : "Nhập tin nhắn của bạn..."
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                        className="px-4 py-2 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
