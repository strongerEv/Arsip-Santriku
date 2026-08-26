# Arsip Santriku

Arsip digital bacaan, wirid, dan dokumen pesantren — dilengkapi **tasbih digital
otomatis** untuk bacaan berhitung seperti istighosah. Dibangun sebagai PWA
(bisa dipasang di layar utama HP dan tetap jalan tanpa internet).

Dibuat mengikuti PRD Aplikasi Arsip Santri untuk Pesma An Najah, dengan palet
**hijau emerald** dan card bacaan bergaya **Apple Human Interface Guidelines**.

## Fitur

### Modul A — Arsip Santri
- Simpan dokumen: teks Arab berharakat, transliterasi Latin, terjemahan, catatan bebas, dan foto/scan naskah.
- Kategori: Istighosah, Tahlil, Wirid, Sholawat, Doa, Materi Kajian, Surat/Pengumuman, Lainnya.
- Pencarian bebas (judul, teks, pengunggah, sumber) dan filter kategori.
- **Kontribusi terverifikasi**: arsip baru masuk sebagai "usulan" hingga ditandai terverifikasi.
- **Export/Share**: bagikan teks arsip yang sudah dirapikan lewat share sheet perangkat, atau salin ke papan klip.

### Modul B — Bacaan berhitung + tasbih digital
- Paket bacaan tersusun sebagai playlist berurutan (tab **Amalan**: Istighosah dan Tahlil).
- Tombol tasbih berbentuk **activity ring** (seperti Apple Watch) dengan angka besar di tengah.
- Hitungan naik tiap ketukan, atau dengan **menggoyangkan perangkat** (opsional, butuh izin sensor gerak).
- **Auto-pindah** ke bacaan berikutnya saat target tercapai, dengan transisi halus + getar penanda.
- **Tasbih mengambang**: teks Arab memakai seluruh tinggi layar, tasbih menempel di bawah dan selalu terlihat — jadi bisa membaca sambil menghitung tanpa menggulir. Mengetuk di mana saja pada area teks juga menambah hitungan.
- Target `null` ("sebanyak-banyaknya") tidak auto-pindah — diakhiri lewat tombol **Selesai**.
- Reset hitungan per bacaan, kurangi hitungan, maju/mundur antar bacaan.
- **Lanjutkan sesi**: sesi yang ditinggal tersimpan otomatis dan bisa dilanjutkan dari Beranda.
- **Buka bacaan langsung**: setiap kartu pada daftar urutan bacaan bisa diketuk untuk langsung membaca bagian itu — misalnya hanya doa penutup tahlil — tanpa harus melewati bacaan sebelumnya. Sesi yang dibuka dengan cara melompat dicatat sebagai "sebagian", bukan khatam.

### Modul C — Mode sesi istighosah
- Layar fokus penuh tanpa tab bar, teks Arab besar, minim distraksi.
- **Pop-up pengingat sebelum sesi**: imbauan mengaktifkan Mode Pesawat atau mematikan data & WiFi,
  lalu satu tombol "Mulai" untuk langsung masuk sesi.
- **Do Not Disturb ringan**: notifikasi internal aplikasi dibisukan selama sesi.
- Layar dijaga tetap menyala selama sesi (Screen Wake Lock).
- Layar "Istighosah Selesai" berisi ringkasan hitungan, jumlah bacaan, dan durasi.

### Program

Tab **Program** memuat amalan yang dijalankan bertahap dengan target dan progres harian.
Yang sudah tersedia: **Cinta Shalawat**. Sedang disiapkan (tampil sebagai penanda, belum
dapat dibuka): **One Day One Juz**, **Sholat Tahajud**, **Sedekah Subuh**, dan
**Puasa Sunah** — seluruhnya berupa tracker, bukan penyedia teks bacaan.

#### Cinta Shalawat
- Susun target sholawat sendiri: **berapa jumlahnya** (mis. 10.000) **dalam berapa hari** (mis. 30) — keduanya bebas diatur, lengkap dengan preset cepat.
- **Target harian dihitung otomatis** dan bisa menyesuaikan sendiri: sisa bacaan dibagi sisa hari, sehingga ketika sempat tertinggal targetnya ikut menyesuaikan.
- Pilih teks sholawat (Jibril, Pendek, Ibrahimiyah, Nariyah, Munjiyat) atau tulis teks sendiri.
- Layar baca dengan **tasbih digital mengambang** — teks sholawat tetap terbaca penuh sambil menghitung, hitungan langsung tercatat pada tanggal hari ini, dengan getar penanda saat target harian tercapai.
- Pantau progres: cincin persentase total, capaian hari ini, hari berjalan, rentetan hari berturut-turut, rata-rata harian, perkiraan tanggal selesai, dan grafik 14 hari terakhir.
- Program yang diakhiri tersimpan sebagai riwayat.

