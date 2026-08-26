import { Link } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useSession } from '../context/SessionContext'
import { IconBeads, IconPlay } from '../components/Icons'
import { PageHeader } from '../components/ui'

export function IstighosahPage() {
  const { packages } = useLibrary()
  const { session } = useSession()

  return (
    <main className="page page-enter">
      <PageHeader
        title="Istighosah"
        subtitle="Pilih paket bacaan, lalu ikuti urutannya dengan tasbih digital otomatis."
      />

      <div className="stack">
        {packages.map((pkg) => {
          const counted = pkg.readings.filter((r) => r.counted).length
          const running = session?.packageId === pkg.id
          return (
            <Link key={pkg.id} to={`/istighosah/${pkg.id}`} className="card card--tappable">
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

      <h2 className="section-title">Tasbih bebas</h2>
      <div className="card">
        <p className="card__meta" style={{ lineHeight: 1.6 }}>
          Ingin berdzikir tanpa paket tertentu? Buka paket mana pun lalu langsung ke bacaan
          penutup — tasbih akan menghitung terus tanpa batas sampai kamu menekan Selesai.
        </p>
        {packages[0] && (
          <Link
            to={`/istighosah/${packages[0].id}`}
            className="btn btn--tinted btn--sm"
            style={{ marginTop: 14 }}
          >
            <IconPlay style={{ width: 16, height: 16 }} /> Buka paket
          </Link>
        )}
      </div>
    </main>
  )
}
