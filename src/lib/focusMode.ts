/**
 * Penanda "mode fokus" (sesi sedang berjalan). Dipakai untuk membisukan
 * notifikasi internal aplikasi sendiri — Do Not Disturb ringan — supaya
 * tidak ada gangguan sampai sesi selesai.
 */
let active = false

export function setFocusMode(value: boolean): void {
  active = value
}

export function isFocusMode(): boolean {
  return active
}
