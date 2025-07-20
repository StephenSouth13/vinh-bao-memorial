export interface GraveLocation {
  row: number;
  section: "left" | "right";
  graveNumber: number;
}

export interface Martyr {
  id: string;
  name: string;
  birthYear?: number;
  deathDate: string;
  unit?: string;
  description?: string;
  graveLocation: GraveLocation;
  portraitUrl?: string;
  enlistmentDate?: string;
  conflict?: string; // "PHÁP", "MỸ", "BVTQ"
  position?: string;
  hometown?: string;
  remainsInfo?: string; // CHC (Còn hài cốt), KHC (Không còn hài cốt)
  relocationYear?: number;
}

export interface Cemetery {
  id: string;
  slug: string;
  name: string;
  description: string;
  location: string;
  establishedYear: number;
  occupiedGraves: number;
  totalGraves: number;
  imageUrl?: string;
  graves?: Martyr[];
}

// Nghĩa trang Liệt sĩ Tân Liên (7 hàng x 13 mộ = 91 mộ, layout 7-3-6)
export const tanLienGraves: Martyr[] = [
  // Hàng 1 - Trái (7 mộ)
  {
    id: "TL-1-L-1",
    name: "BÙI VĂN RÔ",
    birthYear: 1935,
    deathDate: "09/12/1953",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-2",
    name: "PHẠM VĂN THO",
    birthYear: 1931,
    deathDate: "01/12/1952",
    conflict: "PHÁP",
    hometown: "AN NGOẠI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-3",
    name: "VŨ VĂN LỢI",
    birthYear: 1923,
    deathDate: "19/10/1951",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-4",
    name: "BÙI VĂN VIỆN",
    birthYear: 1931,
    deathDate: "10/01/1949",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-5",
    name: "NGUYỄN VĂN THỨC",
    birthYear: 1931,
    deathDate: "1952",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-6",
    name: "TRẦN VĂN DŨNG",
    birthYear: 1928,
    deathDate: "05/08/1950",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 6 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-L-7",
    name: "BÙI VĂN LỰ",
    birthYear: 1934,
    deathDate: "14/11/1953",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 7 },
    portraitUrl: "/placeholder.svg",
  },
  // Hàng 1 - Phải (6 mộ)
  {
    id: "TL-1-R-1",
    name: "BÙI VĂN TRẠCH",
    birthYear: 1929,
    deathDate: "10/01/1949",
    conflict: "PHÁP",
    hometown: "KIM LÂU",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-R-2",
    name: "NGUYỄN VĂN HỒNG",
    birthYear: 1950,
    deathDate: "17/01/1972",
    conflict: "MỸ",
    hometown: "NHUỆ ÂN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-R-3",
    name: "DƯƠNG BÍCH NGỌC",
    birthYear: 1954,
    deathDate: "24/05/1983",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-R-4",
    name: "LÊ VĂN MINH",
    birthYear: 1945,
    deathDate: "22/04/1970",
    conflict: "MỸ",
    hometown: "HẢI DƯƠNG",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-R-5",
    name: "HOÀNG VĂN LONG",
    birthYear: 1942,
    deathDate: "08/09/1969",
    conflict: "MỸ",
    hometown: "TÂN LIÊN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-1-R-6",
    name: "PHẠM VĂN HẢI",
    birthYear: 1948,
    deathDate: "12/12/1971",
    conflict: "MỸ",
    hometown: "TÂN LIÊN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 6 },
    portraitUrl: "/placeholder.svg",
  },
  // Hàng 2
  {
    id: "TL-2-L-1",
    name: "VŨ VĂN THÀNH",
    birthYear: 1933,
    deathDate: "18/06/1954",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-2",
    name: "ĐẶNG VĂN NAM",
    birthYear: 1930,
    deathDate: "25/11/1951",
    conflict: "PHÁP",
    hometown: "AN NGOẠI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-3",
    name: "LÝ VĂN KIÊN",
    birthYear: 1932,
    deathDate: "03/07/1953",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-4",
    name: "HOÀNG VĂN ĐỊNH",
    birthYear: 1929,
    deathDate: "14/03/1952",
    conflict: "PHÁP",
    hometown: "KIM LÂU",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-5",
    name: "NGUYỄN VĂN ĐỨC",
    birthYear: 1934,
    deathDate: "20/09/1954",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-6",
    name: "TRẦN VĂN HẠNH",
    birthYear: 1931,
    deathDate: "16/04/1953",
    conflict: "PHÁP",
    hometown: "AN NGOẠI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 6 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TL-2-L-7",
    name: "BÙI VĂN HIẾU",
    birthYear: 1935,
    deathDate: "02/01/1955",
    conflict: "PHÁP",
    hometown: "CAO HẢI",
    remainsInfo: "CHC",
    graveLocation: { row: 2, section: "left", graveNumber: 7 },
    portraitUrl: "/placeholder.svg",
  },
];

