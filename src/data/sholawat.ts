import type { SholawatText } from '../types'

/** Pilihan teks sholawat untuk Program Cinta Shalawat. */
export const SHOLAWAT_TEXTS: SholawatText[] = [
  {
    id: 'jibril',
    name: 'Sholawat Jibril',
    arabic: 'صَلَّى اللهُ عَلَى مُحَمَّدٍ',
    latin: 'Shallallāhu ‘alā Muḥammad',
    translation: 'Semoga Allah melimpahkan rahmat kepada Nabi Muhammad.',
    detik: 3,
  },
  {
    id: 'ummi',
    name: 'Sholawat Pendek',
    arabic: 'اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
    latin: 'Allāhumma shalli ‘alā sayyidinā Muḥammad wa ‘alā āli sayyidinā Muḥammad',
    translation:
      'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarga beliau.',
    detik: 6,
  },
  {
    id: 'ibrahimiyah',
    name: 'Sholawat Ibrahimiyah',
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيْمَ وَعَلَى آلِ إِبْرَاهِيْمَ إِنَّكَ حَمِيْدٌ مَجِيْدٌ',
    latin:
      'Allāhumma shalli ‘alā Muḥammad wa ‘alā āli Muḥammad kamā shallaita ‘alā Ibrāhīm wa ‘alā āli Ibrāhīm innaka ḥamīdun majīd',
    translation:
      'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarganya, sebagaimana Engkau limpahkan rahmat kepada Nabi Ibrahim dan keluarganya. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
    detik: 12,
  },
  {
    id: 'nariyah',
    name: 'Sholawat Nariyah',
    arabic:
      'اَللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِيْ تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيْمِ وَعَلَى آلِهِ وَصَحْبِهِ فِيْ كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُوْمٍ لَكَ',
    latin:
      'Allāhumma shalli shalātan kāmilatan wa sallim salāman tāmman ‘alā sayyidinā Muḥammadinilladzī tanḥallu bihil-‘uqad…',
    translation:
      'Ya Allah, limpahkanlah rahmat yang sempurna dan salam yang paripurna kepada junjungan kami Nabi Muhammad — yang dengannya terurai segala ikatan dan sirna segala kesusahan.',
    detik: 25,
  },
  {
    id: 'munjiyat',
    name: 'Sholawat Munjiyat',
    arabic:
      'اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ صَلَاةً تُنْجِيْنَا بِهَا مِنْ جَمِيْعِ الْأَهْوَالِ وَالْآفَاتِ وَتَقْضِيْ لَنَا بِهَا جَمِيْعَ الْحَاجَاتِ وَتُطَهِّرُنَا بِهَا مِنْ جَمِيْعِ السَّيِّئَاتِ وَتَرْفَعُنَا بِهَا عِنْدَكَ أَعْلَى الدَّرَجَاتِ وَتُبَلِّغُنَا بِهَا أَقْصَى الْغَايَاتِ مِنْ جَمِيْعِ الْخَيْرَاتِ فِي الْحَيَاةِ وَبَعْدَ الْمَمَاتِ',
    latin:
      'Allāhumma shalli ‘alā sayyidinā Muḥammad shalātan tunjīnā bihā min jamī‘il-ahwāli wal-āfāt…',
    translation:
      'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad — rahmat yang menyelamatkan kami dari segala ketakutan dan bencana, menunaikan segala hajat kami, menyucikan kami dari segala keburukan, mengangkat derajat kami di sisi-Mu, dan menyampaikan kami pada puncak segala kebaikan semasa hidup maupun sesudah mati.',
    detik: 30,
  },
  {
    id: 'custom',
    name: 'Teks sendiri',
    arabic: '',
    detik: 8,
  },
]

export const CUSTOM_TEXT_ID = 'custom'

export function findSholawatText(id: string): SholawatText | undefined {
  return SHOLAWAT_TEXTS.find((t) => t.id === id)
}

/** Preset cepat saat menyusun program. */
export const TARGET_PRESETS = [1000, 4444, 10000, 100000]
export const DURATION_PRESETS = [7, 30, 40, 100]
