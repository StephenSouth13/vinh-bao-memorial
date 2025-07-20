# 🏛️ Trang Tưởng Niệm Liệt Sĩ - Memorial Website

Website tưởng niệm liệt sĩ hiện đại với sơ đồ mộ tương tác, tìm kiếm thông minh và hệ thống CMS quản lý nội dung. Được xây dựng với React, TypeScript, Tailwind CSS và Framer Motion.

![Memorial Website](https://img.shields.io/badge/Memorial-Website-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18+-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![PNPM](https://img.shields.io/badge/PNPM-8+-orange?style=for-the-badge&logo=pnpm)
![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=for-the-badge&logo=vercel)

## 🚀 Khởi Chạy Nhanh

### Yêu Cầu

- **Node.js** 18+
- **PNPM** 8+ (khuyên dùng)

### Cài Đặt & Chạy

```bash
# Clone repository
git clone <repository-url>
cd memorial-website

# Cài đặt dependencies với pnpm
pnpm install

# Chạy development server
pnpm run dev
```

**Xong!** Website sẽ chạy tại: `http://localhost:8080`

## 🌟 Tính Năng Chính

### 🗺️ **Sơ Đồ Mộ Tương Tác**

- **6 nghĩa trang** với layout riêng biệt
- **Bố cục dynamic**: 7-3-6, 14-3-14, 8-3-8, 9-3-9, 4-3-4
- **Responsive**: Cuộn ngang mobile, đầy đủ desktop
- **Animations**: Framer Motion mượt mà

### 🔍 **Tìm Kiếm Thông Minh**

- Tìm kiếm tên tiếng Việt có dấu
- Highlight realtime trên sơ đồ
- Hiển thị vị trí và thông tin chi tiết

### ⚙️ **CMS Professional**

- CRUD đầy đủ cho nghĩa trang & liệt sĩ
- **Phản hồi tin nhắn**: Trả lời tin nhắn từ floating chat
- **Báo cáo lỗi**: Gửi lỗi trực tiếp đến IT (stephensouth1307@gmail.com)
- Export/Import dữ liệu JSON
- Dashboard thống kê
- Authentication system

### 💬 **Floating Chat System**

- **2 chế độ**: Chatbot tự động & Tin nhắn trực tiếp
- **Chatbot AI**: Trả lời về nghĩa trang, liệt sĩ, tính năng
- **Direct messaging**: Gửi tin nhắn cho admin qua CMS
- **Professional UI**: Giao diện trang nghiêm, phù h��p memorial theme

### 🎨 **Giao Diện Trang Nghiêm**

- Theme memorial colors
- Vietnamese typography
- Dark mode support
- Mobile responsive

## 📁 Cấu Trúc Project

```
memorial-website/
├── client/                 # Frontend React
│   ├── components/        # React components
│   │   ├── AdminLogin.tsx # Admin authentication
│   │   ├── CMS.tsx       # Content management + Messages + Error reporting
│   │   ├── FloatingChat.tsx # Dual-mode chat system
│   │   ├── GraveMap.tsx  # Interactive grave map
│   │   └── ui/           # UI components
│   ├── lib/
│   │   └── data.ts       # Cemetery & martyr data
│   ├── pages/
│   │   ├── Index.tsx     # Homepage
│   │   └── CemeteryDetail.tsx # Cemetery details
│   └── global.css        # Tailwind styles
├── server/               # Minimal Express server
├── LICENSE              # MIT License
└── README.md           # This file
```

## 🗂️ Dữ Liệu Nghĩa Trang

### **Nghĩa Trang Có Sẵn**

1. **Tân Liên** - 91 mộ (7-3-6 layout)
2. **Tam Đa** - 280 mộ (14-3-14 layout)
3. **Thị Trấn** - 176 mộ (8-3-8 layout)
4. **Tân Hưng** - 180 mộ (9-3-9 layout)
5. **Vinh Quang** - 80 mộ (4-3-4 layout)
6. **Nhân Hòa** - 198 mộ (9-3-9 layout)

### **Dữ Liệu Liệt Sĩ**

Mỗi liệt sĩ có thông tin:

- Tên đầy đủ
- Năm sinh/hy sinh
- Quê quán
- Thời kỳ (PHÁP/MỸ/BVTQ)
- Vị trí mộ (hàng, khu vực, số mộ)
- Trạng thái hài cốt (CHC/KHC)

## ⚙️ CMS Admin

### Đăng Nhập

- **Email**: `adminvinhbao@gmail.com`
- **Password**: `123456`

### Tính Năng CMS

- **Quản lý nghĩa trang**: Xem, sửa thông tin
- **Quản lý liệt sĩ**: Thêm/sửa/xóa/tìm kiếm
- **💬 Phản hồi tin nhắn**: Trả lời tin nhắn từ floating chat
- **🐛 Báo cáo lỗi**: Gửi lỗi đến stephensouth1307@gmail.com
- **Export dữ liệu**: Xuất JSON cho backup
- **Thống kê**: Dashboard tổng quan

### 💬 Floating Chat

- **Chatbot Mode**: Tự động trả lời về dự án
- **Direct Message**: Tin nhắn trực tiếp với admin
- **Knowledge Base**: Thông tin về nghĩa trang, tính năng
- **Professional Design**: UI trang nghiêm

## 🚀 Deploy lên Vercel

### **Cách 1: Vercel CLI (Khuyên dùng)**

```bash
# Cài đặt Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

### **Cách 2: GitHub Integration**

1. Push code lên GitHub
2. Kết nối repo với Vercel
3. Auto deploy khi push

### **Cấu hình Vercel**

Tạo file `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/**/*",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/spa"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "buildCommand": "pnpm run build",
  "devCommand": "pnpm run dev",
  "installCommand": "pnpm install"
}
```

## 🔧 Scripts Có Sẵn

```bash
# Development
pnpm run dev          # Chạy dev server
pnpm run preview      # Preview production build

