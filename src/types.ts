export type CategoryId =
  | 'istighosah'
  | 'wirid'
  | 'sholawat'
  | 'doa'
  | 'kajian'
  | 'pengumuman'
  | 'lainnya'

export interface Category {
  id: CategoryId
  label: string
}

export type ArchiveStatus = 'terbit' | 'menunggu'

export interface ArchiveDoc {
  id: string
  title: string
  category: CategoryId
  /** Teks Arab berharakat — bagian utama sebuah arsip bacaan. */
  arabic?: string
  /** Transliterasi Latin. */
  latin?: string
  /** Terjemahan Bahasa Indonesia. */
  translation?: string
  /** Catatan bebas / isi dokumen non-bacaan. */
  body?: string
  /** Scan atau foto naskah, disimpan sebagai data URL agar tetap bisa dibuka offline. */
  image?: string
  author: string
  source?: string
  createdAt: number
  updatedAt: number
  status: ArchiveStatus
  builtIn?: boolean
  /** Bila arsip ini terhubung dengan paket bacaan berhitung. */
  packageId?: string
}

export interface Reading {
  id: string
  title: string
  arabic: string
  latin?: string
  translation?: string
  /** Jumlah target hitungan. `null` berarti "sebanyak-banyaknya" (tanpa target). */
  target: number | null
  /** Bacaan pembuka seperti tawassul tidak memakai tasbih. */
  counted: boolean
  note?: string
}

export interface ReadingPackage {
  id: string
  name: string
  origin: string
  description: string
  readings: Reading[]
  builtIn: boolean
}

/** Sesi berjalan yang disimpan agar bisa dilanjutkan setelah aplikasi ditutup. */
export interface RunningSession {
  packageId: string
  index: number
  count: number
  /** Hitungan yang sudah selesai per bacaan, untuk ringkasan akhir. */
  perReading: Record<string, number>
  totalTaps: number
  startedAt: number
  updatedAt: number
}

export interface CompletionRecord {
  id: string
  packageId: string
  packageName: string
  startedAt: number
  finishedAt: number
  totalTaps: number
  readingsDone: number
  readingsTotal: number
  complete: boolean
}

export interface Stats {
  totalTaps: number
  completions: CompletionRecord[]
}

export type ThemeMode = 'sistem' | 'terang' | 'gelap'

export interface Settings {
  theme: ThemeMode
  arabicSize: number
  arabicLeading: number
  haptics: boolean
  shakeToCount: boolean
  keepAwake: boolean
  showLatin: boolean
  showTranslation: boolean
  autoAdvance: boolean
  airplaneReminder: boolean
}

/* ---- Program Cinta Shalawat ------------------------------------------- */

export interface SholawatText {
  id: string
  name: string
  arabic: string
  latin?: string
  translation?: string
  /** Perkiraan waktu baca, dipakai untuk saran target harian yang masuk akal. */
  detik: number
}

export interface SholawatProgram {
  id: string
  name: string
  /** Jumlah sholawat yang ingin dicapai, mis. 10.000. */
  targetTotal: number
  /** Lama program dalam hari. */
  days: number
  /** Tanggal mulai, format 'YYYY-MM-DD' waktu lokal. */
  startDate: string
  textId: string
  customName?: string
  customArabic?: string
  /** Hitungan per tanggal: { '2026-08-26': 340 }. */
  log: Record<string, number>
  /** Target harian ikut menyesuaikan sisa bacaan dan sisa hari. */
  adaptiveDaily: boolean
  createdAt: number
  finishedAt?: number
}
