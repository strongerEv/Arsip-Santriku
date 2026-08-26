# Arsip Santriku

Arsip digital bacaan, wirid, dan dokumen pesantren — dilengkapi **tasbih digital
otomatis** untuk bacaan berhitung seperti istighosah. Dibangun sebagai PWA
(bisa dipasang di layar utama HP dan tetap jalan tanpa internet).

Dibuat mengikuti PRD Aplikasi Arsip Santri untuk Pesma An Najah, dengan palet
**hijau emerald** dan card bacaan bergaya **Apple Human Interface Guidelines**.

## Fitur

### Modul A — Arsip Santri
- Simpan dokumen: teks Arab berharakat, transliterasi Latin, terjemahan, catatan bebas, dan foto/scan naskah.
- Kategori: Istighosah, Wirid, Sholawat, Doa, Materi Kajian, Surat/Pengumuman, Lainnya.
- Pencarian bebas (judul, teks, pengunggah, sumber) dan filter kategori.
- **Kontribusi terverifikasi**: arsip baru masuk sebagai "usulan" hingga ditandai terverifikasi.
- **Export/Share**: bagikan teks arsip yang sudah dirapikan lewat share sheet perangkat, atau salin ke papan klip.

### Modul B — Bacaan berhitung + tasbih digital
- Paket bacaan tersusun sebagai playlist berurutan.
- Tombol tasbih berbentuk **activity ring** (seperti Apple Watch) dengan angka besar di tengah.
- Hitungan naik tiap ketukan, atau dengan **menggoyangkan perangkat** (opsional, butuh izin sensor gerak).
- **Auto-pindah** ke bacaan berikutnya saat target tercapai, dengan transisi halus + getar penanda.
- Target `null` ("sebanyak-banyaknya") tidak auto-pindah — diakhiri lewat tombol **Selesaikan Sesi**.
- Reset hitungan per bacaan, kurangi hitungan, maju/mundur antar bacaan.
- **Lanjutkan sesi**: sesi yang ditinggal tersimpan otomatis dan bisa dilanjutkan dari Beranda.

### Modul C — Mode sesi istighosah
- Layar fokus penuh tanpa tab bar, teks Arab besar, minim distraksi.
- **Pop-up pengingat sebelum sesi**: imbauan mengaktifkan Mode Pesawat / mematikan data & WiFi, dengan tombol
  "Aktifkan Mode Pesawat Sekarang" (mencoba membuka pengaturan sistem di Android) dan
  "Lanjutkan Tanpa Mengubah Pengaturan".
- **Do Not Disturb ringan**: notifikasi internal aplikasi dibisukan selama sesi.
- Layar dijaga tetap menyala selama sesi (Screen Wake Lock).
- Layar "Istighosah Selesai" berisi ringkasan hitungan, jumlah bacaan, dan durasi.

### Pendukung
- **Mode offline** — service worker mem-precache seluruh aplikasi dan bacaan; data tersimpan di perangkat.
- **Statistik personal** — total hitungan tasbih, jumlah khatam, jumlah sesi, total waktu berdzikir, riwayat sesi.
- **Mode gelap** (mengikuti sistem / manual) dan **pengaturan ukuran serta jarak baris teks Arab**.

## Data bawaan

Paket **Istighosah Pesma An Najah** (17 bacaan) sudah tersedia sesuai naskah pada PRD:
tawassul pembuka tanpa hitungan, bacaan #2–16 dengan target 41× / 7×, dan bacaan #17
(`اَللهُ اَللهُ اَللهُ`) tanpa target tetap. Setiap bacaan berhitung dilengkapi
transliterasi Latin dan terjemahan Bahasa Indonesia.

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
├─ context/      # Settings, Library (arsip), Session (sesi & statistik), Toast
├─ data/         # Paket istighosah, arsip bawaan, kategori
├─ lib/          # Penyimpanan lokal, haptic, wake lock, deteksi goyang, share
├─ pages/        # Beranda, Arsip, Istighosah, Sesi, Statistik, Pengaturan
├─ styles/       # Design token, base, komponen, mode sesi
└─ types.ts
```

## Catatan teknis

- Seluruh data disimpan di `localStorage` perangkat — tidak ada server, tidak ada akun.
- Getar (Vibration API) tidak didukung Safari iOS; ketukan tetap berfungsi normal.
- Aplikasi web tidak diizinkan mengubah pengaturan sistem. Tombol Mode Pesawat mencoba
  membuka halaman pengaturan lewat intent Android; di platform lain ditampilkan panduan manual.
- Font Arab memakai Amiri / Scheherazade New dari Google Fonts dengan fallback font sistem,
  dan di-cache agar tetap tampil saat offline.

## Belum diimplementasi

Beberapa saran pengembangan lanjutan pada PRD belum masuk versi ini: sinkronisasi imam
multi-perangkat, audio murottal / text-to-speech, widget home screen, notifikasi jadwal
rutin, dan arsip multi-pesantren.
