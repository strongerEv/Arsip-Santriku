import type { Reading } from '../types'

interface ReadingCardProps {
  reading: Reading
  /** Nomor urut yang ditampilkan di pojok card. */
  order: number
  total: number
  showLatin?: boolean
  showTranslation?: boolean
  /** Kunci untuk memicu animasi masuk saat berganti bacaan. */
  animateKey?: string | number
}

/**
 * Card bacaan bergaya Apple: sudut membulat besar, shadow tipis,
 * teks Arab sebagai fokus utama, nomor & jumlah hitungan sebagai info sekunder.
 */
export function ReadingCard({
  reading,
  order,
  total,
  showLatin = true,
  showTranslation = true,
  animateKey,
}: ReadingCardProps) {
  const targetLabel = !reading.counted
    ? 'Pembuka'
    : reading.target
      ? `${reading.target}×`
      : 'Sebanyak-banyaknya'

  return (
    <article className="reading-card reading-card--in" key={animateKey}>
      <header className="reading-card__head">
        <span className="reading-card__index">
          {order}/{total}
        </span>
        <span className="reading-card__target">{targetLabel}</span>
      </header>

      <p className="reading-card__arabic">{reading.arabic}</p>

      {(showLatin && reading.latin) || (showTranslation && reading.translation) ? (
        <div className="reading-card__divider" />
      ) : null}

      {showLatin && reading.latin && <p className="reading-card__latin">{reading.latin}</p>}
      {showTranslation && reading.translation && (
        <p className="reading-card__translation">{reading.translation}</p>
      )}

      {reading.note && <p className="muted-note" style={{ textAlign: 'center' }}>{reading.note}</p>}
    </article>
  )
}
