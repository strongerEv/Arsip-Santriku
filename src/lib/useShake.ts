import { useEffect, useRef } from 'react'

const THRESHOLD = 16 // m/s² di atas gravitasi normal
const COOLDOWN = 420 // jeda agar satu goyangan tidak terhitung berkali-kali

/**
 * Mendeteksi goyangan perangkat sebagai pengganti tap tasbih.
 * Di iOS 13+ izin harus diminta lewat gestur pengguna — lihat `requestMotionPermission`.
 */
export function useShake(active: boolean, onShake: () => void): void {
  const lastRef = useRef(0)
  const handlerRef = useRef(onShake)
  handlerRef.current = onShake

  useEffect(() => {
    if (!active || typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return

    const onMotion = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity
      if (!acc) return
      const magnitude = Math.hypot(acc.x ?? 0, acc.y ?? 0, acc.z ?? 0)
      // Kurangi gravitasi (~9.81) agar hanya gerakan tegas yang terhitung.
      if (magnitude - 9.81 < THRESHOLD) return
      const now = Date.now()
      if (now - lastRef.current < COOLDOWN) return
      lastRef.current = now
      handlerRef.current()
    }

    window.addEventListener('devicemotion', onMotion)
    return () => window.removeEventListener('devicemotion', onMotion)
  }, [active])
}

type MotionCtor = typeof DeviceMotionEvent & { requestPermission?: () => Promise<PermissionState> }

/** Meminta izin sensor gerak (khusus iOS). Mengembalikan true bila boleh dipakai. */
export async function requestMotionPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('DeviceMotionEvent' in window)) return false
  const ctor = window.DeviceMotionEvent as MotionCtor
  if (typeof ctor.requestPermission !== 'function') return true
  try {
    return (await ctor.requestPermission()) === 'granted'
  } catch {
    return false
  }
}
