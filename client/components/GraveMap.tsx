"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import GraveCell from "./GraveCell";
import MartyrInfoPopup from "./MartyrInfoPopup";
import type { Martyr } from "@/lib/data";
import { findMartyrAtLocation } from "@/lib/data";

interface GraveMapProps {
  martyrs: Martyr[];
  highlightedMartyrIds?: string[];
  numRows?: number;
  leftSectionGraves?: number;
  rightSectionGraves?: number;
}

const GraveMap: React.FC<GraveMapProps> = ({
  martyrs,
  highlightedMartyrIds = [],
  numRows = 7,
  leftSectionGraves = 7,
  rightSectionGraves = 6,
}) => {
  const [selectedMartyrIndex, setSelectedMartyrIndex] = useState<number | null>(
    null,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Create a grid template for the left-3-right layout (dynamic)
  const gridTemplateColumns = useMemo(() => {
    return `repeat(${leftSectionGraves}, var(--grave-unit)) var(--grave-half-unit) repeat(3, var(--grave-unit)) var(--grave-half-unit) repeat(${rightSectionGraves}, var(--grave-unit))`;
  }, [leftSectionGraves, rightSectionGraves]);

  const handleGraveClick = (martyr: Martyr, index: number) => {
    const martyrIndex = martyrs.findIndex((m) => m.id === martyr.id);
    setSelectedMartyrIndex(martyrIndex);
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setSelectedMartyrIndex(null);
  };

  const handleNext = () => {
    if (
      selectedMartyrIndex !== null &&
      selectedMartyrIndex < martyrs.length - 1
    ) {
      setSelectedMartyrIndex(selectedMartyrIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedMartyrIndex !== null && selectedMartyrIndex > 0) {
      setSelectedMartyrIndex(selectedMartyrIndex - 1);
    }
  };

  return (
    <div className="w-full">
      {/* Scrollable container for the grave map */}
      <div className="overflow-x-auto overflow-y-visible pb-4">
        <div className="min-w-max mx-auto">
          {/* Grid container */}
          <div
            className="grid place-items-center w-max min-w-full mx-auto"
            style={{
              gridTemplateColumns,
              gap: "var(--grave-half-unit)",
              rowGap: "var(--grave-unit)",
            }}
          >
            {/* Generate rows */}
            {Array.from({ length: numRows }).map((_, rowIndex) => {
              const rowElements = [];

              // Left section graves (dynamic number)
              for (
                let graveIndex = 0;
                graveIndex < leftSectionGraves;
                graveIndex++
              ) {
                const martyr = findMartyrAtLocation(
                  martyrs,
                  rowIndex,
                  "left",
                  graveIndex,
                );
                const martyrIndex = martyr
                  ? martyrs.findIndex((m) => m.id === martyr.id)
                  : -1;
                const isHighlighted =
                  martyr && highlightedMartyrIds.includes(martyr.id);

                rowElements.push(
                  <GraveCell
                    key={`${rowIndex}-left-${graveIndex}`}
                    martyr={martyr}
                    rowIndex={rowIndex}
                    graveIndex={graveIndex}
                    section="left"
                    onClick={handleGraveClick}
                    className={
                      isHighlighted ? "ring-4 ring-grave-highlighted" : ""
                    }
                    martyrIndex={martyrIndex}
                  />,
                );
              }

              // Spacer after left section
              rowElements.push(
                <div
                  key={`${rowIndex}-spacer-1`}
                  style={{
                    width: "var(--grave-half-unit)",
                    height: "var(--grave-unit)",
                  }}
                />,
              );

              // Main walkway (3 units wide)
              rowElements.push(
                <motion.div
                  key={`${rowIndex}-walkway`}
                  className="col-span-3 bg-gray-100 dark:bg-gray-700 rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
                  style={{ height: "var(--grave-unit)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    LỐI ĐI CHÍNH
                  </span>
                </motion.div>,
              );

              // Spacer after walkway
              rowElements.push(
                <div
                  key={`${rowIndex}-spacer-2`}
                  style={{
                    width: "var(--grave-half-unit)",
                    height: "var(--grave-unit)",
                  }}
                />,
              );

              // Right section graves (dynamic number)
              for (
                let graveIndex = 0;
                graveIndex < rightSectionGraves;
                graveIndex++
              ) {
                const martyr = findMartyrAtLocation(
                  martyrs,
                  rowIndex,
                  "right",
                  graveIndex,
                );
                const martyrIndex = martyr
                  ? martyrs.findIndex((m) => m.id === martyr.id)
                  : -1;
                const isHighlighted =
                  martyr && highlightedMartyrIds.includes(martyr.id);

                rowElements.push(
                  <GraveCell
                    key={`${rowIndex}-right-${graveIndex}`}
                    martyr={martyr}
                    rowIndex={rowIndex}
                    graveIndex={graveIndex}
                    section="right"
                    onClick={handleGraveClick}
                    className={
                      isHighlighted ? "ring-4 ring-grave-highlighted" : ""
                    }
                    martyrIndex={martyrIndex}
                  />,
                );
              }

              return rowElements;
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-grave-occupied border border-gray-400 rounded-sm"></div>
          <span>Có người</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-grave-empty border border-gray-400 rounded-sm"></div>
          <span>Trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-grave-highlighted border border-gray-400 rounded-sm ring-2 ring-grave-highlighted"></div>
          <span>Tìm kiếm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-4 bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm"></div>
          <span>Lối đi chính</span>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-4 bg-memorial-accent/30 rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-memorial-bronze">
              {martyrs.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Liệt sĩ
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-memorial-bronze">
              {numRows * (leftSectionGraves + rightSectionGraves)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Tổng mộ
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-memorial-bronze">
              {numRows * (leftSectionGraves + rightSectionGraves) -
                martyrs.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Mộ trống
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-memorial-bronze">
              {numRows}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hàng</div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {selectedMartyrIndex !== null && (
        <MartyrInfoPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          martyrs={martyrs}
          currentIndex={selectedMartyrIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
};

export default GraveMap;
