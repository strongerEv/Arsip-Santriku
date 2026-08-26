import { useEffect, useRef } from 'react'

type WakeLockSentinelLike = { release: () => Promise<void>; released: boolean }

/**
 * Menjaga layar tetap menyala selama sesi berlangsung (Screen Wake Lock API).
 * Otomatis diminta ulang ketika tab kembali terlihat, karena browser melepas
 * wake lock saat halaman disembunyikan.
 */
export function useWakeLock(active: boolean): void {
  const sentinelRef = useRef<WakeLockSentinelLike | null>(null)

  useEffect(() => {
    if (!active) return
    const wakeLock = (navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<WakeLockSentinelLike> } }).wakeLock
    if (!wakeLock) return

    let cancelled = false

    const request = async () => {
      try {
        const sentinel = await wakeLock.request('screen')
        if (cancelled) {
          void sentinel.release()
          return
        }
        sentinelRef.current = sentinel
      } catch {
        /* ditolak atau tidak didukung — abaikan */
      }
    }

    const onVisibility = () => {
      if (document.visibilityState === 'visible' && sentinelRef.current?.released !== false) {
        void request()
      }
    }

    void request()
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', onVisibility)
      const sentinel = sentinelRef.current
      sentinelRef.current = null
      if (sentinel && !sentinel.released) void sentinel.release().catch(() => {})
    }
  }, [active])
}
