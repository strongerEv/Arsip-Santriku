import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { CATEGORIES, categoryLabel } from '../data/categories'
import type { CategoryId } from '../types'
import { relativeDay } from '../lib/format'
import { IconImage, IconPlus, IconSearch } from '../components/Icons'
import { EmptyState, PageHeader } from '../components/ui'

type Filter = CategoryId | 'semua'

export function ArsipPage() {
  const { archives } = useLibrary()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('semua')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return archives.filter((doc) => {
      if (filter !== 'semua' && doc.category !== filter) return false
      if (!q) return true
      return [doc.title, doc.latin, doc.translation, doc.body, doc.author, doc.source]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q))
    })
  }, [archives, query, filter])

  const pending = archives.filter((doc) => doc.status === 'menunggu').length

  return (
    <main className="page page-enter">
      <PageHeader
        title="Arsip"
        subtitle={`${archives.length} dokumen tersimpan${pending ? ` · ${pending} menunggu verifikasi` : ''}`}
        action={
          <Link to="/arsip/baru" className="btn btn--primary btn--sm" aria-label="Tambah arsip">
            <IconPlus style={{ width: 17, height: 17 }} /> Tambah
          </Link>
        }
      />

      <label className="search-field">
        <IconSearch style={{ width: 18, height: 18, flex: 'none' }} />
        <input
          type="search"
          value={query}
          placeholder="Cari judul, teks, atau pengunggah"
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Cari arsip"
        />
      </label>

      <div className="chip-scroller" style={{ marginTop: 12 }}>
        <button
          type="button"
          className={`chip${filter === 'semua' ? ' is-active' : ''}`}
          onClick={() => setFilter('semua')}
        >
          Semua
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`chip${filter === cat.id ? ' is-active' : ''}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <EmptyState
          title="Belum ada arsip yang cocok"
          description="Coba ubah kata kunci atau kategori, atau tambahkan arsip baru."
        />
      ) : (
        <div className="stack">
          {results.map((doc) => (
            <Link key={doc.id} to={`/arsip/${doc.id}`} className="card card--tappable">
              <div className="row" style={{ gap: 8, marginBottom: 8 }}>
                <span className="card__eyebrow">{categoryLabel(doc.category)}</span>
                <span className="spacer" />
                {doc.status === 'menunggu' && <span className="badge">Menunggu verifikasi</span>}
                {doc.image && <IconImage style={{ width: 16, height: 16, color: 'var(--text-tertiary)' }} />}
              </div>
              <p className="card__title">{doc.title}</p>
              {doc.arabic && (
                <p
                  className="arabic"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.9,
                    marginTop: 10,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {doc.arabic}
                </p>
              )}
              {!doc.arabic && doc.body && (
                <p
                  className="card__meta"
                  style={{
                    marginTop: 8,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {doc.body}
                </p>
              )}
              <p className="card__meta" style={{ marginTop: 12 }}>
                {doc.author} · {relativeDay(doc.updatedAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
