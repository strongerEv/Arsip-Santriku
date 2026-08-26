/**
 * Aplikasi web tidak diizinkan mengubah pengaturan sistem. Yang bisa dilakukan:
 * mencoba membuka halaman pengaturan Mode Pesawat lewat intent Android, lalu
 * selalu menampilkan panduan manual sebagai jalan yang pasti berhasil.
 */

const UA = typeof navigator === 'undefined' ? '' : navigator.userAgent

export function isAndroid(): boolean {
  return /android/i.test(UA)
}

export function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(UA) || (/Mac/.test(UA) && 'ontouchend' in document)
}

/**
 * Mencoba membuka pengaturan Mode Pesawat di Android.
 *
 * Memakai anchor + `S.browser_fallback_url` alih-alih `location.href` langsung:
 * bila intent tidak dikenali, browser kembali ke halaman aplikasi, bukan
 * menampilkan layar error ERR_UNKNOWN_URL_SCHEME.
 */
export function tryOpenAirplaneSettings(): void {
  if (!isAndroid()) return
  try {
    const fallback = encodeURIComponent(window.location.href)
    const link = document.createElement('a')
    link.href =
      'intent://settings#Intent;scheme=android-app;' +
      'action=android.settings.AIRPLANE_MODE_SETTINGS;' +
      `S.browser_fallback_url=${fallback};end`
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch {
    /* diabaikan — panduan manual tetap ditampilkan */
  }
}

/** Langkah manual mengaktifkan Mode Pesawat, disesuaikan per platform. */
export function airplaneSteps(): string[] {
  if (isIOS()) {
    return [
      'Geser dari pojok kanan atas layar untuk membuka Pusat Kontrol.',
      'Ketuk ikon pesawat sampai menyala.',
      'Kembali ke aplikasi ini, lalu ketuk tombol di bawah.',
    ]
  }
  if (isAndroid()) {
    return [
      'Tarik panel notifikasi dari atas layar.',
      'Ketuk ikon "Mode pesawat" — atau buka Pengaturan → Jaringan & internet → Mode pesawat.',
      'Kembali ke aplikasi ini, lalu ketuk tombol di bawah.',
    ]
  }
  return [
    'Matikan WiFi dan jaringan pada perangkat yang kamu pakai.',
    'Bisukan notifikasi agar tidak muncul selama bacaan.',
    'Kembali ke halaman ini, lalu ketuk tombol di bawah.',
  ]
}
