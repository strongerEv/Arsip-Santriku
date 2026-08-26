import type { ArchiveDoc } from '../types'
import { categoryLabel } from '../data/categories'
import { formatDate } from './format'

/** Susun teks arsip yang rapi untuk dibagikan ke grup WhatsApp dsb. */
export function archiveToText(doc: ArchiveDoc): string {
  const parts: string[] = [`*${doc.title}*`, `${categoryLabel(doc.category)} · ${formatDate(doc.updatedAt)}`, '']
  if (doc.arabic) parts.push(doc.arabic, '')
  if (doc.latin) parts.push(`_${doc.latin}_`, '')
  if (doc.translation) parts.push(doc.translation, '')
  if (doc.body) parts.push(doc.body, '')
  if (doc.source) parts.push(`Sumber: ${doc.source}`)
  parts.push(`Diarsipkan oleh ${doc.author} — Arsip Santriku`)
  return parts.join('\n').trim()
}

export type ShareResult = 'shared' | 'copied' | 'failed'

/** Bagikan lewat share sheet perangkat; bila tidak tersedia, salin ke papan klip. */
export async function shareText(title: string, text: string): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share({ title, text })
      return 'shared'
    } catch (err) {
      // Pengguna membatalkan share sheet — bukan kegagalan.
      if (err instanceof DOMException && err.name === 'AbortError') return 'shared'
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
