import type { ReactNode } from 'react'

interface ProgressRingProps {
  /** Nilai 0–1. */
  value: number
  size?: number
  strokeRatio?: number
  children?: ReactNode
}

/** Cincin progress tampilan-saja, sebentuk dengan tombol tasbih. */
export function ProgressRing({ value, size = 180, strokeRatio = 0.06, children }: ProgressRingProps) {
  const stroke = Math.round(size * strokeRatio)
  const radius = (size - stroke) / 2 - 2
  const circumference = 2 * Math.PI * radius
  const ratio = Math.max(0, Math.min(1, value))

  return (
    <div className="ring ring--static" style={{ width: size, height: size }}>
      <svg className="ring__svg" width={size} height={size} aria-hidden="true">
        <circle className="ring__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
        <circle
          className="ring__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
        />
      </svg>
      <span className="ring__content">{children}</span>
    </div>
  )
}
