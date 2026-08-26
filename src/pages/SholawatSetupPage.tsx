import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSholawat, type ProgramDraft } from '../context/SholawatContext'
import { useToast } from '../context/ToastContext'
import {
  CUSTOM_TEXT_ID,
  DURATION_PRESETS,
  SHOLAWAT_TEXTS,
  TARGET_PRESETS,
  findSholawatText,
} from '../data/sholawat'
import { addDays, dateKey, parseKey } from '../lib/program'
import { formatDate, formatNumber } from '../lib/format'
import { IconChevronLeft } from '../components/Icons'
import { ListRow, Switch } from '../components/ui'

const DEFAULT_NAME = 'Program Cinta Nabi Muhammad ﷺ'

export function SholawatSetupPage({ mode = 'baru' }: { mode?: 'baru' | 'ubah' }) {
  const navigate = useNavigate()
  const toast = useToast()
  const { program, createProgram, updateProgram } = useSholawat()
  const editing = mode === 'ubah' && program

  const [draft, setDraft] = useState<ProgramDraft>(() => ({
    name: editing ? program.name : DEFAULT_NAME,
    targetTotal: editing ? program.targetTotal : 10000,
    days: editing ? program.days : 30,
    startDate: editing ? program.startDate : dateKey(),
    textId: editing ? program.textId : 'ummi',
    adaptiveDaily: editing ? program.adaptiveDaily : true,
    customName: editing ? program.customName : '',
    customArabic: editing ? program.customArabic : '',
  }))

  const set = <K extends keyof ProgramDraft>(key: K, value: ProgramDraft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }))

  const perHari = Math.ceil(draft.targetTotal / Math.max(1, draft.days))
  const selesai = addDays(draft.startDate, Math.max(1, draft.days) - 1)
  const teks = findSholawatText(draft.textId)

  const perkiraanMenit = useMemo(() => {
    const detik = draft.textId === CUSTOM_TEXT_ID ? 8 : (teks?.detik ?? 8)
    return Math.max(1, Math.round((perHari * detik) / 60))
  }, [draft.textId, teks, perHari])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (draft.targetTotal < 1 || draft.days < 1) {
      toast('Target dan jumlah hari harus lebih dari nol')
      return
    }
    if (draft.textId === CUSTOM_TEXT_ID && !draft.customArabic?.trim()) {
      toast('Teks sholawat sendiri belum diisi')
      return
    }
    const payload: ProgramDraft = {
      ...draft,
      name: draft.name.trim() || DEFAULT_NAME,
      customName: draft.customName?.trim() || undefined,
      customArabic: draft.customArabic?.trim() || undefined,
    }
    if (editing) {
      updateProgram(payload)
      toast('Program diperbarui')
    } else {
      createProgram(payload)
      toast('Program dimulai — semoga istiqamah')
    }
    navigate('/sholawat', { replace: true })
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
        {editing ? 'Ubah program' : 'Susun program'}
      </h1>
      <p className="page-header__sub">
        Tentukan berapa jumlah sholawat yang ingin dicapai dan dalam berapa hari. Target harian
        dihitung otomatis.
      </p>

      <form onSubmit={onSubmit} className="stack" style={{ marginTop: 20, gap: 18 }}>
        <div className="card stack" style={{ gap: 16 }}>
          <div className="field">
            <label className="field__label" htmlFor="nama">
              Nama program
            </label>
            <input
              id="nama"
              className="field__control"
              value={draft.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder={DEFAULT_NAME}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="target">
              Target jumlah sholawat
            </label>
            <input
              id="target"
              className="field__control"
              type="number"
              inputMode="numeric"
              min={1}
              max={10000000}
              value={draft.targetTotal}
              onChange={(e) => set('targetTotal', Math.max(1, Number(e.target.value) || 0))}
            />
            <div className="preset-row" style={{ marginTop: 4 }}>
              {TARGET_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`chip${draft.targetTotal === n ? ' is-active' : ''}`}
                  onClick={() => set('targetTotal', n)}
                >
                  {formatNumber(n)}×
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="hari">
              Dalam berapa hari
            </label>
            <input
              id="hari"
              className="field__control"
              type="number"
              inputMode="numeric"
              min={1}
              max={3650}
              value={draft.days}
              onChange={(e) => set('days', Math.max(1, Number(e.target.value) || 0))}
            />
            <div className="preset-row" style={{ marginTop: 4 }}>
              {DURATION_PRESETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`chip${draft.days === n ? ' is-active' : ''}`}
                  onClick={() => set('days', n)}
                >
                  {n} hari
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="mulai">
              Tanggal mulai
            </label>
            <input
              id="mulai"
              className="field__control"
              type="date"
              value={draft.startDate}
              onChange={(e) => set('startDate', e.target.value || dateKey())}
            />
          </div>
        </div>

        <div className="card">
          <p className="card__eyebrow" style={{ marginBottom: 10 }}>
            Ringkasan
          </p>
          <div className="summary-line">
            <span className="text-secondary">Target harian</span>
            <span className="summary-line__value">{formatNumber(perHari)}× per hari</span>
          </div>
          <div className="summary-line">
            <span className="text-secondary">Perkiraan waktu</span>
            <span className="summary-line__value">± {perkiraanMenit} menit per hari</span>
          </div>
          <div className="summary-line">
            <span className="text-secondary">Selesai pada</span>
            <span className="summary-line__value">
              {formatDate(parseKey(selesai).getTime())}
            </span>
          </div>
        </div>

        <div>
          <h2 className="section-title" style={{ marginTop: 0 }}>
            Teks sholawat
          </h2>
          <div className="list-group">
            {SHOLAWAT_TEXTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`pick${draft.textId === item.id ? ' is-active' : ''}`}
                onClick={() => set('textId', item.id)}
                aria-pressed={draft.textId === item.id}
              >
                <span className="pick__head">
                  <span className="pick__radio" />
                  <span className="pick__name">{item.name}</span>
                </span>
                {item.arabic && <span className="pick__arabic">{item.arabic}</span>}
              </button>
            ))}
          </div>
        </div>

        {draft.textId === CUSTOM_TEXT_ID && (
          <div className="card stack" style={{ gap: 16 }}>
            <div className="field">
              <label className="field__label" htmlFor="nama-teks">
                Nama sholawat
              </label>
              <input
                id="nama-teks"
                className="field__control"
                value={draft.customName ?? ''}
                onChange={(e) => set('customName', e.target.value)}
                placeholder="Misal: Sholawat Fatih"
              />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="teks-arab">
                Teks Arab
              </label>
              <textarea
                id="teks-arab"
                className="field__control is-arabic"
                dir="rtl"
                value={draft.customArabic ?? ''}
                onChange={(e) => set('customArabic', e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="list-group">
          <ListRow
            label="Sesuaikan target harian otomatis"
            trailing={
              <Switch
                label="Sesuaikan target harian otomatis"
                checked={draft.adaptiveDaily}
                onChange={(v) => set('adaptiveDaily', v)}
              />
            }
          />
        </div>
        <p className="muted-note" style={{ marginTop: -8 }}>
          Bila aktif, target harian dihitung ulang dari sisa bacaan dibagi sisa hari — jadi ketika
          sempat tertinggal, targetnya menyesuaikan sendiri.
        </p>

        <button type="submit" className="btn btn--primary btn--block btn--lg">
          {editing ? 'Simpan perubahan' : 'Mulai program'}
        </button>
      </form>
    </main>
  )
}
