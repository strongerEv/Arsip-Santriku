import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { CompletionRecord, ReadingPackage, RunningSession, Stats } from '../types'
import { KEYS, loadJSON, removeKey, saveJSON } from '../lib/storage'
import { createId } from '../lib/format'

interface SessionContextValue {
  session: RunningSession | null
  stats: Stats
  /** Mulai sesi baru; sesi lama yang belum selesai akan ditimpa. */
  start: (pkg: ReadingPackage) => void
  /** Tambah hitungan bacaan yang sedang berjalan. */
  addCount: (delta?: number) => void
  /** Tambah hitungan ke statistik global saja (dipakai Program Cinta Shalawat). */
  bumpTaps: (delta: number) => void
  /** Kembalikan hitungan bacaan sekarang ke nol. */
  resetCount: () => void
  /** Simpan hasil bacaan sekarang lalu pindah ke indeks berikutnya. */
  advanceTo: (index: number, readingId: string, achieved: number) => void
  /** Pindah bacaan tanpa mencatat hitungan (navigasi manual mundur/maju). */
  jumpTo: (index: number) => void
  /** Akhiri sesi: catat riwayat lalu bersihkan sesi berjalan. */
  finish: (pkg: ReadingPackage, opts: { readingId: string; achieved: number; complete: boolean }) => CompletionRecord
  /** Batalkan sesi tanpa mencatat riwayat. */
  abandon: () => void
  clearHistory: () => void
}

const SessionContext = createContext<SessionContextValue | null>(null)

const EMPTY_STATS: Stats = { totalTaps: 0, completions: [] }

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<RunningSession | null>(() =>
    loadJSON<RunningSession | null>(KEYS.session, null),
  )
  const [stats, setStats] = useState<Stats>(() => ({
    ...EMPTY_STATS,
    ...loadJSON<Partial<Stats>>(KEYS.stats, {}),
  }))

  // Penyimpanan sesi ditunda sesaat agar tap beruntun tidak menulis berkali-kali.
  const writeTimer = useRef<number | undefined>(undefined)
  useEffect(() => {
    window.clearTimeout(writeTimer.current)
    writeTimer.current = window.setTimeout(() => {
      if (session) saveJSON(KEYS.session, session)
      else removeKey(KEYS.session)
    }, 250)
    return () => window.clearTimeout(writeTimer.current)
  }, [session])

  // Simpan segera saat aplikasi ditutup/disembunyikan agar sesi bisa dilanjutkan.
  useEffect(() => {
    const flush = () => {
      if (session) saveJSON(KEYS.session, session)
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', flush)
    return () => {
      window.removeEventListener('pagehide', flush)
      document.removeEventListener('visibilitychange', flush)
    }
  }, [session])

  useEffect(() => {
    saveJSON(KEYS.stats, stats)
  }, [stats])

  const start = useCallback<SessionContextValue['start']>((pkg) => {
    const now = Date.now()
    setSession({
      packageId: pkg.id,
      index: 0,
      count: 0,
      perReading: {},
      totalTaps: 0,
      startedAt: now,
      updatedAt: now,
    })
  }, [])

  const addCount = useCallback<SessionContextValue['addCount']>((delta = 1) => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            count: Math.max(0, prev.count + delta),
            totalTaps: delta > 0 ? prev.totalTaps + delta : prev.totalTaps,
            updatedAt: Date.now(),
          }
        : prev,
    )
    if (delta > 0) setStats((prev) => ({ ...prev, totalTaps: prev.totalTaps + delta }))
  }, [])

  const bumpTaps = useCallback<SessionContextValue['bumpTaps']>((delta) => {
    if (delta <= 0) return
    setStats((prev) => ({ ...prev, totalTaps: prev.totalTaps + delta }))
  }, [])

  const resetCount = useCallback(() => {
    setSession((prev) => (prev ? { ...prev, count: 0, updatedAt: Date.now() } : prev))
  }, [])

  const advanceTo = useCallback<SessionContextValue['advanceTo']>((index, readingId, achieved) => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            index,
            count: 0,
            perReading: { ...prev.perReading, [readingId]: achieved },
            updatedAt: Date.now(),
          }
        : prev,
    )
  }, [])

  const jumpTo = useCallback<SessionContextValue['jumpTo']>((index) => {
    setSession((prev) => (prev ? { ...prev, index, count: 0, updatedAt: Date.now() } : prev))
  }, [])

  const finish = useCallback<SessionContextValue['finish']>(
    (pkg, { readingId, achieved, complete }) => {
      const current = session
      const perReading = { ...(current?.perReading ?? {}), [readingId]: achieved }
      const record: CompletionRecord = {
        id: createId('sesi'),
        packageId: pkg.id,
        packageName: pkg.name,
        startedAt: current?.startedAt ?? Date.now(),
        finishedAt: Date.now(),
        totalTaps: current?.totalTaps ?? 0,
        readingsDone: Object.keys(perReading).length,
        readingsTotal: pkg.readings.length,
        complete,
      }
      setStats((prev) => ({ ...prev, completions: [record, ...prev.completions].slice(0, 100) }))
      setSession(null)
      removeKey(KEYS.session)
      return record
    },
    [session],
  )

  const abandon = useCallback(() => {
    setSession(null)
    removeKey(KEYS.session)
  }, [])

  const clearHistory = useCallback(() => setStats(EMPTY_STATS), [])

  const value = useMemo(
    () => ({
      session,
      stats,
      start,
      addCount,
      bumpTaps,
      resetCount,
      advanceTo,
      jumpTo,
      finish,
      abandon,
      clearHistory,
    }),
    [
      session,
      stats,
      start,
      addCount,
      bumpTaps,
      resetCount,
      advanceTo,
      jumpTo,
      finish,
      abandon,
      clearHistory,
    ],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession harus dipakai di dalam SessionProvider')
  return ctx
}
