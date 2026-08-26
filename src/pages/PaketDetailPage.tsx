import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useSession } from '../context/SessionContext'
import { useSettings } from '../context/SettingsContext'
import { PreSessionSheet } from '../components/PreSessionSheet'
import { IconChevronLeft, IconPlay, IconRefresh } from '../components/Icons'
import { EmptyState } from '../components/ui'

export function PaketDetailPage() {
  const { packageId = '' } = useParams()
  const navigate = useNavigate()
  const { getPackage } = useLibrary()
  const { session, start } = useSession()
  const { settings } = useSettings()
  const [askAirplane, setAskAirplane] = useState(false)

  const pkg = getPackage(packageId)

  if (!pkg) {
    return (
      <main className="page page-enter">
        <EmptyState title="Paket bacaan tidak ditemukan" />
        <p style={{ textAlign: 'center' }}>
          <Link to="/istighosah" className="btn btn--tinted btn--sm">
            Kembali
          </Link>
        </p>
      </main>
    )
  }

  const running = session?.packageId === pkg.id ? session : null

  const beginSession = () => {
    start(pkg)
    setAskAirplane(false)
    navigate(`/sesi/${pkg.id}`)
  }

  const onStart = () => {
    if (settings.airplaneReminder) setAskAirplane(true)
    else beginSession()
  }

  return (
    <main className="page page-enter">
      <div className="row" style={{ marginBottom: 16 }}>
        <button type="button" className="icon-btn" onClick={() => navigate(-1)} aria-label="Kembali">
          <IconChevronLeft />
        </button>
        <span className="spacer" />
      </div>

      <p className="card__eyebrow">{pkg.origin}</p>
      <h1 className="large-title" style={{ fontSize: 28, marginTop: 4 }}>
        {pkg.name}
      </h1>
      <p className="page-header__sub">{pkg.description}</p>

      {running && (
        <div className="card" style={{ marginTop: 18 }}>
          <p className="card__eyebrow">Sesi tersimpan</p>
          <p style={{ marginTop: 6, fontSize: 15 }}>
            Terhenti di bacaan ke-{running.index + 1} dengan {running.count} hitungan.
          </p>
          <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => navigate(`/sesi/${pkg.id}`)}
            >
              <IconPlay style={{ width: 16, height: 16 }} /> Lanjutkan sesi
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={onStart}>
              <IconRefresh style={{ width: 16, height: 16 }} /> Mulai dari awal
            </button>
          </div>
        </div>
      )}

      {!running && (
        <button
          type="button"
          className="btn btn--primary btn--block btn--lg"
          style={{ marginTop: 20 }}
          onClick={onStart}
        >
          <IconPlay style={{ width: 18, height: 18 }} /> Mulai Istighosah
        </button>
      )}

      <h2 className="section-title">Urutan bacaan</h2>
      <div className="stack">
        {pkg.readings.map((reading, index) => (
          <article key={reading.id} className="card">
            <div className="reading-card__head" style={{ marginBottom: 12 }}>
              <span className="reading-card__index">{index + 1}</span>
              <span className="reading-card__target">
                {!reading.counted
                  ? 'Pembuka'
                  : reading.target
                    ? `${reading.target}×`
                    : 'Sebanyak-banyaknya'}
              </span>
            </div>
            <p className="card__title" style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
              {reading.title}
            </p>
            <p
              className="arabic"
              style={{
                textAlign: 'center',
                fontSize: 'calc(var(--arabic-size) * 0.8)',
                marginTop: 10,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {reading.arabic}
            </p>
          </article>
        ))}
      </div>

      <PreSessionSheet
        open={askAirplane}
        onClose={() => setAskAirplane(false)}
        onContinue={beginSession}
        packageName={pkg.name}
      />
    </main>
  )
}
