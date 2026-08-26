import type { ArchiveDoc } from '../types'
import { ISTIGHOSAH_ANNAJAH } from './istighosah'

const DAY = 24 * 60 * 60 * 1000
const base = Date.parse('2025-01-06T08:00:00+07:00')

function at(daysAgo: number): number {
  return base - daysAgo * DAY
}

/**
 * Arsip bawaan aplikasi. Selalu ada meski penyimpanan lokal kosong,
 * sehingga santri tetap punya bacaan saat pertama kali membuka aplikasi.
 */
export const SEED_ARCHIVES: ArchiveDoc[] = [
  {
    id: 'seed-istighosah-annajah',
    title: 'Istighosah Pesma An Najah (Lengkap 1–17)',
    category: 'istighosah',
    body: 'Susunan lengkap istighosah rutin Pesma An Najah, dari tawassul hingga dzikir penutup. Tersedia dalam mode sesi dengan tasbih digital otomatis.',
    translation: ISTIGHOSAH_ANNAJAH.description,
    author: 'Pengurus Pesma An Najah',
    source: 'Ijazah KH. Abdul Ghofur',
    createdAt: at(120),
    updatedAt: at(120),
    status: 'terbit',
    builtIn: true,
    packageId: ISTIGHOSAH_ANNAJAH.id,
  },
  {
    id: 'seed-tawassul',
    title: 'Tawassul Pembuka Istighosah',
    category: 'doa',
    arabic: ISTIGHOSAH_ANNAJAH.readings[0].arabic,
    translation: ISTIGHOSAH_ANNAJAH.readings[0].translation,
    author: 'Pengurus Pesma An Najah',
    source: 'Naskah istighosah Pesma An Najah',
    createdAt: at(120),
    updatedAt: at(118),
    status: 'terbit',
    builtIn: true,
  },
  {
    id: 'seed-nariyah',
    title: 'Sholawat Nariyah',
    category: 'sholawat',
    arabic: ISTIGHOSAH_ANNAJAH.readings[12].arabic,
    latin: ISTIGHOSAH_ANNAJAH.readings[12].latin,
    translation: ISTIGHOSAH_ANNAJAH.readings[12].translation,
    body: 'Lazim dibaca 4444x untuk hajat besar, atau 7x dalam susunan istighosah rutin.',
    author: 'Pengurus Pesma An Najah',
    createdAt: at(96),
    updatedAt: at(96),
    status: 'terbit',
    builtIn: true,
  },
  {
    id: 'seed-wirid-badar',
    title: 'Wirid Ba‘da Sholat Fardhu',
    category: 'wirid',
    arabic:
      'سُبْحَانَ اللهِ ٣٣× ، اَلْحَمْدُ لِلَّهِ ٣٣× ، اَللهُ أَكْبَرُ ٣٣× ، لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيْكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيْرٌ',
    latin:
      'Subḥānallāh 33×, Alḥamdulillāh 33×, Allāhu akbar 33×, Lā ilāha illallāhu waḥdahū lā syarīka lah, lahul-mulku wa lahul-ḥamdu wa huwa ‘alā kulli syai’in qadīr',
    translation:
      'Maha Suci Allah, segala puji bagi Allah, Allah Maha Besar. Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya kerajaan dan segala puji, dan Dia Maha Kuasa atas segala sesuatu.',
    author: 'Ustadz Pengampu',
    createdAt: at(64),
    updatedAt: at(60),
    status: 'terbit',
    builtIn: true,
  },
  {
    id: 'seed-doa-ilmu',
    title: 'Doa Memohon Ilmu Bermanfaat',
    category: 'doa',
    arabic:
      'اَللَّهُمَّ إِنِّيْ أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',
    latin: 'Allāhumma innī as’aluka ‘ilman nāfi‘an wa rizqan thayyiban wa ‘amalan mutaqabbalā',
    translation:
      'Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat, rezeki yang baik, dan amal yang diterima.',
    author: 'Ustadz Pengampu',
    createdAt: at(40),
    updatedAt: at(40),
    status: 'terbit',
    builtIn: true,
  },
  {
    id: 'seed-kajian-adab',
    title: 'Ringkasan Kajian: Adab Sebelum Ilmu',
    category: 'kajian',
    body: `Poin-poin kajian rutin malam Selasa:

1. Adab adalah pintu masuk ilmu — para salaf mempelajari adab bertahun-tahun sebelum menuntut ilmu.
2. Menghormati guru: tidak memotong pembicaraan, tidak mendahului duduk, dan mendoakan beliau.
3. Menjaga niat: ilmu dituntut untuk mengangkat kebodohan diri, bukan untuk berdebat.
4. Mengamalkan yang sedikit lebih utama daripada menghafal banyak tanpa amal.
5. Menjaga kebersihan hati dari hasad terhadap sesama penuntut ilmu.`,
    author: 'Tim Notulen Kajian',
    createdAt: at(21),
    updatedAt: at(21),
    status: 'terbit',
    builtIn: true,
  },
  {
    id: 'seed-pengumuman-istighosah',
    title: 'Pengumuman: Istighosah Rutin Malam Jumat',
    category: 'pengumuman',
    body: `Diberitahukan kepada seluruh santri Pesma An Najah bahwa istighosah rutin dilaksanakan setiap malam Jumat pukul 20.00 WIB di aula utama.

Santri dimohon:
• Hadir 10 menit sebelum acara dimulai.
• Mengenakan busana muslim rapi dan bersarung.
• Mengaktifkan Mode Pesawat selama sesi berlangsung agar tidak terganggu notifikasi.

Barang siapa berhalangan hadir, dimohon mengikuti secara mandiri melalui aplikasi Arsip Santriku.`,
    author: 'Sekretariat Pesma',
    createdAt: at(7),
    updatedAt: at(7),
    status: 'terbit',
    builtIn: true,
  },
]
