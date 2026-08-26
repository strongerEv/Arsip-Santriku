/**
 * Pembungkus localStorage yang aman: aplikasi tetap jalan meski penyimpanan
 * ditolak browser (mode privat/kuota penuh) — data hanya tidak persisten.
 */

const PREFIX = 'arsip-santriku:v1:'

export const KEYS = {
  archives: `${PREFIX}archives`,
  packages: `${PREFIX}packages`,
  settings: `${PREFIX}settings`,
  session: `${PREFIX}session`,
  stats: `${PREFIX}stats`,
} as const

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    /* diabaikan */
  }
}

export function clearAll(): void {
  Object.values(KEYS).forEach(removeKey)
}
