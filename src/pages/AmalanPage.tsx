import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useSession } from '../context/SessionContext'
import { IconBeads } from '../components/Icons'
import { PageHeader } from '../components/ui'

export function AmalanPage() {
  const { packages } = useLibrary()
  const { session } = useSession()

  return (
    <main className="page page-enter">
      <PageHeader
        title="Amalan"
        subtitle="Istighosah, tahlil, dan bacaan berhitung lain — ikuti urutannya dengan tasbih digital otomatis."
      />

      <div className="stack">
        {packages.map((pkg) => {
          const counted = pkg.readings.filter((r) => r.counted).length
          const running = session?.packageId === pkg.id
          return (
            <Link key={pkg.id} to={`/amalan/${pkg.id}`} className="card card--tappable">
              <div className="row" style={{ gap: 10, marginBottom: 10 }}>
                <span className="list-row__icon">
                  <IconBeads />
                </span>
                <span className="card__eyebrow">{pkg.origin}</span>
                <span className="spacer" />
                {running && <span className="badge">Sedang berjalan</span>}
              </div>
              <p className="card__title" style={{ fontSize: 19 }}>
                {pkg.name}
              </p>
              <p className="card__meta" style={{ marginTop: 8, lineHeight: 1.6 }}>
                {pkg.description}
              </p>
              <div className="row" style={{ gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                <span className="badge badge--neutral">{pkg.readings.length} bacaan</span>
                <span className="badge badge--neutral">{counted} berhitung</span>
              </div>
            </Link>
          )
        })}
      </div>

      <p className="muted-note" style={{ margin: '18px 4px 0' }}>
        Setiap paket bisa dijalankan penuh dari awal, atau dilompati ke bacaan tertentu lewat
        tombol navigasi saat sesi berlangsung.
      </p>
    </main>
  )
}
