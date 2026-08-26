/**
 * Getar ringan sebagai penanda interaksi. Tidak semua perangkat/browser
 * mendukung Vibration API (iOS Safari tidak) — panggilan gagal diabaikan.
 */

let enabled = true

export function setHapticsEnabled(value: boolean): void {
  enabled = value
}

type Pattern = 'tap' | 'advance' | 'finish' | 'warn'

const PATTERNS: Record<Pattern, number | number[]> = {
  tap: 12,
  advance: [24, 46, 24],
  finish: [30, 60, 30, 60, 90],
  warn: 40,
}

export function haptic(pattern: Pattern = 'tap'): void {
  if (!enabled) return
  try {
    navigator.vibrate?.(PATTERNS[pattern])
  } catch {
    /* diabaikan */
  }
}
