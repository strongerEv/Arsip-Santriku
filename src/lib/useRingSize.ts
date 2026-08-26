import { useEffect, useState } from 'react'

/**
 * Diameter tombol tasbih mengambang, mengikuti tinggi layar: di layar kecil
 * ring dikecilkan agar teks Arab tetap kebagian ruang baca.
 */
function pilih(height: number): number {
  if (height >= 900) return 152
  if (height >= 740) return 132
  if (height >= 620) return 116
  return 100
}

export function useRingSize(): number {
  const [size, setSize] = useState(() =>
    typeof window === 'undefined' ? 132 : pilih(window.innerHeight),
  )

  useEffect(() => {
    const onResize = () => setSize(pilih(window.innerHeight))
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return size
}
