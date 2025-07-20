"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  Users,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  AlertTriangle,
  Send,
  Mail,
  Clock,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import type { Cemetery, Martyr } from "@/lib/data";
import { cemeteries, getCemeteryBySlug } from "@/lib/data";

interface CMSProps {
  isOpen: boolean;
  onClose: () => void;
}

const CMS: React.FC<CMSProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<
    "cemeteries" | "martyrs" | "messages" | "errors" | "settings"
  >("cemeteries");
  const [selectedCemetery, setSelectedCemetery] = useState<Cemetery | null>(
    null,
  );
  const [editingMartyr, setEditingMartyr] = useState<Martyr | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingMartyr, setIsAddingMartyr] = useState(false);
  const [directMessages, setDirectMessages] = useState<any[]>([]);
  const [errorReport, setErrorReport] = useState({
    title: "",
    description: "",
    steps: "",
    priority: "medium" as "low" | "medium" | "high",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState<Partial<Martyr>>({
    name: "",
    birthYear: undefined,
    deathDate: "",
    hometown: "",
    conflict: "MỸ",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
  });

  // Load direct messages from localStorage
  useEffect(() => {
    const messages = JSON.parse(localStorage.getItem("directMessages") || "[]");
    setDirectMessages(messages);
  }, [isOpen]);

  const handleSendErrorReport = () => {
    const errorData = {
      ...errorReport,
      timestamp: new Date().toISOString(),
      reporter: "CMS Admin",
    };

    // In a real app, this would send email to stephensouth1307@gmail.com
    console.log(
      "Sending error report to stephensouth1307@gmail.com:",
      errorData,
    );

    // Simulate email sending
    alert(
      `Báo cáo lỗi đã được gửi đến stephensouth1307@gmail.com\n\nTitle: ${errorReport.title}\nPriority: ${errorReport.priority}`,
    );

    setErrorReport({
      title: "",
      description: "",
      steps: "",
      priority: "medium",
    });
  };

  const handleRespondToMessage = (messageId: string) => {
    if (!responseMessage.trim()) return;

    // Update message with response
    const updatedMessages = directMessages.map((msg) =>
      msg.id === messageId
        ? { ...msg, adminResponse: responseMessage, isRead: true }
        : msg,
    );

    setDirectMessages(updatedMessages);
    localStorage.setItem("directMessages", JSON.stringify(updatedMessages));

    // In a real app, this would send email to user
    const message = directMessages.find((msg) => msg.id === messageId);
    console.log(`Sending response to ${message?.email}:`, responseMessage);

    alert(`Phản hồi đã được gửi đến ${message?.email}`);
    setResponseMessage("");
  };

  const markMessageAsRead = (messageId: string) => {
    const updatedMessages = directMessages.map((msg) =>
      msg.id === messageId ? { ...msg, isRead: true } : msg,
    );
    setDirectMessages(updatedMessages);
    localStorage.setItem("directMessages", JSON.stringify(updatedMessages));
  };

  // Filter martyrs based on search
  const filteredMartyrs =
    selectedCemetery?.graves?.filter((martyr) =>
      martyr.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const handleSaveMartyr = () => {
    if (selectedCemetery && formData.name) {
      const newMartyr: Martyr = {
        id: `${selectedCemetery.id}-${Date.now()}`,
        name: formData.name,
        birthYear: formData.birthYear,
        deathDate: formData.deathDate || "",
        hometown: formData.hometown || "",
        conflict: formData.conflict || "MỸ",
        remainsInfo: formData.remainsInfo || "CHC",
        graveLocation: formData.graveLocation || {
          row: 1,
          section: "left",
          graveNumber: 1,
        },
        portraitUrl: "/placeholder.svg",
      };

      // Simulate saving (in real app, this would call API)
      console.log("Saving martyr:", newMartyr);

      setIsAddingMartyr(false);
      setEditingMartyr(null);
      setFormData({
        name: "",
        birthYear: undefined,
        deathDate: "",
        hometown: "",
        conflict: "MỸ",
        remainsInfo: "CHC",
        graveLocation: { row: 1, section: "left", graveNumber: 1 },
      });
    }
  };

  const handleDeleteMartyr = (martyrId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thông tin liệt sĩ này?")) {
      console.log("Deleting martyr:", martyrId);
      // Simulate deletion
    }
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(cemeteries, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cemetery-data.json";
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* CMS Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="w-full bg-white dark:bg-gray-900 shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-memorial-primary text-memorial-secondary p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-6 h-6" />
                    <div>
                      <h2 className="text-2xl font-bold">
                        CMS - Quản lý Nghĩa trang
                      </h2>
                      <p className="text-memorial-accent">
                        Hệ thống quản lý nội dung trang tưởng niệm
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-memorial-primary/80 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <button
                    onClick={() => setActiveTab("cemeteries")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === "cemeteries"
                        ? "bg-memorial-secondary text-memorial-primary"
                        : "bg-memorial-primary/20 text-memorial-accent hover:bg-memorial-secondary/20"
                    }`}
                  >
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Nghĩa trang
                  </button>
                  <button
                    onClick={() => setActiveTab("martyrs")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === "martyrs"
                        ? "bg-memorial-secondary text-memorial-primary"
                        : "bg-memorial-primary/20 text-memorial-accent hover:bg-memorial-secondary/20"
                    }`}
                  >
                    <Users className="w-4 h-4 inline mr-2" />
                    Liệt sĩ
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                      activeTab === "messages"
                        ? "bg-memorial-secondary text-memorial-primary"
                        : "bg-memorial-primary/20 text-memorial-accent hover:bg-memorial-secondary/20"
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Tin nhắn
                    {directMessages.filter((msg) => !msg.isRead).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {directMessages.filter((msg) => !msg.isRead).length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("errors")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === "errors"
                        ? "bg-memorial-secondary text-memorial-primary"
                        : "bg-memorial-primary/20 text-memorial-accent hover:bg-memorial-secondary/20"
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    Báo lỗi
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === "settings"
                        ? "bg-memorial-secondary text-memorial-primary"
                        : "bg-memorial-primary/20 text-memorial-accent hover:bg-memorial-secondary/20"
                    }`}
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Cài đặt
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                {/* Cemeteries Tab */}
                {activeTab === "cemeteries" && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cemeteries.map((cemetery) => (
                        <motion.div
                          key={cemetery.id}
                          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary">
                              {cemetery.name}
                            </h3>
                            <button
                              onClick={() => setSelectedCemetery(cemetery)}
                              className="p-2 text-memorial-bronze hover:bg-memorial-accent/20 rounded-full transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                            {cemetery.description}
                          </p>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-memorial-bronze" />
                              <span>{cemetery.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-memorial-bronze" />
                              <span>Thành lập: {cemetery.establishedYear}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-memorial-bronze" />
                              <span>
                                {cemetery.occupiedGraves}/{cemetery.totalGraves}{" "}
                                mộ
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Martyrs Tab */}
                {activeTab === "martyrs" && (
                  <div className="p-6">
                    {/* Cemetery Selection */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary">
                          Chọn nghĩa trang
                        </h3>
                        {selectedCemetery && (
                          <button
                            onClick={() => setIsAddingMartyr(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-memorial-bronze text-white rounded-lg hover:bg-memorial-bronze/90 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Thêm liệt sĩ
                          </button>
                        )}
                      </div>

                      <select
                        value={selectedCemetery?.id || ""}
                        onChange={(e) => {
                          const cemetery = cemeteries.find(
                            (c) => c.id === e.target.value,
                          );
                          setSelectedCemetery(cemetery || null);
                        }}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">-- Chọn nghĩa trang --</option>
                        {cemeteries.map((cemetery) => (
                          <option key={cemetery.id} value={cemetery.id}>
                            {cemetery.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Search and Filter */}
                    {selectedCemetery && (
                      <>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                          <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm kiếm tên liệt sĩ..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                            <button
                              onClick={handleExportData}
                              className="flex items-center gap-2 px-4 py-2 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 transition-colors"
                            >
                              <Download className="w-4 h-4" />
                              Xuất dữ liệu
                            </button>
                          </div>
                        </div>

                        {/* Martyrs List */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary">
                              Danh sách liệt sĩ - {selectedCemetery.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Tổng cộng: {filteredMartyrs.length} liệt sĩ
                            </p>
                          </div>

                          <div className="max-h-96 overflow-y-auto">
                            {filteredMartyrs.map((martyr) => (
                              <div
                                key={martyr.id}
                                className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <div className="flex-1">
                                  <h4 className="font-semibold text-memorial-primary dark:text-memorial-secondary">
                                    {martyr.name}
                                  </h4>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <p>
                                      {martyr.birthYear} - {martyr.deathDate} •{" "}
                                      {martyr.hometown}
                                    </p>
                                    <p>
                                      Vị trí: Hàng {martyr.graveLocation.row} -
                                      Mộ {martyr.graveLocation.graveNumber} (
                                      {martyr.graveLocation.section === "left"
                                        ? "Trái"
                                        : "Phải"}
                                      )
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingMartyr(martyr)}
                                    className="p-2 text-memorial-bronze hover:bg-memorial-accent/20 rounded-full transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteMartyr(martyr.id)
                                    }
                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === "messages" && (
                  <div className="p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary">
                          Tin nhắn từ người dùng
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Phản hồi tin nhắn từ floating chat
                        </p>
                      </div>

                      <div className="max-h-96 overflow-y-auto">
                        {directMessages.length === 0 ? (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Chưa có tin nhắn nào từ người dùng</p>
                          </div>
                        ) : (
                          directMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-4 border-b border-gray-100 dark:border-gray-700 ${
                                !message.isRead
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : ""
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-memorial-primary dark:text-memorial-secondary">
                                    {message.name}
                                  </h4>
                                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center gap-1">
                                      <Mail className="w-4 h-4" />
                                      <span>{message.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {new Date(
                                          message.timestamp,
                                        ).toLocaleString("vi-VN")}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {!message.isRead && (
                                  <button
                                    onClick={() =>
                                      markMessageAsRead(message.id)
                                    }
                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors"
                                  >
                                    Đánh dấu đã đọc
                                  </button>
                                )}
                              </div>

                              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 mb-3">
                                <p className="text-gray-700 dark:text-gray-300">
                                  {message.content}
                                </p>
                              </div>

                              {message.adminResponse ? (
                                <div className="bg-memorial-accent/20 rounded-lg p-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-800 dark:text-green-400">
                                      Đã phản hồi
                                    </span>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {message.adminResponse}
                                  </p>
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <textarea
                                    value={responseMessage}
                                    onChange={(e) =>
                                      setResponseMessage(e.target.value)
                                    }
                                    placeholder="Nhập phản hồi cho người dùng..."
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white resize-none"
                                    rows={3}
                                  />
                                  <button
                                    onClick={() =>
                                      handleRespondToMessage(message.id)
                                    }
                                    disabled={!responseMessage.trim()}
                                    className="flex items-center gap-2 px-4 py-2 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <Send className="w-4 h-4" />
                                    Gửi phản hồi
                                  </button>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Report Tab */}
                {activeTab === "errors" && (
                  <div className="p-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                        <div>
                          <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary">
                            Báo cáo lỗi cho IT
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Gửi báo cáo lỗi đến stephensouth1307@gmail.com
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tiêu đề lỗi *
                          </label>
                          <input
                            type="text"
                            value={errorReport.title}
                            onChange={(e) =>
                              setErrorReport({
                                ...errorReport,
                                title: e.target.value,
                              })
                            }
                            placeholder="Tóm tắt ngắn gọn về lỗi"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mức độ ưu tiên
                          </label>
                          <select
                            value={errorReport.priority}
                            onChange={(e) =>
                              setErrorReport({
                                ...errorReport,
                                priority: e.target.value as
                                  | "low"
                                  | "medium"
                                  | "high",
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                          >
                            <option value="low">
                              Thấp - Không ảnh hưởng nghiêm trọng
                            </option>
                            <option value="medium">
                              Trung bình - Ảnh hưởng một phần
                            </option>
                            <option value="high">
                              Cao - Ảnh hưởng nghiêm trọng
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Mô tả chi tiết lỗi *
                          </label>
                          <textarea
                            value={errorReport.description}
                            onChange={(e) =>
                              setErrorReport({
                                ...errorReport,
                                description: e.target.value,
                              })
                            }
                            placeholder="Mô tả chi tiết về lỗi đang gặp phải"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white resize-none"
                            rows={4}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Các bước tái hiện lỗi
                          </label>
                          <textarea
                            value={errorReport.steps}
                            onChange={(e) =>
                              setErrorReport({
                                ...errorReport,
                                steps: e.target.value,
                              })
                            }
                            placeholder="1. Bước đầu tiên...&#10;2. Bước thứ hai...&#10;3. Kết quả lỗi..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white resize-none"
                            rows={4}
                          />
                        </div>

                        <div className="bg-memorial-accent/10 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-memorial-bronze flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-memorial-primary dark:text-memorial-secondary mb-1">
                                Email gửi đến
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                stephensouth1307@gmail.com
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Báo cáo sẽ được gửi trực tiếp đến email IT để
                                được xử lý nhanh chóng
                              </p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleSendErrorReport}
                          disabled={
                            !errorReport.title.trim() ||
                            !errorReport.description.trim()
                          }
                          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                          <Send className="w-4 h-4" />
                          Gửi báo cáo lỗi
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary mb-4">
                          Sao lưu & Khôi phục
                        </h3>
                        <div className="space-y-4">
                          <button
                            onClick={handleExportData}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-memorial-bronze text-white rounded-lg hover:bg-memorial-bronze/90 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Xuất toàn bộ dữ liệu
                          </button>
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 transition-colors">
                            <Upload className="w-4 h-4" />
                            Nhập dữ liệu từ file
                          </button>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-memorial-primary dark:text-memorial-secondary mb-4">
                          Thống kê hệ thống
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Tổng nghĩa trang:</span>
                            <span className="font-semibold">
                              {cemeteries.length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tổng liệt sĩ:</span>
                            <span className="font-semibold">
                              {cemeteries.reduce(
                                (sum, c) => sum + (c.graves?.length || 0),
                                0,
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tổng mộ phần:</span>
                            <span className="font-semibold">
                              {cemeteries.reduce(
                                (sum, c) => sum + c.totalGraves,
                                0,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Add/Edit Martyr Modal */}
          {(isAddingMartyr || editingMartyr) && (
            <motion.div
              className="fixed inset-0 z-60 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-memorial-primary dark:text-memorial-secondary">
                    {isAddingMartyr
                      ? "Thêm liệt sĩ mới"
                      : "Chỉnh sửa thông tin liệt sĩ"}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tên liệt sĩ *
                      </label>
                      <input
                        type="text"
                        value={formData.name || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Nhập tên đầy đủ"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Năm sinh
                      </label>
                      <input
                        type="number"
                        value={formData.birthYear || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            birthYear: parseInt(e.target.value) || undefined,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="1950"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Ngày hy sinh
                      </label>
                      <input
                        type="text"
                        value={formData.deathDate || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deathDate: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quê quán
                      </label>
                      <input
                        type="text"
                        value={formData.hometown || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, hometown: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        placeholder="Tỉnh/thành phố"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hàng
                      </label>
                      <input
                        type="number"
                        value={formData.graveLocation?.row || 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            graveLocation: {
                              ...formData.graveLocation!,
                              row: parseInt(e.target.value) || 1,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Khu vực
                      </label>
                      <select
                        value={formData.graveLocation?.section || "left"}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            graveLocation: {
                              ...formData.graveLocation!,
                              section: e.target.value as "left" | "right",
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                      >
                        <option value="left">Trái</option>
                        <option value="right">Phải</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Số mộ
                      </label>
                      <input
                        type="number"
                        value={formData.graveLocation?.graveNumber || 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            graveLocation: {
                              ...formData.graveLocation!,
                              graveNumber: parseInt(e.target.value) || 1,
                            },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-700 dark:text-white"
                        min="1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      setIsAddingMartyr(false);
                      setEditingMartyr(null);
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSaveMartyr}
                    className="flex items-center gap-2 px-6 py-2 bg-memorial-bronze text-white rounded-lg hover:bg-memorial-bronze/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Lưu
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default CMS;
