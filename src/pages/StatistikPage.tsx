import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { useSholawat } from '../context/SholawatContext'
import { computeProgress, dateKey } from '../lib/program'
import { useToast } from '../context/ToastContext'
import { formatDateTime, formatDuration, formatNumber } from '../lib/format'
import { Sheet } from '../components/Sheet'
import { IconCheckCircle, IconChevronLeft, IconClock, IconFlame, IconHeart } from '../components/Icons'
import { EmptyState, PageHeader } from '../components/ui'

export function StatistikPage() {
  const { stats, clearHistory } = useSession()
  const { program } = useSholawat()
  const navigate = useNavigate()
  const toast = useToast()
  const [confirm, setConfirm] = useState(false)

  const ringkasan = useMemo(() => {
    const khatam = stats.completions.filter((c) => c.complete).length
    const durasi = stats.completions.reduce((sum, c) => sum + (c.finishedAt - c.startedAt), 0)
    return { khatam, durasi, sesi: stats.completions.length }
  }, [stats])

  return (
    <main className="page page-enter">
      <div className="row" style={{ marginBottom: 14 }}>
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Kembali">
          <IconChevronLeft />
        </button>
        <span className="spacer" />
      </div>

      <PageHeader title="Statistik" subtitle="Riwayat ibadahmu — untuk menjaga istiqamah." />

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(stats.totalTaps)}</p>
          <p className="stat-card__label">Total hitungan tasbih</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(ringkasan.khatam)}</p>
          <p className="stat-card__label">Amalan dikhatamkan</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(ringkasan.sesi)}</p>
          <p className="stat-card__label">Sesi tercatat</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value" style={{ fontSize: 24 }}>
            {formatDuration(ringkasan.durasi)}
          </p>
          <p className="stat-card__label">Total waktu berdzikir</p>
        </div>
      </div>

      {program && (() => {
        const p = computeProgress(program, dateKey())
        return (
          <>
            <h2 className="section-title">Program Cinta Shalawat</h2>
            <div className="card">
              <div className="row">
                <span className="list-row__icon">
                  <IconHeart />
                </span>
                <span className="list-row__label">
                  <span className="card__title" style={{ display: 'block', fontSize: 15 }}>
                    {program.name}
                  </span>
                  <span className="card__meta">
                    {formatNumber(p.total)} dari {formatNumber(program.targetTotal)} sholawat
                  </span>
                </span>
                <span className="list-row__value">{Math.round(p.percent)}%</span>
              </div>
              <div className="meter" style={{ marginTop: 14 }}>
                <div className="meter__fill" style={{ width: `${p.percent}%` }} />
              </div>
            </div>
          </>
        )
      })()}

      <h2 className="section-title">Riwayat sesi</h2>
      {stats.completions.length === 0 ? (
        <EmptyState
          title="Belum ada sesi tercatat"
          description="Riwayat muncul setelah kamu menyelesaikan satu sesi amalan."
        />
      ) : (
        <div className="stack">
          {stats.completions.map((rec) => (
            <article key={rec.id} className="card">
              <div className="row" style={{ gap: 8, marginBottom: 8 }}>
                <span className="card__eyebrow">{formatDateTime(rec.finishedAt)}</span>
                <span className="spacer" />
                {rec.complete ? (
                  <span className="badge">
                    <IconCheckCircle style={{ width: 13, height: 13 }} /> Khatam
                  </span>
                ) : (
                  <span className="badge badge--neutral">Sebagian</span>
                )}
              </div>
              <p className="card__title">{rec.packageName}</p>
              <div className="row" style={{ gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
                <span className="card__meta">
                  <IconFlame style={{ width: 14, height: 14, verticalAlign: '-2px' }} />{' '}
                  {formatNumber(rec.totalTaps)} hitungan
                </span>
                <span className="card__meta">
                  <IconClock style={{ width: 14, height: 14, verticalAlign: '-2px' }} />{' '}
                  {formatDuration(rec.finishedAt - rec.startedAt)}
                </span>
                <span className="card__meta">
                  {rec.readingsDone}/{rec.readingsTotal} bacaan
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {stats.completions.length > 0 && (
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
          <button type="button" className="btn btn--danger btn--sm" onClick={() => setConfirm(true)}>
            Hapus riwayat
          </button>
        </div>
      )}

      <Sheet
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Hapus seluruh riwayat?"
        actions={
          <>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                clearHistory()
                setConfirm(false)
                toast('Riwayat statistik dihapus')
              }}
            >
              Ya, hapus
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setConfirm(false)}
            >
              Batal
            </button>
          </>
        }
      >
        Total hitungan dan seluruh catatan sesi akan direset ke nol.
      </Sheet>
    </main>
  )
}
