"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import type { Martyr } from "@/lib/data";
import React, { useEffect } from "react";

interface MartyrInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  martyrs: Martyr[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const MartyrInfoPopup: React.FC<MartyrInfoPopupProps> = ({
  isOpen,
  onClose,
  martyrs,
  currentIndex,
  onNext,
  onPrev,
}) => {
  const currentMartyr = martyrs[currentIndex];

  // Block background scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!currentMartyr) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-memorial-primary dark:text-memorial-secondary">
                    {currentMartyr.name}
                  </h2>
                  <span className="px-3 py-1 bg-memorial-accent text-memorial-primary text-sm rounded-full">
                    {currentMartyr.rank || "Liệt sĩ"}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Portrait and basic info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={currentMartyr.portraitUrl || "/placeholder.svg"}
                      alt={currentMartyr.name}
                      className="w-32 h-40 object-cover rounded-lg shadow-md border-2 border-memorial-accent"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-memorial-bronze" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Sinh năm:
                        </span>
                        <span className="font-medium">
                          {currentMartyr.birthYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-memorial-bronze" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Hy sinh:
                        </span>
                        <span className="font-medium">
                          {currentMartyr.deathDate || currentMartyr.deathYear}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-memorial-bronze" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Quê quán:
                        </span>
                        <span className="font-medium">
                          {currentMartyr.hometown}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Vị trí mộ:
                        </span>
                        <span className="font-medium">
                          Hàng {currentMartyr.graveLocation.row} - Mộ{" "}
                          {currentMartyr.graveLocation.graveNumber} (
                          {currentMartyr.graveLocation.section === "left"
                            ? "Trái"
                            : "Phải"}
                          )
                        </span>
                      </div>
                    </div>
                    {currentMartyr.unit && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Đơn vị:
                        </span>
                        <span className="font-medium">
                          {currentMartyr.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Biography */}
                {currentMartyr.biography && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-memorial-primary dark:text-memorial-secondary">
                      Tiểu sử
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {currentMartyr.biography}
                    </p>
                  </div>
                )}

                {/* Age calculation */}
                <div className="bg-memorial-accent/30 p-4 rounded-lg">
                  <p className="text-center text-memorial-primary dark:text-memorial-secondary">
                    <span className="font-semibold">{currentMartyr.name}</span>{" "}
                    hy sinh khi mới{" "}
                    <span className="font-bold text-memorial-bronze">
                      {currentMartyr.deathYear - currentMartyr.birthYear}
                    </span>{" "}
                    tuổi, cống hiến trọn đời cho Tổ quốc.
                  </p>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={onPrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Mộ trước
                </button>

                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {currentIndex + 1} / {martyrs.length}
                </span>

                <button
                  onClick={onNext}
                  disabled={currentIndex === martyrs.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-memorial-primary text-memorial-secondary rounded-lg hover:bg-memorial-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Mộ tiếp theo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MartyrInfoPopup;
