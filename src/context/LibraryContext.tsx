import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ArchiveDoc, ReadingPackage } from '../types'
import { KEYS, loadJSON, saveJSON } from '../lib/storage'
import { SEED_ARCHIVES } from '../data/arsipSeed'
import { BUILT_IN_PACKAGES } from '../data/packages'
import { createId } from '../lib/format'

export type ArchiveDraft = Omit<ArchiveDoc, 'id' | 'createdAt' | 'updatedAt' | 'builtIn'>

interface LibraryContextValue {
  archives: ArchiveDoc[]
  packages: ReadingPackage[]
  getArchive: (id: string) => ArchiveDoc | undefined
  getPackage: (id: string) => ReadingPackage | undefined
  addArchive: (draft: ArchiveDraft) => ArchiveDoc
  updateArchive: (id: string, patch: Partial<ArchiveDraft>) => void
  removeArchive: (id: string) => void
  approveArchive: (id: string) => void
  restoreSeed: () => void
}

const LibraryContext = createContext<LibraryContextValue | null>(null)

/**
 * Arsip bawaan digabung dengan arsip buatan santri. Arsip bawaan yang
 * dihapus pengguna dicatat agar tidak muncul lagi setelah muat ulang.
 */
interface StoredLibrary {
  custom: ArchiveDoc[]
  hiddenSeeds: string[]
}

const EMPTY: StoredLibrary = { custom: [], hiddenSeeds: [] }

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLibrary>(() => ({
    ...EMPTY,
    ...loadJSON<Partial<StoredLibrary>>(KEYS.archives, {}),
  }))

  useEffect(() => {
    saveJSON(KEYS.archives, stored)
  }, [stored])

  const archives = useMemo(() => {
    const seeds = SEED_ARCHIVES.filter((doc) => !stored.hiddenSeeds.includes(doc.id))
    return [...stored.custom, ...seeds].sort((a, b) => b.updatedAt - a.updatedAt)
  }, [stored])

  const packages = BUILT_IN_PACKAGES

  const getArchive = useCallback((id: string) => archives.find((a) => a.id === id), [archives])
  const getPackage = useCallback((id: string) => packages.find((p) => p.id === id), [packages])

  const addArchive = useCallback<LibraryContextValue['addArchive']>((draft) => {
    const now = Date.now()
    const doc: ArchiveDoc = { ...draft, id: createId('arsip'), createdAt: now, updatedAt: now }
    setStored((prev) => ({ ...prev, custom: [doc, ...prev.custom] }))
    return doc
  }, [])

  const updateArchive = useCallback<LibraryContextValue['updateArchive']>((id, patch) => {
    setStored((prev) => ({
      ...prev,
      custom: prev.custom.map((doc) =>
        doc.id === id ? { ...doc, ...patch, updatedAt: Date.now() } : doc,
      ),
    }))
  }, [])

  const removeArchive = useCallback<LibraryContextValue['removeArchive']>((id) => {
    setStored((prev) => {
      const isSeed = SEED_ARCHIVES.some((doc) => doc.id === id)
      return {
        custom: prev.custom.filter((doc) => doc.id !== id),
        hiddenSeeds: isSeed ? [...new Set([...prev.hiddenSeeds, id])] : prev.hiddenSeeds,
      }
    })
  }, [])

  const approveArchive = useCallback<LibraryContextValue['approveArchive']>((id) => {
    setStored((prev) => ({
      ...prev,
      custom: prev.custom.map((doc) =>
        doc.id === id ? { ...doc, status: 'terbit', updatedAt: Date.now() } : doc,
      ),
    }))
  }, [])

  const restoreSeed = useCallback(() => {
    setStored((prev) => ({ ...prev, hiddenSeeds: [] }))
  }, [])

  const value = useMemo(
    () => ({
      archives,
      packages,
      getArchive,
      getPackage,
      addArchive,
      updateArchive,
      removeArchive,
      approveArchive,
      restoreSeed,
    }),
    [
      archives,
      packages,
      getArchive,
      getPackage,
      addArchive,
      updateArchive,
      removeArchive,
      approveArchive,
      restoreSeed,
    ],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary harus dipakai di dalam LibraryProvider')
  return ctx
}
