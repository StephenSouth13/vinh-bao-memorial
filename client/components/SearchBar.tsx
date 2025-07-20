"use client";

import { Search, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { Martyr } from "@/lib/data";

interface SearchBarProps {
  martyrs: Martyr[];
  onHighlight: (martyrIds: string[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  martyrs,
  onHighlight,
  placeholder = "Tìm kiếm tên liệt sĩ...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [matchedMartyrs, setMatchedMartyrs] = useState<Martyr[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setMatchedMartyrs([]);
      onHighlight([]);
      return;
    }

    const searchWords = searchTerm
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    const matches = martyrs.filter((martyr) => {
      const fullName = martyr.name.toLowerCase();
      return searchWords.every((word) => fullName.includes(word));
    });

    setMatchedMartyrs(matches);
    onHighlight(matches.map((m) => m.id));
  }, [searchTerm, martyrs]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-2">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-memorial-bronze focus:border-memorial-bronze outline-none transition-colors bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {matchedMartyrs.length > 0 ? (
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 mb-2">
                Tìm thấy {matchedMartyrs.length} kết quả
              </div>
              <div className="space-y-1">
                {matchedMartyrs.map((martyr) => (
                  <div
                    key={martyr.id}
                    className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 border-memorial-bronze"
                  >
                    <div className="font-medium text-memorial-primary dark:text-memorial-secondary">
                      {martyr.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Hàng {martyr.graveLocation.row} - Mộ{" "}
                      {martyr.graveLocation.graveNumber} (
                      {martyr.graveLocation.section === "left"
                        ? "Trái"
                        : "Phải"}
                      )
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {martyr.birthYear} - {martyr.deathYear} •{" "}
                      {martyr.hometown}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Không tìm thấy liệt sĩ nào với từ khóa "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
