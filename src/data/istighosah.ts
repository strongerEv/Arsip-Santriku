import type { ReadingPackage } from '../types'

/**
 * Paket "Istighosah Pesma An Najah" — sesuai naskah pada PRD.
 * Bacaan pembuka (tawassul) tidak memakai hitungan; bacaan #2–17 memakai tasbih.
 * Bacaan terakhir bertarget `null` ("sebanyak-banyaknya") sehingga tidak auto-pindah.
 */
export const ISTIGHOSAH_ANNAJAH: ReadingPackage = {
  id: 'istighosah-annajah',
  name: 'Istighosah Pesma An Najah',
  origin: 'Pesma An Najah',
  description:
    'Susunan lengkap 1–17 sesuai ijazah KH. Abdul Ghofur. Dibuka dengan tawassul, dilanjut bacaan berhitung hingga bacaan penutup tanpa batas.',
  builtIn: true,
  readings: [
    {
      id: 'annajah-01',
      title: 'Tawassul & Al-Fatihah',
      counted: false,
      target: null,
      note: 'Bacaan pembuka tanpa hitungan. Baca tawassul lalu Al-Fatihah pada tiap jeda, kemudian lanjut ke bacaan berikutnya.',
      arabic: `إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَالِهِ وَأَزْوَاجِهِ وَأَوْلَادِهِ وَذُرِّيَاتِهِ. شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةْ...

ثُمَّ إِلَى حَضْرَةِ إِخْوَانِهِ مِنَ الْأَنْبِيَاءِ وَالْمُرْسَلِيْنَ وَالْأَوْلِيَاءِ وَالشُّهَدَاءِ وَالصَّالِحِيْنَ وَالصَّحَابَةِ وَالتَّابِعِيْنَ وَالْعُلَمَاءِ وَالْمُصَنِّفِيْنَ وَجَمِيْعِ الْمَلَائِكَةِ الْمُقَرَّبِيْنَ خُصُوْصًا سَيِّدِنَا الشَّيْخِ عَبْدِ الْقَادِرِ الْجَيْلَانِيِّ رَضِيَ اللهُ عَنْهُ. الْفَاتِحَةْ...

ثُمَّ إِلَى جَمِيْعِ أَهْلِ الْقُبُوْرِ مِنَ الْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ مِنْ مَشَارِقِ الْأَرْضِ إِلَى مَغَارِبِهَا بَرِّهَا وَبَحْرِهَا خُصُوْصًا إِلَى آبَائِنَا وَأُمَّهَاتِنَا وَأَجْدَادِنَا وَجَدَّاتِنَا وَمَشَايِخِنَا وَمَشَايِخِ مَشَايِخِنَا وَ أَسَاتِذَتِنَا وَأَسَاتِذَةِ أَسَاتِذَتِنَا وَلِمَنِ اجْتَمَعْنَا هَهُنَا بِسَبَبِهِ. شَيْءٌ لِلَّهِ لَهُمُ الْفَاتِحَةْ...

ثُمَّ خُصُوْصًا إِلَى صَاحِبِ الْإِجَازَةِ وَمَنْ أَجَازَهَا كِيَاهِي الْحَاجِّ عَبْدِ الْغَفُوْرِ وَالِهِ وَمَشَايِخِهِ. لَهُمُ الْفَاتِحَةْ...`,
      translation:
        'Hadiah Al-Fatihah kepada Nabi Muhammad ﷺ beserta keluarga dan keturunannya; para nabi, wali, syuhada, sholihin, sahabat, tabi‘in, ulama dan malaikat — khususnya Syekh Abdul Qadir al-Jailani; seluruh ahli kubur kaum muslimin, orang tua, kakek-nenek, dan para guru kita; serta khusus kepada pemilik dan pemberi ijazah, KH. Abdul Ghofur beserta keluarga dan guru-guru beliau.',
    },
    {
      id: 'annajah-02',
      title: 'Istighfar',
      counted: true,
      target: 41,
      arabic: 'أَسْتَغْفِرُ اللهَ الْعَظِيمَ',
      latin: 'Astaghfirullāhal-‘azhīm',
      translation: 'Aku memohon ampun kepada Allah Yang Maha Agung.',
    },
    {
      id: 'annajah-03',
      title: 'Hasbunallah',
      counted: true,
      target: 41,
      arabic: 'حَسْبُنَا اللهُ وَنِعْمَ الْوَكِيلُ',
      latin: 'Ḥasbunallāhu wa ni‘mal-wakīl',
      translation: 'Cukuplah Allah bagi kami, dan Dia sebaik-baik pelindung.',
    },
    {
      id: 'annajah-04',
      title: 'Sholawat',
      counted: true,
      target: 41,
      arabic: 'اَللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ',
      latin: 'Allāhumma shalli ‘alā sayyidinā Muḥammad wa ‘alā āli sayyidinā Muḥammad',
      translation:
        'Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarga beliau.',
    },
    {
      id: 'annajah-05',
      title: 'Yā Ḥafīzh',
      counted: true,
      target: 41,
      arabic: 'يَا حَفِيْظُ يَا نَصِيْرُ يَا وَكِيْلُ يَا اللهُ',
      latin: 'Yā Ḥafīzhu yā Nashīru yā Wakīlu yā Allāh',
      translation:
        'Wahai Yang Maha Menjaga, Maha Menolong, Maha Pelindung, wahai Allah.',
    },
    {
      id: 'annajah-06',
      title: 'Yā Ḥayyu yā Qayyūm',
      counted: true,
      target: 41,
      arabic: 'يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ',
      latin: 'Yā Ḥayyu yā Qayyūmu birahmatika astaghīts',
      translation:
        'Wahai Yang Maha Hidup, Maha Berdiri Sendiri, dengan rahmat-Mu aku memohon pertolongan.',
    },
    {
      id: 'annajah-07',
      title: 'Shalātu was-salām',
      counted: true,
      target: 41,
      arabic:
        'اَلصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا سَيِّدِيْ يَا رَسُوْلَ اللهِ خُذْ بِيَدِيْ قَدْ ضَاقَتْ حِيْلَتِيْ أَدْرِكْنِيْ',
      latin:
        'Ash-shalātu was-salāmu ‘alaika yā sayyidī yā Rasūlallāh, khudz biyadī qad ḍāqat ḥīlatī adriknī',
      translation:
        'Sholawat dan salam untukmu wahai junjunganku Rasulullah. Raihlah tanganku, telah sempit segala upayaku, tolonglah aku.',
    },
    {
      id: 'annajah-08',
      title: 'Basmalah',
      counted: true,
      target: 41,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      latin: 'Bismillāhir-raḥmānir-raḥīm',
      translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang.',
    },
    {
      id: 'annajah-09',
      title: 'Yā man ismuhu ‘azhīm',
      counted: true,
      target: 41,
      arabic: 'يَا مَنِ اسْمُهُ عَظِيْمٌ يَا مَنْ كَرَمُهُ عَظِيْمٌ',
      latin: 'Yā manismuhu ‘azhīm yā man karamuhu ‘azhīm',
      translation: 'Wahai Yang nama-Nya agung, wahai Yang kemurahan-Nya agung.',
    },
    {
      id: 'annajah-10',
      title: 'Asmaul Husna',
      counted: true,
      target: 41,
      arabic:
        'يَا اللهُ يَا قُدُّوْسُ يَا سَلَامُ يَا مُؤْمِنُ يَا مُهَيْمِنُ يَا عَزِيْزُ يَا جَبَّارُ يَا مُتَكَبِّرُ يَا بَارِئُ يَا مُصَوِّرُ يَا مُبْدِئُ يَا مُعِيْدُ يَا أَحَدُ يَا صَمَدُ يَا حَقُّ يَا قَادِرُ يَا كَرِيْمُ يَا وَهَّابُ يَا عَلِيُّ يَا عَظِيْمُ',
      latin:
        'Yā Allāhu yā Quddūsu yā Salāmu yā Mu’minu yā Muhaiminu yā ‘Azīzu yā Jabbāru yā Mutakabbiru yā Bāri’u yā Mushawwiru yā Mubdi’u yā Mu‘īdu yā Aḥadu yā Shamadu yā Ḥaqqu yā Qādiru yā Karīmu yā Wahhābu yā ‘Aliyyu yā ‘Azhīm',
      translation:
        'Wahai Allah, Yang Maha Suci, Maha Sejahtera, Maha Pemberi Keamanan, Maha Pemelihara, Maha Perkasa, Maha Kuasa, Maha Megah, Maha Pencipta, Maha Pembentuk, Maha Memulai, Maha Mengembalikan, Maha Esa, tempat bergantung, Maha Benar, Maha Kuasa, Maha Mulia, Maha Pemberi, Maha Tinggi, Maha Agung.',
    },
    {
      id: 'annajah-11',
      title: 'Rabbanā anzil ‘alainā',
      counted: true,
      target: 41,
      arabic:
        'رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُوْنُ لَنَا عِيْدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِيْنَ',
      latin:
        'Rabbanā anzil ‘alainā mā’idatan minas-samā’i takūnu lanā ‘īdan li’awwalinā wa ākhirinā wa āyatan minka warzuqnā wa anta khairur-rāziqīn',
      translation:
        'Ya Tuhan kami, turunkanlah kepada kami hidangan dari langit yang menjadi hari raya bagi kami — bagi orang-orang yang sekarang bersama kami maupun yang datang sesudah kami — dan menjadi tanda dari-Mu. Berilah kami rezeki, dan Engkaulah sebaik-baik pemberi rezeki. (QS. Al-Mā’idah: 114)',
    },
    {
      id: 'annajah-12',
      title: 'Rabbanā taqabbal minnā',
      counted: true,
      target: 41,
      arabic:
        'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيْعُ الْعَلِيْمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيْمُ',
      latin:
        'Rabbanā taqabbal minnā innaka antas-samī‘ul ‘alīm, wa tub ‘alainā innaka antat-tawwābur-raḥīm',
      translation:
        'Ya Tuhan kami, terimalah amal dari kami. Sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui. Dan terimalah taubat kami; sesungguhnya Engkau Maha Penerima taubat lagi Maha Penyayang.',
    },
    {
      id: 'annajah-13',
      title: 'Sholawat Nariyah',
      counted: true,
      target: 7,
      arabic:
        'اَللَّهُمَّ صَلِّ صَلَاةً كَامِلَةً وَسَلِّمْ سَلَامًا تَامًّا عَلَى سَيِّدِنَا مُحَمَّدٍ الَّذِيْ تَنْحَلُّ بِهِ الْعُقَدُ وَتَنْفَرِجُ بِهِ الْكُرَبُ وَتُقْضَى بِهِ الْحَوَائِجُ وَتُنَالُ بِهِ الرَّغَائِبُ وَحُسْنُ الْخَوَاتِمِ وَيُسْتَسْقَى الْغَمَامُ بِوَجْهِهِ الْكَرِيْمِ وَعَلَى آلِهِ وَصَحْبِهِ فِيْ كُلِّ لَمْحَةٍ وَنَفَسٍ بِعَدَدِ كُلِّ مَعْلُوْمٍ لَكَ',
      latin:
        'Allāhumma shalli shalātan kāmilatan wa sallim salāman tāmman ‘alā sayyidinā Muḥammadinilladzī tanḥallu bihil-‘uqad, wa tanfariju bihil-kurab, wa tuqḍā bihil-ḥawā’ij, wa tunālu bihir-raghā’ib, wa ḥusnul-khawātim, wa yustasqal-ghamāmu biwajhihil-karīm, wa ‘alā ālihī wa shaḥbihī fī kulli lamḥatin wa nafasin bi‘adadi kulli ma‘lūmin laka',
      translation:
        'Ya Allah, limpahkanlah rahmat yang sempurna dan salam yang paripurna kepada junjungan kami Nabi Muhammad — yang dengannya terurai segala ikatan, sirna segala kesusahan, tertunai segala kebutuhan, tercapai segala harapan dan husnul khatimah, serta turun hujan berkat wajahnya yang mulia — juga kepada keluarga dan sahabatnya, pada setiap kedipan mata dan hembusan napas, sebanyak segala yang Engkau ketahui.',
    },
    {
      id: 'annajah-14',
      title: 'Yā Muḥawwilal-aḥwāl',
      counted: true,
      target: 7,
      arabic:
        'اَللَّهُمَّ يَا مُحَوِّلَ الْأَحْوَالِ حَوِّلْ حَالَنَا إِلَى أَحْسَنِ الْأَحْوَالِ بِحَوْلِكَ وَقُوَّتِكَ يَا كَبِيْرُ يَا مُتَعَالِ يَا عَزِيْزُ يَا مِفْضَالِ',
      latin:
        'Allāhumma yā Muḥawwilal-aḥwāl, ḥawwil ḥālanā ilā aḥsanil-aḥwāl, biḥaulika wa quwwatika yā Kabīru yā Muta‘āl, yā ‘Azīzu yā Mifḍāl',
      translation:
        'Ya Allah, wahai Yang membolak-balikkan keadaan, ubahlah keadaan kami menjadi sebaik-baik keadaan dengan daya dan kekuatan-Mu, wahai Yang Maha Besar, Maha Tinggi, Maha Perkasa, Maha Pemurah.',
    },
    {
      id: 'annajah-15',
      title: 'Allāhumma yassir umūranā',
      counted: true,
      target: 7,
      arabic:
        'اَللَّهُمَّ يَسِّرْ أُمُوْرَنَا كُلَّهَا وَسَهِّلْ أُمُوْرَنَا كُلَّهَا وَلَا تُعَسِّرْ عَلَيْنَا شَيْئًا مِنْهَا يَا رَبَّ الْعَالَمِيْنَ',
      latin:
        'Allāhumma yassir umūranā kullahā wa sahhil umūranā kullahā wa lā tu‘assir ‘alainā syai’an minhā yā Rabbal-‘ālamīn',
      translation:
        'Ya Allah, mudahkanlah seluruh urusan kami, lancarkanlah semuanya, dan jangan Engkau persulit sedikit pun bagi kami, wahai Tuhan semesta alam.',
    },
    {
      id: 'annajah-16',
      title: 'Tahlil',
      counted: true,
      target: 41,
      arabic: 'لَا إِلَهَ إِلَّا اللهُ',
      latin: 'Lā ilāha illallāh',
      translation: 'Tiada Tuhan selain Allah.',
    },
    {
      id: 'annajah-17',
      title: 'Dzikir Ismudz-Dzat',
      counted: true,
      target: null,
      note: 'Dibaca sebanyak-banyaknya — tidak ada target tetap. Tekan tombol "Selesai" bila sudah cukup.',
      arabic: 'اَللهُ اَللهُ اَللهُ',
      latin: 'Allāh, Allāh, Allāh',
      translation: 'Allah, Allah, Allah.',
    },
  ],
}
