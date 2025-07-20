"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, X, LogIn, Shield, Settings } from "lucide-react";
import CMS from "./CMS";

const AdminLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [isCMSOpen, setIsCMSOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple authentication check
    if (email === "adminvinhbao@gmail.com" && password === "123456") {
      setIsLoggedIn(true);
      setIsOpen(false);
      setEmail("");
      setPassword("");
      // In a real app, you would set authentication tokens here
      localStorage.setItem("adminAuth", "true");
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminAuth");
  };

  // Check if already logged in on component mount
  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth") === "true";
    setIsLoggedIn(isAuth);
  }, []);

  return (
    <>
      {/* Admin Button */}
      {!isLoggedIn ? (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-memorial-primary text-memorial-secondary p-3 rounded-full shadow-lg hover:bg-memorial-primary/90 transition-colors z-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Đăng nhập CMS"
        >
          <User className="w-5 h-5" />
        </motion.button>
      ) : (
        <motion.div
          className="fixed bottom-4 right-4 bg-memorial-bronze text-memorial-secondary rounded-full shadow-lg z-40 flex items-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <button
            onClick={() => setIsCMSOpen(true)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-memorial-primary/20 transition-colors"
            title="Mở CMS"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">CMS Admin</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-2 py-2 hover:bg-memorial-primary/20 transition-colors border-l border-memorial-primary/20"
            title="Đăng xuất"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Login Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-memorial-accent p-2 rounded-lg">
                      <LogIn className="w-5 h-5 text-memorial-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-memorial-primary dark:text-memorial-secondary">
                        Đăng nhập CMS
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quản lý nội dung website
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adminvinhbao@gmail.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mật khẩu
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-memorial-primary text-memorial-secondary py-2 px-4 rounded-lg hover:bg-memorial-primary/90 transition-colors font-medium"
                  >
                    Đăng nhập
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CMS Interface */}
      <CMS isOpen={isCMSOpen} onClose={() => setIsCMSOpen(false)} />
    </>
  );
};

export default AdminLogin;