# Production
pnpm run build        # Build cho production
pnpm start           # Chạy production server

# Code Quality
pnpm run typecheck   # Kiểm tra TypeScript
pnpm run format      # Format code với Prettier
pnpm test           # Chạy tests
pnpm test:watch     # Tests watch mode
```

## 🎨 Customization

### **Theme Colors** (tailwind.config.ts)

```typescript
memorial: {
  primary: "hsl(0 0% 15%)",      // Đen trang nghiêm
  secondary: "hsl(0 0% 98%)",    // Trắng sáng
  accent: "hsl(30 8% 85%)",      // Xám nhạt
  bronze: "hsl(30 40% 60%)",     // Đồng
}
```

### **Grave Layout Variables** (global.css)

```css
:root {
  --grave-unit: 64px;           # Kích thước ô mộ
  --grave-half-unit: 32px;      # Khoảng cách
}
```

## 📱 Responsive Design

- **Mobile**: < 768px - Cuộn ngang sơ đồ mộ
- **Tablet**: 768px - 1024px - Layout tối ưu
- **Desktop**: > 1024px - Full experience

## 🔒 Security Features

- Admin authentication
- Input validation
- XSS protection
- Secure data handling

## 🧪 Testing

```bash
# Chạy tests
pnpm test

# Tests với coverage
pnpm test -- --coverage

# Watch mode
pnpm test:watch
```

## 🔧 Troubleshooting

### **Common Issues**

**Build lỗi:**

```bash
# Clear cache và reinstall
rm -rf node_modules pnpm-lock.yaml .next
pnpm install
```

**TypeScript lỗi:**

```bash
pnpm run typecheck
```

**Vercel deploy lỗi:**

- Kiểm tra `vercel.json` config
- Đảm bảo `buildCommand` đúng
- Check Node.js version ≥ 18

## 🚀 Performance Tips

- **Code splitting**: Đã tích hợp React.lazy()
- **Image optimization**: Sử dụng Next.js Image nếu cần
- **Bundle analysis**: `pnpm run build -- --analyze`

## 🔄 Future Roadmap

- [ ] Backend API integration
- [ ] Image upload cho liệt sĩ
- [ ] Advanced search filters
- [ ] PDF export reports
- [ ] Multi-language support
- [ ] Mobile app version

## 🤝 Contributing

1. Fork repository
2. Tạo branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### **Code Standards**

- TypeScript strict mode
- Prettier formatting
- ESLint rules
- Conventional commits

## 📄 License

MIT License - xem [LICENSE](LICENSE) để biết chi tiết.

**Lưu ý đặc biệt**: Dự án này được tạo ra để tưởng niệm các anh hùng liệt sĩ. Vui lòng sử dụng với lòng tôn trọng và trách nhiệm.

## 📞 Support

- **Project**: Memorial Website
- **Type**: Frontend React Application
- **Purpose**: Honor fallen soldiers (Liệt sĩ)

---

## 🎯 Quick Deploy Checklist

- [x] `pnpm install` - Cài dependencies
- [x] `pnpm run dev` - Test local
- [x] `pnpm run build` - Build production
- [x] `vercel --prod` - Deploy to Vercel
- [x] ✅ **Chạy mượt mà!**

## ✨ New Features Added

### 💬 **Floating Chat System**

- **Dual Mode**: Chatbot & Direct messaging
- **AI Responses**: Automatic answers about project features
- **User Support**: Direct contact with admin team
- **Memorial Theme**: Professional design for solemn website

### ���� **Enhanced CMS**

- **Message Management**: Respond to user inquiries from chat
- **Error Reporting**: Send bugs directly to IT (stephensouth1307@gmail.com)
- **Real-time Notifications**: Unread message indicators
- **Professional Interface**: Clean, production-ready admin panel

### 🎨 **Super Beautiful UI**

- **Hero Section**: Gradient backgrounds with Vietnamese emblem
- **Cemetery Cards**: Elegant hover effects and progress indicators
- **Responsive Design**: Perfect on all devices
- **Memorial Typography**: Vietnamese-optimized fonts and colors

## 📋 Complete Feature List

**✅ Core Features:**

- 6 nghĩa trang với layout riêng biệt
- Sơ đồ mộ tương tác (16-3-16, 14-3-14, 8-3-8, etc.)
- Tìm kiếm liệt sĩ với highlight realtime
- Popup thông tin chi tiết với navigation

**✅ Advanced Features:**

- 💬 **Floating Chat** với 2 chế độ
- ⚙️ **CMS Professional** với CRUD đầy đủ
- 📧 **Message Response System**
- 🐛 **Error Reporting** đến IT
- 📊 **Dashboard & Analytics**
- 🎨 **Memorial Theme** trang nghiêm

**✅ Technical Features:**

- TypeScript strict mode
- Responsive design
- Dark mode support
- PNPM optimized
- Vercel deploy ready
- Hot reload development

---

🇻🇳 **"Tổ quốc ghi công - Nhân dân ghi ��n"** 🇻🇳

**Built with respect for Vietnamese fallen soldiers**