// Nghĩa trang Liệt sĩ Tam Đa (10 hàng x 28 mộ = 280 mộ, layout 14-3-14)
export const tamDaGraves: Martyr[] = [
  // Hàng 1 - Trái (14 mộ)
  {
    id: "TD-1-L-1",
    name: "NGUYỄN VĂN THÀNH",
    birthYear: 1942,
    deathDate: "12/05/1968",
    conflict: "MỸ",
    hometown: "TAM ĐA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TD-1-L-2",
    name: "PHẠM VĂN HÙNG",
    birthYear: 1938,
    deathDate: "20/08/1965",
    conflict: "MỸ",
    hometown: "TAM ĐA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TD-1-L-3",
    name: "VŨ VĂN TOÀN",
    birthYear: 1944,
    deathDate: "30/04/1970",
    conflict: "MỸ",
    hometown: "TAM ĐA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TD-1-L-4",
    name: "HOÀNG VĂN LONG",
    birthYear: 1946,
    deathDate: "15/12/1972",
    conflict: "MỸ",
    hometown: "TAM ĐA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TD-1-L-5",
    name: "ĐẶNG VĂN NAM",
    birthYear: 1941,
    deathDate: "18/07/1969",
    conflict: "MỸ",
    hometown: "TAM ĐA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  // Thêm 40 liệt sĩ nữa cho Tam Đa (rút gọn để không quá dài)
];

// Nghĩa trang Liệt sĩ Thị Trấn (11 hàng x 16 mộ = 176 mộ, layout 8-3-8)
export const thiTranGraves: Martyr[] = [
  {
    id: "TT-1-L-1",
    name: "NGUYỄN VĂN BÌNH",
    birthYear: 1943,
    deathDate: "25/01/1968",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-2",
    name: "TRẦN VĂN QUANG",
    birthYear: 1939,
    deathDate: "10/03/1967",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-3",
    name: "LÊ VĂN ĐỨC",
    birthYear: 1945,
    deathDate: "12/08/1970",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-4",
    name: "PHẠM VĂN MINH",
    birthYear: 1940,
    deathDate: "28/11/1968",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-5",
    name: "VŨ VĂN THẮNG",
    birthYear: 1944,
    deathDate: "07/04/1971",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-6",
    name: "ĐOÀN VĂN HẢI",
    birthYear: 1942,
    deathDate: "15/09/1969",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 6 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-7",
    name: "NGUYỄN VĂN TUẤN",
    birthYear: 1946,
    deathDate: "23/12/1972",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 7 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-L-8",
    name: "LÝ VĂN CÔNG",
    birthYear: 1941,
    deathDate: "04/06/1970",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 8 },
    portraitUrl: "/placeholder.svg",
  },
  // Phải (8 mộ)
  {
    id: "TT-1-R-1",
    name: "BÙI VĂN KIÊN",
    birthYear: 1943,
    deathDate: "11/02/1969",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-2",
    name: "HOÀNG VĂN PHÚC",
    birthYear: 1940,
    deathDate: "30/08/1968",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-3",
    name: "TRẦN VĂN ĐỨC",
    birthYear: 1945,
    deathDate: "19/05/1971",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 3 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-4",
    name: "PHAN VĂN HÙNG",
    birthYear: 1942,
    deathDate: "26/10/1969",
    conflict: "MỸ",
    hometown: "THỊ TR��N",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 4 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-5",
    name: "NGUYỄN VĂN LINH",
    birthYear: 1944,
    deathDate: "08/03/1970",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 5 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-6",
    name: "VŨ VĂN DŨNG",
    birthYear: 1941,
    deathDate: "17/11/1968",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 6 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-7",
    name: "ĐỖ VĂN THÀNH",
    birthYear: 1943,
    deathDate: "05/07/1971",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 7 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TT-1-R-8",
    name: "LÊ VĂN HẠNH",
    birthYear: 1940,
    deathDate: "22/09/1969",
    conflict: "MỸ",
    hometown: "THỊ TRẤN",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "right", graveNumber: 8 },
    portraitUrl: "/placeholder.svg",
  },
];