### Pendukung
- **Mode offline** — service worker mem-precache seluruh aplikasi dan bacaan; data tersimpan di perangkat.
- **Statistik personal** — total hitungan tasbih, jumlah khatam, jumlah sesi, total waktu berdzikir, riwayat sesi.
- **Mode gelap** (mengikuti sistem / manual) dan **pengaturan ukuran serta jarak baris teks Arab**.
- **Kirim usulan fitur** langsung ke pengembang lewat WhatsApp, dengan template pesan yang sudah tersusun.

## Data bawaan

**Istighosah Pesma An Najah** (17 bacaan) sesuai naskah pada PRD: tawassul pembuka tanpa
hitungan, bacaan #2–16 dengan target 41× / 7×, dan bacaan #17 (`اَللهُ اَللهُ اَللهُ`) tanpa
target tetap. Setiap bacaan berhitung dilengkapi transliterasi Latin dan terjemahan.

**Tahlil & Doa Arwah** (39 bacaan) sesuai naskah NU Online: tawassul, Al-Ikhlas 3×,
Al-Falaq, An-Nas, Al-Fatihah, Al-Baqarah 1–5, 163, Ayat Kursi, 284–286, Irhamna 7×,
Hud 73, Al-Ahzab 33 & 56, rangkaian sholawat, istighfar 3×, tahlil 100×, tasbih 7× dan
33×, hingga doa penutup. Teks Arab berharakat tanpa terjemahan agar ringkas saat dibaca
bersama; bacaan yang punya jumlah pengulangan otomatis memakai tasbih digital.

## Menjalankan

```bash
npm install
npm run dev       # server pengembangan
npm run build     # build produksi ke dist/
npm run preview   # pratinjau hasil build
npm run typecheck # pemeriksaan tipe
```

## Struktur

```
src/
├─ components/   # Card bacaan, activity ring tasbih, sheet, tab bar, ikon
├─ context/      # Settings, Library (arsip), Session (sesi & statistik), Sholawat, Toast
├─ data/         # Paket istighosah & tahlil, arsip bawaan, kategori, teks sholawat
├─ lib/          # Penyimpanan lokal, haptic, wake lock, deteksi goyang, share, hitungan program
├─ pages/        # Beranda, Arsip, Amalan, Sesi, Program, Statistik, Pengaturan
├─ styles/       # Design token, base, komponen, mode sesi
└─ types.ts
```

## Catatan teknis

- Seluruh data disimpan di `localStorage` perangkat — tidak ada server, tidak ada akun.
- Getar (Vibration API) tidak didukung Safari iOS; ketukan tetap berfungsi normal.
- Aplikasi web tidak diizinkan mengubah pengaturan sistem, jadi Mode Pesawat diaktifkan sendiri
  oleh santri — pop-up sebelum sesi hanya berperan sebagai pengingat.
- Font Arab memakai Amiri / Scheherazade New dari Google Fonts dengan fallback font sistem,
  dan di-cache agar tetap tampil saat offline.

## Kontak pengembang

Tombol "Kirim usulan lewat WhatsApp" pada halaman Pengaturan membuka WhatsApp dengan
template pesan usulan fitur yang sudah terisi. Nomor tujuan disimpan di
`src/lib/kontak.ts` dan sengaja tidak pernah ditampilkan sebagai teks di antarmuka —
pengguna hanya melihat tombolnya. (Nomor tetap ada di dalam tautan `wa.me`, jadi masih
terbaca bila seseorang memeriksa sumber halaman; ini melekat pada cara kerja tautan WhatsApp.)

## Belum diimplementasi

Beberapa saran pengembangan lanjutan pada PRD belum masuk versi ini: sinkronisasi imam
multi-perangkat, audio murottal / text-to-speech, widget home screen, notifikasi jadwal
rutin, dan arsip multi-pesantren.
