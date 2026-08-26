import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLibrary, type ArchiveDraft } from '../context/LibraryContext'
import { useToast } from '../context/ToastContext'
import { CATEGORIES } from '../data/categories'
import type { ArchiveStatus, CategoryId } from '../types'
import { fileToCompressedDataUrl } from '../lib/image'
import { IconChevronLeft, IconImage, IconTrash } from '../components/Icons'
import { Segmented } from '../components/ui'

export function ArsipEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { getArchive, addArchive, updateArchive } = useLibrary()
  const existing = id ? getArchive(id) : undefined
  const fileInput = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<ArchiveDraft>(() => ({
    title: existing?.title ?? '',
    category: existing?.category ?? 'doa',
    arabic: existing?.arabic ?? '',
    latin: existing?.latin ?? '',
    translation: existing?.translation ?? '',
    body: existing?.body ?? '',
    image: existing?.image,
    author: existing?.author ?? '',
    source: existing?.source ?? '',
    status: existing?.status ?? 'menunggu',
  }))
  const [saving, setSaving] = useState(false)

  const set = <K extends keyof ArchiveDraft>(key: K, value: ArchiveDraft[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const onPickImage = async (file: File | undefined) => {
    if (!file) return
    try {
      set('image', await fileToCompressedDataUrl(file))
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Gagal memuat gambar')
    }
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.title.trim()) {
      toast('Judul arsip belum diisi')
      return
    }
    setSaving(true)
    const payload: ArchiveDraft = {
      ...form,
      title: form.title.trim(),
      author: form.author.trim() || 'Santri',
      arabic: form.arabic?.trim() || undefined,
      latin: form.latin?.trim() || undefined,
      translation: form.translation?.trim() || undefined,
      body: form.body?.trim() || undefined,
      source: form.source?.trim() || undefined,
    }

    if (existing && !existing.builtIn) {
      updateArchive(existing.id, payload)
      toast('Perubahan tersimpan')
      navigate(`/arsip/${existing.id}`, { replace: true })
    } else {
      const doc = addArchive(payload)
      toast(
        payload.status === 'menunggu'
          ? 'Usulan arsip terkirim, menunggu verifikasi'
          : 'Arsip tersimpan',
      )
      navigate(`/arsip/${doc.id}`, { replace: true })
    }
    setSaving(false)
  }

  return (
    <main className="page page-enter">
      <div className="row" style={{ marginBottom: 16 }}>
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Kembali">
          <IconChevronLeft />
        </button>
        <span className="spacer" />
      </div>

      <h1 className="large-title" style={{ fontSize: 28 }}>
        {existing ? 'Ubah arsip' : 'Arsip baru'}
      </h1>
      <p className="page-header__sub">
        Teks Arab, transliterasi, dan terjemahan disimpan terpisah agar naskah asli tetap terjaga.
      </p>

      <form onSubmit={onSubmit} className="stack" style={{ marginTop: 20, gap: 18 }}>
        <div className="card stack" style={{ gap: 16 }}>
          <div className="field">
            <label className="field__label" htmlFor="judul">
              Judul
            </label>
            <input
              id="judul"
              className="field__control"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Misal: Wirid Ba‘da Subuh"
              required
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="kategori">
              Kategori
            </label>
            <select
              id="kategori"
              className="field__control"
              value={form.category}
              onChange={(e) => set('category', e.target.value as CategoryId)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="pengunggah">
              Pengunggah
            </label>
            <input
              id="pengunggah"
              className="field__control"
              value={form.author}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Nama santri / pengurus"
            />
          </div>
        </div>

        <div className="card stack" style={{ gap: 16 }}>
          <div className="field">
            <label className="field__label" htmlFor="arab">
              Teks Arab
            </label>
            <textarea
              id="arab"
              className="field__control is-arabic"
              value={form.arabic}
              onChange={(e) => set('arabic', e.target.value)}
              placeholder="اكْتُبِ النَّصَّ الْعَرَبِيَّ هُنَا"
              dir="rtl"
            />
            <p className="field__hint">Sertakan harakat lengkap agar sesuai naskah asli.</p>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="latin">
              Transliterasi Latin
            </label>
            <textarea
              id="latin"
              className="field__control"
              style={{ minHeight: 80 }}
              value={form.latin}
              onChange={(e) => set('latin', e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="arti">
              Terjemahan
            </label>
            <textarea
              id="arti"
              className="field__control"
              style={{ minHeight: 80 }}
              value={form.translation}
              onChange={(e) => set('translation', e.target.value)}
            />
          </div>
        </div>

        <div className="card stack" style={{ gap: 16 }}>
          <div className="field">
            <label className="field__label" htmlFor="catatan">
              Catatan / isi dokumen
            </label>
            <textarea
              id="catatan"
              className="field__control"
              value={form.body}
              onChange={(e) => set('body', e.target.value)}
              placeholder="Keterangan tambahan, isi surat, atau ringkasan materi kajian."
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="sumber">
              Sumber
            </label>
            <input
              id="sumber"
              className="field__control"
              value={form.source}
              onChange={(e) => set('source', e.target.value)}
              placeholder="Kitab, ijazah, atau nama pengasuh"
            />
          </div>

          <div className="field">
            <span className="field__label">Scan / foto naskah</span>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => void onPickImage(e.target.files?.[0])}
            />
            {form.image ? (
              <div className="stack" style={{ gap: 10 }}>
                <img
                  src={form.image}
                  alt="Pratinjau scan naskah"
                  style={{ width: '100%', borderRadius: 14, display: 'block' }}
                />
                <button
                  type="button"
                  className="btn btn--danger btn--sm"
                  onClick={() => set('image', undefined)}
                >
                  <IconTrash style={{ width: 16, height: 16 }} /> Hapus gambar
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                onClick={() => fileInput.current?.click()}
              >
                <IconImage style={{ width: 17, height: 17 }} /> Pilih gambar
              </button>
            )}
            <p className="field__hint">Gambar diperkecil otomatis agar tetap ringan dan bisa dibuka offline.</p>
          </div>
        </div>

        <div className="list-group">
          <div className="list-row">
            <span className="list-row__label">Status arsip</span>
            <Segmented<ArchiveStatus>
              label="Status arsip"
              value={form.status}
              onChange={(value) => set('status', value)}
              options={[
                { value: 'menunggu', label: 'Usulan' },
                { value: 'terbit', label: 'Terverifikasi' },
              ]}
            />
          </div>
        </div>
        <p className="muted-note" style={{ marginTop: -8 }}>
          Usulan santri sebaiknya diverifikasi pengasuh/ustadz sebelum ditandai terverifikasi.
        </p>

        <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={saving}>
          {existing ? 'Simpan perubahan' : 'Simpan arsip'}
        </button>
      </form>
    </main>
  )
}
