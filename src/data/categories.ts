import type { Category, CategoryId } from '../types'

export const CATEGORIES: Category[] = [
  { id: 'istighosah', label: 'Istighosah' },
  { id: 'tahlil', label: 'Tahlil' },
  { id: 'wirid', label: 'Wirid' },
  { id: 'sholawat', label: 'Sholawat' },
  { id: 'doa', label: 'Doa' },
  { id: 'kajian', label: 'Materi Kajian' },
  { id: 'pengumuman', label: 'Surat / Pengumuman' },
  { id: 'lainnya', label: 'Lainnya' },
]

const LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label])) as Record<
  CategoryId,
  string
>

export function categoryLabel(id: CategoryId): string {
  return LABELS[id] ?? 'Lainnya'
}
