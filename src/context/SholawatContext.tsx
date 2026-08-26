import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { SholawatProgram } from '../types'
import { loadJSON, saveJSON } from '../lib/storage'
import { createId } from '../lib/format'
import { dateKey } from '../lib/program'

const STORAGE_KEY = 'arsip-santriku:v1:sholawat'

export type ProgramDraft = Pick<
  SholawatProgram,
  'name' | 'targetTotal' | 'days' | 'startDate' | 'textId' | 'adaptiveDaily'
> &
  Partial<Pick<SholawatProgram, 'customName' | 'customArabic'>>

interface Stored {
  active: SholawatProgram | null
  history: SholawatProgram[]
}

const EMPTY: Stored = { active: null, history: [] }

interface SholawatContextValue {
  program: SholawatProgram | null
  history: SholawatProgram[]
  createProgram: (draft: ProgramDraft) => void
  /** Ubah pengaturan program tanpa menghapus catatan hitungan. */
  updateProgram: (patch: Partial<ProgramDraft>) => void
  /** Tambah hitungan sholawat untuk hari ini. */
  addCount: (delta?: number) => void
  /** Akhiri program dan pindahkan ke riwayat. */
  finishProgram: () => void
  deleteProgram: () => void
  clearHistory: () => void
}

const SholawatContext = createContext<SholawatContextValue | null>(null)

export function SholawatProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<Stored>(() => ({
    ...EMPTY,
    ...loadJSON<Partial<Stored>>(STORAGE_KEY, {}),
  }))

  useEffect(() => {
    saveJSON(STORAGE_KEY, stored)
  }, [stored])

  const createProgram = useCallback<SholawatContextValue['createProgram']>((draft) => {
    setStored((prev) => ({
      active: { ...draft, id: createId('program'), log: {}, createdAt: Date.now() },
      // Program lama yang belum selesai tetap disimpan sebagai riwayat.
      history: prev.active ? [{ ...prev.active, finishedAt: Date.now() }, ...prev.history] : prev.history,
    }))
  }, [])

  const updateProgram = useCallback<SholawatContextValue['updateProgram']>((patch) => {
    setStored((prev) => (prev.active ? { ...prev, active: { ...prev.active, ...patch } } : prev))
  }, [])

  const addCount = useCallback<SholawatContextValue['addCount']>((delta = 1) => {
    setStored((prev) => {
      if (!prev.active) return prev
      const key = dateKey()
      const next = Math.max(0, (prev.active.log[key] ?? 0) + delta)
      return { ...prev, active: { ...prev.active, log: { ...prev.active.log, [key]: next } } }
    })
  }, [])

  const finishProgram = useCallback(() => {
    setStored((prev) =>
      prev.active
        ? { active: null, history: [{ ...prev.active, finishedAt: Date.now() }, ...prev.history] }
        : prev,
    )
  }, [])

  const deleteProgram = useCallback(() => {
    setStored((prev) => ({ ...prev, active: null }))
  }, [])

  const clearHistory = useCallback(() => {
    setStored((prev) => ({ ...prev, history: [] }))
  }, [])

  const value = useMemo(
    () => ({
      program: stored.active,
      history: stored.history,
      createProgram,
      updateProgram,
      addCount,
      finishProgram,
      deleteProgram,
      clearHistory,
    }),
    [stored, createProgram, updateProgram, addCount, finishProgram, deleteProgram, clearHistory],
  )

  return <SholawatContext.Provider value={value}>{children}</SholawatContext.Provider>
}

export function useSholawat(): SholawatContextValue {
  const ctx = useContext(SholawatContext)
  if (!ctx) throw new Error('useSholawat harus dipakai di dalam SholawatProvider')
  return ctx
}
