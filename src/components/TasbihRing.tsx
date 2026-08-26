import { useEffect, useRef, useState } from 'react'

interface TasbihRingProps {
  count: number
  /** `null` berarti tanpa target ("sebanyak-banyaknya"). */
  target: number | null
  onTap: () => void
  size?: number
  disabled?: boolean
}

/**
 * Tombol tasbih berbentuk activity ring ala Apple Watch:
 * lingkaran progress tipis mengelilingi angka hitungan, area tap besar,
 * dengan micro-animation scale-down tiap ketukan.
 */
export function TasbihRing({ count, target, onTap, size = 236, disabled }: TasbihRingProps) {
  const [bump, setBump] = useState(0)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count
      setBump((b) => b + 1)
    }
  }, [count])

  const stroke = Math.round(size * 0.055)
  const radius = (size - stroke) / 2 - 2
  const circumference = 2 * Math.PI * radius

  // Tanpa target: ring berputar tiap 33 hitungan supaya tetap terasa bergerak.
  const ratio = target ? Math.min(count / target, 1) : (count % 33) / 33
  const offset = circumference * (1 - ratio)

  const label = target
    ? `Tasbih: ${count} dari ${target}. Ketuk untuk menambah hitungan.`
    : `Tasbih: ${count} hitungan, tanpa batas. Ketuk untuk menambah hitungan.`

  return (
    <button
      type="button"
      className={`ring${bump ? ' ring--bump' : ''}`}
      style={{ width: size, height: size }}
      onClick={onTap}
      disabled={disabled}
      aria-label={label}
      key={bump}
    >
      <svg className="ring__svg" width={size} height={size} aria-hidden="true">
        <circle className="ring__glow" cx={size / 2} cy={size / 2} r={radius - stroke * 0.75} />
        <circle
          className="ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="ring__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="ring__content">
        <span className="ring__count">{count}</span>
        <span className="ring__target">{target ? `dari ${target}` : 'tanpa batas'}</span>
        {target && count >= target && <span className="ring__hint">Tercapai</span>}
      </span>
    </button>
  )
}
