"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import GraveMap from "@/components/GraveMap";
import SearchBar from "@/components/SearchBar";
import AdminLogin from "@/components/AdminLogin";
import FloatingChat from "@/components/FloatingChat";
import { getCemeteryBySlug, getMartyrsByCemetery } from "@/lib/data";
import type { Cemetery, Martyr } from "@/lib/data";

export default function CemeteryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [cemetery, setCemetery] = useState<Cemetery | null>(null);
  const [martyrs, setMartyrs] = useState<Martyr[]>([]);
  const [highlightedMartyrIds, setHighlightedMartyrIds] = useState<string[]>(
    [],
  );

  useEffect(() => {
    if (slug) {
      const foundCemetery = getCemeteryBySlug(slug);
      setCemetery(foundCemetery || null);

      if (foundCemetery) {
        const cemeteryMartyrs = getMartyrsByCemetery(foundCemetery.id);
        setMartyrs(cemeteryMartyrs);
      }
    }
  }, [slug]);

  const handleSearchHighlight = useCallback((martyrIds: string[]) => {
    setHighlightedMartyrIds(martyrIds);
  }, []);

  if (!cemetery) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-memorial-accent/20 to-memorial-accent/5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-memorial-primary mb-4">
            Không tìm thấy nghĩa trang
          </h1>
          <Link
            to="/"
            className="text-memorial-bronze hover:text-memorial-primary transition-colors"
          >
            ← Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-memorial-accent/10 via-white to-memorial-accent/5">
      {/* Enhanced Header */}
      <header className="relative bg-gradient-to-br from-memorial-primary via-memorial-primary/95 to-memorial-primary text-memorial-secondary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Navigation */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-memorial-accent hover:text-memorial-secondary transition-colors bg-memorial-primary/20 px-4 py-2 rounded-full backdrop-blur-sm border border-memorial-accent/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-medium">Về trang chủ</span>
              </Link>
            </div>

            {/* Cemetery Info */}
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-memorial-bronze rounded-full"></div>
                  <div className="w-12 h-px bg-memorial-bronze"></div>
                  <div className="w-2 h-2 bg-memorial-bronze rounded-full"></div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-memorial-secondary via-memorial-accent to-memorial-secondary bg-clip-text text-transparent">
                  {cemetery.name}
                </h1>

                <p className="text-xl md:text-2xl font-light opacity-95 leading-relaxed max-w-3xl">
                  {cemetery.description}
                </p>
              </div>

              <div className="bg-memorial-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-memorial-accent/20">
                <h3 className="text-lg font-bold mb-4 text-memorial-bronze">
                  Thông tin nghĩa trang
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-memorial-bronze flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-memorial-accent block">
                        Địa chỉ
                      </span>
                      <span className="text-memorial-secondary font-medium">
                        {cemetery.location}
                      </span>
                    </div>
                  </div>

                  {cemetery.establishedYear && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-memorial-bronze flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-memorial-accent block">
                          Thành lập
                        </span>
                        <span className="text-memorial-secondary font-medium">
                          Năm {cemetery.establishedYear}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-memorial-bronze flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm text-memorial-accent block">
                        Liệt sĩ
                      </span>
                      <span className="text-memorial-secondary font-medium">
                        {cemetery.occupiedGraves} / {cemetery.totalGraves} mộ
                        phần
                      </span>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="pt-2">
                    <div className="flex justify-between text-sm text-memorial-accent mb-1">
                      <span>Tỷ lệ sử dụng</span>
                      <span>
                        {Math.round(
                          (cemetery.occupiedGraves / cemetery.totalGraves) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-memorial-primary/20 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-memorial-bronze to-memorial-accent h-2 rounded-full transition-all duration-1000"
                        style={{
                          width: `${(cemetery.occupiedGraves / cemetery.totalGraves) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 text-white"
            fill="currentColor"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-memorial-primary dark:text-memorial-secondary mb-4 text-center">
              Tìm kiếm thông tin liệt sĩ
            </h2>
            <SearchBar
              martyrs={martyrs}
              onHighlight={handleSearchHighlight}
              placeholder="Nhập tên liệt sĩ để tìm kiếm và hiển thị vị trí mộ..."
            />
          </div>
        </motion.section>

        {/* Instructions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-memorial-accent/30 rounded-lg p-4">
            <h3 className="font-semibold text-memorial-primary mb-2">
              Hướng dẫn sử dụng:
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>
                • Click vào ô mộ có người để xem thông tin chi tiết liệt sĩ
              </li>
              <li>
                • Sử dụng thanh tìm kiếm để nhanh chóng tìm và định vị mộ liệt
                sĩ
              </li>
              <li>
                • Sơ đồ hiển thị bố cục 16-3-16: hai khu mộ được ngăn cách bởi
                lối đi chính
              </li>
              <li>• Cuộn ngang để xem toàn bộ sơ đồ trên thiết bị di động</li>
            </ul>
          </div>
        </motion.section>

        {/* Grave Map */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-memorial-primary dark:text-memorial-secondary mb-6 text-center">
              Sơ đồ mộ liệt sĩ
            </h2>
            <GraveMap
              martyrs={martyrs}
              highlightedMartyrIds={highlightedMartyrIds}
              numRows={cemetery.slug === "tan-lien" ? 7 : 10}
              leftSectionGraves={
                cemetery.slug === "tan-lien"
                  ? 7
                  : cemetery.slug === "tam-da"
                    ? 14
                    : cemetery.slug === "thi-tran"
                      ? 8
                      : cemetery.slug === "tan-hung"
                        ? 9
                        : cemetery.slug === "vinh-quang"
                          ? 4
                          : cemetery.slug === "nhan-hoa"
                            ? 9
                            : 8
              }
              rightSectionGraves={
                cemetery.slug === "tan-lien"
                  ? 6
                  : cemetery.slug === "tam-da"
                    ? 14
                    : cemetery.slug === "thi-tran"
                      ? 8
                      : cemetery.slug === "tan-hung"
                        ? 9
                        : cemetery.slug === "vinh-quang"
                          ? 4
                          : cemetery.slug === "nhan-hoa"
                            ? 9
                            : 8
              }
            />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-memorial-primary text-memorial-secondary mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-memorial-accent">
            © 2024 Trang Tưởng Niệm Liệt Sĩ. Gìn giữ và truyền lại cho thế hệ
            tương lai.
          </p>
        </div>
      </footer>

      {/* Admin Login */}
      <AdminLogin />

      {/* Floating Chat */}
      <FloatingChat />
    </div>
  );
}
