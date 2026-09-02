import { useEffect, useRef } from 'react'

/**
 * Tombol volume pada perangkat Bluetooth (remote/tombol rana) dan sebagian
 * keyboard mengirimkan tombol ini sebagai penekanan biasa ke halaman.
 */
const TOMBOL_VOLUME = new Set(['AudioVolumeUp', 'AudioVolumeDown', 'VolumeUp', 'VolumeDown'])

/** Tombol umum yang juga nyaman dipakai menghitung. */
const TOMBOL_MANUAL = new Set([' ', 'Spacebar', 'Enter', 'ArrowUp'])

/**
 * Menambah hitungan lewat tombol fisik.
 *
 * Catatan: browser di Android maupun iOS tidak menerima penekanan tombol
 * volume bawaan perangkat — tombol itu ditangani sistem operasi. Yang sampai
 * ke halaman adalah tombol volume dari perangkat Bluetooth (mis. tombol rana
 * kamera) dan keyboard, dan itulah yang ditangkap di sini.
 */
export function useKeyCounter(active: boolean, onCount: () => void): void {
  const handlerRef = useRef(onCount)
  handlerRef.current = onCount

  useEffect(() => {
    if (!active) return

    const onKey = (event: KeyboardEvent) => {
      if (event.repeat) return

      if (TOMBOL_VOLUME.has(event.key)) {
        event.preventDefault()
        handlerRef.current()
        return
      }

      // Spasi/Enter dilewati bila fokus sedang di elemen interaktif, karena
      // browser sudah mengubahnya menjadi klik pada elemen tersebut.
      const fokus = document.activeElement
      const diElemenInteraktif =
        fokus instanceof HTMLElement && fokus.closest('button, a, input, textarea, select')
      if (TOMBOL_MANUAL.has(event.key) && !diElemenInteraktif) {
        event.preventDefault()
        handlerRef.current()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])
}
