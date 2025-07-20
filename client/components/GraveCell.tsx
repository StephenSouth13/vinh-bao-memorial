"use client";

import { motion } from "framer-motion";
import type { Martyr } from "@/lib/data";
import React from "react";

interface GraveCellProps {
  martyr: Martyr | undefined;
  rowIndex: number;
  graveIndex: number; // Index within section (0-15)
  section: "left" | "right";
  onClick: (martyr: Martyr, index: number) => void;
  className?: string; // For highlight styling
  martyrIndex: number; // Actual index in the martyrs array
}

const GraveCell: React.FC<GraveCellProps> = ({
  martyr,
  rowIndex,
  graveIndex,
  section,
  onClick,
  className,
  martyrIndex,
}) => {
  const isOccupied = !!martyr;
  const currentGraveNumber = graveIndex + 1; // Convert to 1-based numbering

  const getShortName = (fullName: string): string => {
    const parts = fullName.split(" ");
    if (parts.length > 0) {
      return parts[parts.length - 1].toUpperCase();
    }
    return "";
  };

  return (
    <motion.div
      className={`
        relative w-grave-unit h-grave-unit border border-gray-400 
        flex flex-col items-center justify-center text-center text-sm font-medium 
        cursor-pointer rounded-sm transition-colors duration-200 ease-in-out
        ${
          isOccupied
            ? "bg-grave-occupied text-memorial-primary hover:bg-memorial-accent/70"
            : "bg-grave-empty text-gray-500"
        }
        ${className || ""}
      `}
      onClick={() => isOccupied && onClick(martyr!, martyrIndex)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (rowIndex * 32 + graveIndex) * 0.01 }}
    >
      {isOccupied ? (
        <>
          <span className="font-semibold text-base leading-tight">
            {getShortName(martyr!.name)}
          </span>
          <span className="text-xs mt-0.5 opacity-80">
            H{martyr!.graveLocation.row} - M{martyr!.graveLocation.graveNumber}
          </span>
        </>
      ) : (
        <span className="text-xs text-gray-500 opacity-70">
          H{rowIndex + 1} - M{currentGraveNumber}
        </span>
      )}
    </motion.div>
  );
};

export default GraveCell;
