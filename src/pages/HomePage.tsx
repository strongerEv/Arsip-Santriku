import { Link, useNavigate } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useSession } from '../context/SessionContext'
import { categoryLabel } from '../data/categories'
import { formatNumber, relativeDay } from '../lib/format'
import { IconBook, IconChevronRight, IconHeart, IconPlay, IconWifiSlash } from '../components/Icons'
import { useSholawat } from '../context/SholawatContext'
import { computeProgress, dateKey } from '../lib/program'
import { ListRow } from '../components/ui'
import { useEffect, useState } from 'react'

function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 11) return 'Selamat pagi'
  if (hour < 15) return 'Selamat siang'
  if (hour < 18) return 'Selamat sore'
  return 'Selamat malam'
}

export function HomePage() {
  const navigate = useNavigate()
  const { archives, packages, getPackage } = useLibrary()
  const { session, stats } = useSession()
  const { program } = useSholawat()
  const [offline, setOffline] = useState(() => !navigator.onLine)

  useEffect(() => {
    const update = () => setOffline(!navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  const sholawat = program ? computeProgress(program, dateKey()) : null
  const runningPackage = session ? getPackage(session.packageId) : undefined
  const mainPackage = packages[0]
  const recent = archives.slice(0, 4)
  const khatam = stats.completions.filter((c) => c.complete).length

  return (
    <main className="page page-enter">
      <header className="page-header">
        <p className="page-header__sub" style={{ marginTop: 0 }}>{greeting()},</p>
        <h1 className="large-title">Arsip Santriku</h1>
        {offline && (
          <p style={{ marginTop: 10 }}>
            <span className="badge badge--neutral">
              <IconWifiSlash style={{ width: 14, height: 14 }} /> Mode offline — arsip tetap terbaca
            </span>
          </p>
        )}
      </header>

      {session && runningPackage ? (
        <button
          type="button"
          className="card card--accent card--tappable"
          onClick={() => navigate(`/sesi/${runningPackage.id}`)}
        >
          <p className="card__eyebrow" style={{ color: 'rgba(255,255,255,.72)' }}>
            Sesi belum selesai
          </p>
          <p style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.3px', marginTop: 6 }}>
            Lanjutkan {runningPackage.name}
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,.82)', marginTop: 6 }}>
            Bacaan ke-{session.index + 1} dari {runningPackage.readings.length} · {session.count}×
            terhitung
          </p>
          <span className="btn btn--sm" style={{ marginTop: 16, background: 'rgba(255,255,255,.18)', color: '#fff' }}>
            <IconPlay style={{ width: 16, height: 16 }} /> Lanjutkan sesi
          </span>
        </button>
      ) : (
        mainPackage && (
          <button
            type="button"
            className="card card--accent card--tappable"
            onClick={() => navigate(`/amalan/${mainPackage.id}`)}
          >
            <p className="card__eyebrow" style={{ color: 'rgba(255,255,255,.72)' }}>
              Bacaan rutin
            </p>
            <p style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.3px', marginTop: 6 }}>
              {mainPackage.name}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,.82)', marginTop: 6 }}>
              {mainPackage.readings.length} bacaan · tasbih digital otomatis
            </p>
            <span className="btn btn--sm" style={{ marginTop: 16, background: 'rgba(255,255,255,.18)', color: '#fff' }}>
              <IconPlay style={{ width: 16, height: 16 }} /> Mulai istighosah
            </span>
          </button>
        )
      )}

      <div className="stat-grid" style={{ marginTop: 12 }}>
        <Link to="/statistik" className="stat-card card--tappable">
          <p className="stat-card__value">{formatNumber(stats.totalTaps)}</p>
          <p className="stat-card__label">Total hitungan tasbih</p>
        </Link>
        <Link to="/statistik" className="stat-card card--tappable">
          <p className="stat-card__value">{formatNumber(khatam)}</p>
          <p className="stat-card__label">Amalan dikhatamkan</p>
        </Link>
      </div>

      <h2 className="section-title">Program Cinta Shalawat</h2>
      {program && sholawat ? (
        <div className="card">
          <div className="row">
            <span className="list-row__icon">
              <IconHeart />
            </span>
            <span>
              <span className="card__title" style={{ display: 'block', fontSize: 15 }}>
                {program.name}
              </span>
              <span className="card__meta">
                {formatNumber(sholawat.total)} / {formatNumber(program.targetTotal)} ·{' '}
                {Math.round(sholawat.percent)}%
              </span>
            </span>
          </div>

          <div className="meter" style={{ marginTop: 14 }}>
            <div className="meter__fill" style={{ width: `${sholawat.percent}%` }} />
          </div>

          <p className="card__meta" style={{ marginTop: 10 }}>
            Hari ini {formatNumber(sholawat.today)} dari {formatNumber(sholawat.dailyTarget)}
            {sholawat.todayRemaining > 0
              ? ` · kurang ${formatNumber(sholawat.todayRemaining)}`
              : ' · sudah tuntas'}
          </p>

          <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <Link to="/program/sholawat/baca" className="btn btn--primary btn--sm">
              <IconPlay style={{ width: 16, height: 16 }} /> Baca sholawat
            </Link>
            <Link to="/program/sholawat" className="btn btn--secondary btn--sm">
              Lihat progres
            </Link>
          </div>
        </div>
      ) : (
        <Link to="/program/sholawat" className="card card--tappable">
          <div className="row">
            <span className="list-row__icon">
              <IconHeart />
            </span>
            <span className="list-row__label">
              <span className="card__title" style={{ display: 'block', fontSize: 15 }}>
                Pasang target sholawat
              </span>
              <span className="card__meta">
                Misal 10.000 sholawat dalam 30 hari — target harian dihitung otomatis.
              </span>
            </span>
            <span className="list-row__chevron">
              <IconChevronRight />
            </span>
          </div>
        </Link>
      )}

      <h2 className="section-title">Arsip terbaru</h2>
      <div className="list-group">
        {recent.map((doc) => (
          <ListRow
            key={doc.id}
            to={`/arsip/${doc.id}`}
            icon={<IconBook />}
            label={
              <span>
                {doc.title}
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-tertiary)' }}>
                  {categoryLabel(doc.category)} · {relativeDay(doc.updatedAt)}
                </span>
              </span>
            }
            chevron
          />
        ))}
      </div>

      <p style={{ marginTop: 14, textAlign: 'center' }}>
        <Link to="/arsip" className="btn btn--tinted btn--sm">
          Lihat semua arsip <IconChevronRight style={{ width: 15, height: 15 }} />
        </Link>
      </p>
    </main>
  )
}
