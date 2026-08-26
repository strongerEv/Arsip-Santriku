/**
 * Kontak pengembang. Nomor sengaja hanya dipakai untuk menyusun tautan
 * dan tidak pernah ditampilkan sebagai teks di antarmuka.
 */
const NOMOR_WA = '6285177421890'

export const APP_VERSION = '1.0.0'
export const DEVELOPER = 'هاشم'

/** Template pesan usulan fitur, sudah terisi rapi saat WhatsApp terbuka. */
function pesanUsulanFitur(): string {
  return [
    `Assalamu'alaikum. Saya pengguna aplikasi Arsip Santriku (versi ${APP_VERSION}).`,
    '',
    'Saya ingin mengusulkan sebuah fitur:',
    '',
    '• Nama fitur:',
    '• Fungsinya untuk apa:',
    '• Kira-kira cara kerjanya:',
    '',
    'Terima kasih banyak, semoga aplikasinya semakin bermanfaat. 🙏',
  ].join('\n')
}

/** Tautan WhatsApp berisi template usulan fitur. */
export function tautanUsulanFitur(): string {
  return `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesanUsulanFitur())}`
}