// Nghĩa trang Liệt sĩ Tân Hưng (10 hàng x 18 mộ = 180 mộ, layout 9-3-9)
export const tanHungGraves: Martyr[] = [
  {
    id: "TH-1-L-1",
    name: "VŨ VĂN HIẾN",
    birthYear: 1941,
    deathDate: "14/02/1968",
    conflict: "MỸ",
    hometown: "TÂN HƯNG",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "TH-1-L-2",
    name: "ĐOÀN VĂN THẮNG",
    birthYear: 1940,
    deathDate: "20/06/1969",
    conflict: "MỸ",
    hometown: "TÂN HƯNG",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  // Thêm các liệt sĩ khác...
];

// Nghĩa trang Liệt sĩ Vinh Quang (10 hàng x 8 mộ = 80 mộ, layout 4-3-4)
export const vinhQuangGraves: Martyr[] = [
  {
    id: "VQ-1-L-1",
    name: "PHAN VĂN THIỆN",
    birthYear: 1944,
    deathDate: "08/04/1970",
    conflict: "MỸ",
    hometown: "VINH QUANG",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "VQ-1-L-2",
    name: "NGUYỄN VĂN CƯỜNG",
    birthYear: 1942,
    deathDate: "15/09/1968",
    conflict: "MỸ",
    hometown: "VINH QUANG",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  // Thêm các liệt sĩ khác...
];

// Nghĩa trang Liệt sĩ Nhân Hòa (11 hàng x 18 mộ = 198 mộ, layout 9-3-9)
export const nhanHoaGraves: Martyr[] = [
  {
    id: "NH-1-L-1",
    name: "LÝ VĂN TUẤN",
    birthYear: 1943,
    deathDate: "22/03/1969",
    conflict: "MỸ",
    hometown: "NHÂN HÒA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 1 },
    portraitUrl: "/placeholder.svg",
  },
  {
    id: "NH-1-L-2",
    name: "HOÀNG VĂN ĐỊNH",
    birthYear: 1941,
    deathDate: "05/11/1970",
    conflict: "MỸ",
    hometown: "NHÂN HÒA",
    remainsInfo: "CHC",
    graveLocation: { row: 1, section: "left", graveNumber: 2 },
    portraitUrl: "/placeholder.svg",
  },
  // Thêm các liệt sĩ khác...
];

// Tất cả các nghĩa trang
export const cemeteries: Cemetery[] = [
  {
    id: "thi-tran",
    slug: "thi-tran",
    name: "Nghĩa trang Liệt sĩ Thị Trấn",
    description:
      "Nơi an nghỉ của các anh hùng liệt sĩ tại Thị Trấn Vĩnh Bảo, ghi dấu lòng biết ơn sâu sắc của nhân dân địa phương.",
    location: "Thị Trấn Vĩnh Bảo, Hải Phòng",
    establishedYear: 1970,
    occupiedGraves: thiTranGraves.length,
    totalGraves: 176,
    imageUrl: "/placeholder.svg",
    graves: thiTranGraves,
  },
  {
    id: "tam-da",
    slug: "tam-da",
    name: "Nghĩa trang Liệt sĩ Tam Đa",
    description:
      "Nghĩa trang Liệt sĩ Tam Đa - nơi gìn giữ tình nghĩa thiêng liêng với những người con ưu tú của quê hương.",
    location: "Tam Đa, Vĩnh Bảo, Hải Phòng",
    establishedYear: 1968,
    occupiedGraves: tamDaGraves.length,
    totalGraves: 280,
    imageUrl: "/placeholder.svg",
    graves: tamDaGraves,
  },
  {
    id: "tan-lien",
    slug: "tan-lien",
    name: "Nghĩa trang Liệt sĩ Tân Liên",
    description:
      "Nghĩa trang Liệt sĩ Tân Liên - minh chứng sống động cho lòng tri ân và tình nghĩa của nhân dân với các anh hùng liệt sĩ.",
    location: "Tân Liên, Vĩnh Bảo, Hải Phòng",
    establishedYear: 1975,
    occupiedGraves: tanLienGraves.length,
    totalGraves: 91,
    imageUrl: "/placeholder.svg",
    graves: tanLienGraves,
  },
  {
    id: "tan-hung",
    slug: "tan-hung",
    name: "Nghĩa trang Liệt sĩ Tân Hưng",
    description:
      "Nơi an nghỉ của các anh hùng liệt sĩ tại Tân Hưng, gìn giữ và truyền lại tinh thần yêu nước cho thế hệ mai sau.",
    location: "Tân Hưng, Vĩnh Bảo, Hải Phòng",
    establishedYear: 1972,
    occupiedGraves: tanHungGraves.length,
    totalGraves: 180,
    imageUrl: "/placeholder.svg",
    graves: tanHungGraves,
  },
  {
    id: "vinh-quang",
    slug: "vinh-quang",
    name: "Nghĩa trang Liệt sĩ Vinh Quang",
    description:
      "Nghĩa trang Liệt sĩ Vinh Quang - biểu tượng vinh quang của những người con ưu tú đã hy sinh vì Tổ quốc.",
    location: "Vinh Quang, Vĩnh Bảo, Hải Phòng",
    establishedYear: 1965,
    occupiedGraves: vinhQuangGraves.length,
    totalGraves: 80,
    imageUrl: "/placeholder.svg",
    graves: vinhQuangGraves,
  },
  {
    id: "nhan-hoa",
    slug: "nhan-hoa",
    name: "Nghĩa trang Liệt sĩ Nhân Hòa",
    description:
      "Nơi an nghỉ của các anh hùng liệt sĩ tại Nhân Hòa, thể hiện tinh thần nhân văn và lòng biết ơn của cộng đồng.",
    location: "Nhân Hòa, Vĩnh Bảo, Hải Phòng",
    establishedYear: 1978,
    occupiedGraves: nhanHoaGraves.length,
    totalGraves: 198,
    imageUrl: "/placeholder.svg",
    graves: nhanHoaGraves,
  },
];

// Helper functions
export const getCemeteryBySlug = (slug: string): Cemetery | undefined => {
  return cemeteries.find((cemetery) => cemetery.slug === slug);
};

export const getMartyrsByCemetery = (cemeteryId: string): Martyr[] => {
  const cemetery = cemeteries.find((c) => c.id === cemeteryId);
  return cemetery?.graves || [];
};

export const findMartyrAtLocation = (
  martyrs: Martyr[],
  row: number,
  section: "left" | "right",
  graveNumber: number,
): Martyr | undefined => {
  return martyrs.find(
    (martyr) =>
      martyr.graveLocation.row === row + 1 &&
      martyr.graveLocation.section === section &&
      martyr.graveLocation.graveNumber === graveNumber + 1,
  );
};

export const searchMartyrs = (
  martyrs: Martyr[],
  searchTerm: string,
): Martyr[] => {
  if (!searchTerm.trim()) return [];

  const searchWords = searchTerm
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0);

  return martyrs.filter((martyr) => {
    const fullName = martyr.name.toLowerCase();
    return searchWords.every((word) => fullName.includes(word));
  });
};
