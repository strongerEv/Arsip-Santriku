/**
 * Web tidak boleh mengubah pengaturan sistem. Yang bisa dilakukan adalah
 * mencoba membuka halaman pengaturan Mode Pesawat lewat intent Android;
 * bila tidak berhasil (iOS atau browser memblokir), pengguna diberi panduan manual.
 */
export function isAndroid(): boolean {
  return /android/i.test(navigator.userAgent)
}

const AIRPLANE_INTENT =
  'intent://#Intent;action=android.settings.AIRPLANE_MODE_SETTINGS;end'

/** Mengembalikan true bila percobaan membuka pengaturan sempat dijalankan. */
export function openAirplaneSettings(): boolean {
  if (!isAndroid()) return false
  try {
    window.location.href = AIRPLANE_INTENT
    return true
  } catch {
    return false
  }
}

export const MANUAL_HINT = /iphone|ipad|ipod/i.test(navigator.userAgent)
  ? 'Buka Pengaturan → Mode Pesawat, atau geser Pusat Kontrol lalu ketuk ikon pesawat.'
  : 'Buka Pengaturan → Jaringan & internet → Mode pesawat, atau tarik panel notifikasi lalu ketuk ikon pesawat.'
