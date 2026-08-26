import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useToast } from '../context/ToastContext'
import { categoryLabel } from '../data/categories'
import { formatDateTime } from '../lib/format'
import { archiveToText, shareText } from '../lib/share'
import {
  IconCheckCircle,
  IconChevronLeft,
  IconPencil,
  IconPlay,
  IconShare,
  IconTrash,
} from '../components/Icons'
import { Sheet } from '../components/Sheet'
import { EmptyState } from '../components/ui'

export function ArsipDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { getArchive, removeArchive, approveArchive } = useLibrary()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const doc = getArchive(id)

  if (!doc) {
    return (
      <main className="page page-enter">
        <EmptyState title="Arsip tidak ditemukan" description="Mungkin sudah dihapus." />
        <p style={{ textAlign: 'center' }}>
          <Link to="/arsip" className="btn btn--tinted btn--sm">
            Kembali ke daftar arsip
          </Link>
        </p>
      </main>
    )
  }

  const onShare = async () => {
    const result = await shareText(doc.title, archiveToText(doc))
    if (result === 'copied') toast('Teks arsip disalin ke papan klip')
    else if (result === 'failed') toast('Gagal membagikan arsip')
  }

  const onDelete = () => {
    removeArchive(doc.id)
    setConfirmDelete(false)
    toast('Arsip dihapus')
    navigate('/arsip', { replace: true })
  }

  return (
    <main className="page page-enter">
      <div className="row" style={{ marginBottom: 16 }}>
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Kembali">
          <IconChevronLeft />
        </button>
        <span className="spacer" />
        <button type="button" className="icon-btn" onClick={onShare} aria-label="Bagikan arsip">
          <IconShare />
        </button>
        {!doc.builtIn && (
          <Link to={`/arsip/${doc.id}/ubah`} className="icon-btn" aria-label="Ubah arsip">
            <IconPencil />
          </Link>
        )}
      </div>

      <div className="row" style={{ gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
        <span className="badge badge--neutral">{categoryLabel(doc.category)}</span>
        {doc.status === 'menunggu' && <span className="badge">Menunggu verifikasi</span>}
      </div>
      <h1 className="large-title" style={{ fontSize: 27 }}>
        {doc.title}
      </h1>
      <p className="page-header__sub">
        {doc.author} · Diperbarui {formatDateTime(doc.updatedAt)}
      </p>

      {doc.status === 'menunggu' && (
        <div className="card" style={{ marginTop: 16 }}>
          <p className="card__meta" style={{ marginBottom: 12 }}>
            Arsip ini adalah usulan santri dan belum diverifikasi pengasuh. Setelah teks dipastikan
            benar, tandai sebagai terverifikasi agar tampil sebagai arsip resmi.
          </p>
          <button
            type="button"
            className="btn btn--tinted btn--sm"
            onClick={() => {
              approveArchive(doc.id)
              toast('Arsip ditandai terverifikasi')
            }}
          >
            <IconCheckCircle style={{ width: 17, height: 17 }} /> Tandai terverifikasi
          </button>
        </div>
      )}

      {doc.packageId && (
        <Link
          to={`/istighosah/${doc.packageId}`}
          className="btn btn--primary btn--block"
          style={{ marginTop: 18 }}
        >
          <IconPlay style={{ width: 17, height: 17 }} /> Buka mode sesi & tasbih
        </Link>
      )}

      {doc.arabic && (
        <section className="reading-card" style={{ marginTop: 18 }}>
          <p className="reading-card__arabic">{doc.arabic}</p>
          {(doc.latin || doc.translation) && <div className="reading-card__divider" />}
          {doc.latin && <p className="reading-card__latin">{doc.latin}</p>}
          {doc.translation && <p className="reading-card__translation">{doc.translation}</p>}
        </section>
      )}

      {!doc.arabic && doc.translation && (
        <section className="card" style={{ marginTop: 18 }}>
          <p style={{ lineHeight: 1.7 }}>{doc.translation}</p>
        </section>
      )}

      {doc.body && (
        <section className="card" style={{ marginTop: 14 }}>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>{doc.body}</p>
        </section>
      )}

      {doc.image && (
        <figure className="card" style={{ marginTop: 14, padding: 12 }}>
          <img
            src={doc.image}
            alt={`Scan naskah: ${doc.title}`}
            style={{ width: '100%', borderRadius: 14, display: 'block' }}
          />
        </figure>
      )}

      {doc.source && (
        <p className="muted-note" style={{ marginTop: 16 }}>
          Sumber: {doc.source}
        </p>
      )}

      <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center' }}>
        <button type="button" className="btn btn--danger btn--sm" onClick={() => setConfirmDelete(true)}>
          <IconTrash style={{ width: 16, height: 16 }} /> Hapus arsip
        </button>
      </div>

      <Sheet
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Hapus arsip ini?"
        actions={
          <>
            <button type="button" className="btn btn--primary btn--block" onClick={onDelete}>
              Ya, hapus
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setConfirmDelete(false)}
            >
              Batal
            </button>
          </>
        }
      >
        {doc.builtIn
          ? 'Arsip bawaan ini akan disembunyikan dari daftar. Bisa dikembalikan lewat Pengaturan.'
          : 'Arsip yang dihapus tidak bisa dikembalikan.'}
      </Sheet>
    </main>
  )
}
