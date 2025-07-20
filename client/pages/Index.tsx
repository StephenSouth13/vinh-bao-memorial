import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users } from "lucide-react";
import { cemeteries } from "@/lib/data";
import AdminLogin from "@/components/AdminLogin";
import FloatingChat from "@/components/FloatingChat";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-memorial-accent/10 via-white to-memorial-accent/5">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-memorial-primary via-memorial-primary/95 to-memorial-primary text-memorial-secondary overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Vietnamese National Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-memorial-bronze rounded-full mb-4">
                <div className="text-2xl font-bold text-memorial-secondary">
                  ★
                </div>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-memorial-secondary via-memorial-accent to-memorial-secondary bg-clip-text text-transparent">
              TƯỞNG NIỆM LIỆT SĨ
            </h1>

            <div className="w-24 h-1 bg-memorial-bronze mx-auto mb-6"></div>

            <p className="text-xl md:text-2xl font-light mb-8 max-w-4xl mx-auto leading-relaxed opacity-95">
              Gìn giữ và tri ân công lao của các anh hùng liệt sĩ
              <br />
              <span className="text-lg text-memorial-accent">
                "Tổ quốc ghi công - Nhân dân ghi ơn"
              </span>
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-memorial-bronze">
                  {cemeteries.length}
                </div>
                <div className="text-sm text-memorial-accent">Nghĩa trang</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-memorial-accent/50"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-memorial-bronze">
                  {cemeteries.reduce((sum, c) => sum + c.occupiedGraves, 0)}
                </div>
                <div className="text-sm text-memorial-accent">Liệt sĩ</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-memorial-accent/50"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-memorial-bronze">
                  Vĩnh Bảo
                </div>
                <div className="text-sm text-memorial-accent">Hải Phòng</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 text-white"
            fill="currentColor"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-memorial-primary mb-6 relative inline-block">
              Nghĩa Trang Liệt Sĩ
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-memorial-bronze"></div>
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-xl max-w-4xl mx-auto leading-relaxed font-light">
            Nơi gìn giữ tình nghĩa thiêng liêng với những anh hùng đã hy sinh vì
            độc lập tự do của Tổ quốc. Mỗi nghĩa trang là một minh chứng sống
            động cho lòng biết ơn của nhân dân Việt Nam.
          </p>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-memorial-bronze"></div>
            <div className="w-3 h-3 rounded-full bg-memorial-bronze"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-memorial-bronze"></div>
          </div>
        </motion.section>

        {/* Cemetery Cards */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {cemeteries.map((cemetery, index) => (
            <motion.div
              key={cemetery.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.15 }}
              className="group"
            >
              <Link to={`/cemetery/${cemetery.slug}`}>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-memorial-accent/20 group-hover:border-memorial-bronze/40">
                  {/* Memorial Banner */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-memorial-bronze via-memorial-primary to-memorial-bronze"></div>

                  {/* Image with overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={cemetery.imageUrl}
                      alt={cemetery.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-memorial-primary/80 via-memorial-primary/20 to-transparent" />

                    {/* Floating year badge */}
                    <div className="absolute top-4 right-4 bg-memorial-bronze text-memorial-secondary px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {cemetery.establishedYear}
                    </div>

                    {/* Cemetery name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-memorial-bronze transition-colors duration-300">
                        {cemetery.name}
                      </h3>
                      <div className="w-12 h-0.5 bg-memorial-bronze"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-5">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm line-clamp-3">
                      {cemetery.description}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-memorial-primary dark:text-memorial-secondary">
                      <MapPin className="w-4 h-4 text-memorial-bronze flex-shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {cemetery.location}
                      </span>
                    </div>

                    {/* Statistics */}
                    <div className="bg-memorial-accent/10 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Liệt sĩ
                        </span>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-memorial-bronze" />
                          <span className="font-bold text-memorial-primary dark:text-memorial-secondary">
                            {cemetery.occupiedGraves}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Tổng mộ phần
                        </span>
                        <span className="font-semibold text-memorial-bronze">
                          {cemetery.totalGraves}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-memorial-bronze to-memorial-primary h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${(cemetery.occupiedGraves / cemetery.totalGraves) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="relative overflow-hidden">
                      <button className="w-full bg-gradient-to-r from-memorial-primary to-memorial-primary/90 text-memorial-secondary py-3 px-4 rounded-xl font-semibold group-hover:from-memorial-bronze group-hover:to-memorial-bronze/90 transition-all duration-300 transform group-hover:scale-[1.02] shadow-lg">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Xem sơ đồ mộ
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* Memorial Quote */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative bg-gradient-to-br from-memorial-primary via-memorial-primary/95 to-memorial-primary text-memorial-secondary rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M50 30L70 70L30 70Z"/%3E%3C/g%3E%3C/svg%3E\')]'
              }
            ></div>
          </div>

          {/* Decorative quotes */}
          <div className="absolute top-8 left-8 text-6xl text-memorial-bronze/30 font-serif">
            "
          </div>
          <div className="absolute bottom-8 right-8 text-6xl text-memorial-bronze/30 font-serif rotate-180">
            "
          </div>

          <div className="relative z-10">
            {/* Vietnamese flag colors accent */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <div className="w-12 h-px bg-memorial-bronze"></div>
                <div className="w-4 h-4 bg-memorial-bronze rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
                <div className="w-12 h-px bg-memorial-bronze"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              </div>
            </div>

            <blockquote className="text-2xl md:text-4xl font-light italic leading-relaxed mb-8 max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-memorial-secondary via-memorial-accent to-memorial-secondary bg-clip-text text-transparent">
                "Không gì có thể quý hơn độc lập tự do"
              </span>
            </blockquote>

            <div className="w-24 h-px bg-memorial-bronze mx-auto mb-6"></div>

            <cite className="text-memorial-bronze font-semibold text-lg tracking-wide">
              Chủ tịch Hồ Chí Minh
            </cite>

            <p className="text-memorial-accent text-sm mt-4 font-light max-w-2xl mx-auto">
              Lời dạy bất hủ của Bác về giá trị thiêng liêng của độc lập dân
              tộc, minh chứng qua sự hy sinh cao cả của các anh hùng liệt sĩ
            </p>
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
