import type { SholawatProgram } from '../types'

/* -- Bantuan tanggal (semua dalam zona waktu lokal) ---------------------- */

export function dateKey(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function addDays(key: string, amount: number): string {
  const date = parseKey(key)
  date.setDate(date.getDate() + amount)
  return dateKey(date)
}

/** Selisih hari `b - a`. */
export function diffDays(a: string, b: string): number {
  return Math.round((parseKey(b).getTime() - parseKey(a).getTime()) / 86400000)
}

export type ProgramStatus = 'selesai' | 'sesuai' | 'tertinggal' | 'belum-mulai'

export interface DayEntry {
  date: string
  count: number
  /** Hari yang sudah lewat atau hari ini. */
  past: boolean
}

export interface ProgramProgress {
  total: number
  remaining: number
  percent: number
  today: number
  /** Target harian rata jika dibagi merata sejak awal. */
  dailyTargetBase: number
  /** Target hari ini — menyesuaikan sisa bacaan bila mode adaptif aktif. */
  dailyTarget: number
  todayRemaining: number
  /** Hari ke berapa program berjalan (1 = hari pertama). */
  dayIndex: number
  daysLeft: number
  endDate: string
  /** Jumlah yang idealnya sudah tercapai sampai hari ini. */
  expected: number
  status: ProgramStatus
  streak: number
  activeDays: number
  bestDay: number
  averagePerActiveDay: number
  /** Perkiraan tanggal selesai dengan laju sekarang, null bila belum ada laju. */
  projectedEnd: string | null
  days: DayEntry[]
}

export function computeProgress(
  program: SholawatProgram,
  today: string = dateKey(),
): ProgramProgress {
  const entries = Object.entries(program.log)
  const total = entries.reduce((sum, [, count]) => sum + count, 0)
  const remaining = Math.max(0, program.targetTotal - total)
  const percent = program.targetTotal > 0 ? Math.min(100, (total / program.targetTotal) * 100) : 0

  const endDate = addDays(program.startDate, program.days - 1)
  const elapsed = diffDays(program.startDate, today)
  const dayIndex = elapsed + 1
  const daysLeft = Math.max(0, program.days - Math.max(dayIndex, 1) + 1)

  const dailyTargetBase = Math.ceil(program.targetTotal / Math.max(1, program.days))
  const dailyTarget =
    remaining === 0
      ? 0
      : program.adaptiveDaily && daysLeft > 0
        ? Math.ceil(remaining / daysLeft)
        : dailyTargetBase

  const todayCount = program.log[today] ?? 0
  // Yang "seharusnya" sudah tercapai hanya dihitung dari hari-hari yang sudah
  // lewat — hari ini masih berjalan, jadi belum jatuh tempo.
  const completedDays = Math.max(0, Math.min(dayIndex - 1, program.days))
  const expected =
    dayIndex > program.days
      ? program.targetTotal
      : Math.min(program.targetTotal, dailyTargetBase * completedDays)

  let status: ProgramStatus = 'sesuai'
  if (total >= program.targetTotal) status = 'selesai'
  else if (dayIndex < 1) status = 'belum-mulai'
  else if (expected > 0 && total < expected * 0.9) status = 'tertinggal'

  // Rentetan hari berturut-turut yang terisi, dihitung mundur dari hari ini.
  const activeDays = entries.filter(([, count]) => count > 0).length
  const bestDay = entries.reduce((max, [, count]) => Math.max(max, count), 0)
  const averagePerActiveDay = activeDays > 0 ? Math.round(total / activeDays) : 0

  let streak = 0
  let cursor = (program.log[today] ?? 0) > 0 ? today : addDays(today, -1)
  while ((program.log[cursor] ?? 0) > 0 && diffDays(program.startDate, cursor) >= 0) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  // Proyeksi baru bermakna setelah beberapa hari terisi; sebelum itu laju
  // sehari saja bisa memberi perkiraan yang menyesatkan.
  const daysRun = Math.min(Math.max(dayIndex, 1), program.days)
  const pace = total / daysRun
  const projectedEnd =
    remaining > 0 && pace > 0 && activeDays >= 3
      ? addDays(today, Math.ceil(remaining / pace))
      : null

  // Seluruh rentang hari program, untuk grafik harian.
  const days: DayEntry[] = Array.from({ length: program.days }, (_, i) => {
    const date = addDays(program.startDate, i)
    return { date, count: program.log[date] ?? 0, past: diffDays(date, today) >= 0 }
  })

  return {
    total,
    remaining,
    percent,
    today: todayCount,
    dailyTargetBase,
    dailyTarget,
    todayRemaining: Math.max(0, dailyTarget - todayCount),
    dayIndex,
    daysLeft,
    endDate,
    expected,
    status,
    streak,
    activeDays,
    bestDay,
    averagePerActiveDay,
    projectedEnd,
    days,
  }
}

export const STATUS_LABEL: Record<ProgramStatus, string> = {
  selesai: 'Target tercapai',
  sesuai: 'Sesuai target',
  tertinggal: 'Sedang tertinggal',
  'belum-mulai': 'Belum dimulai',
}
