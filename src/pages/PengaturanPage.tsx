import { useState } from 'react'
import { useSettings } from '../context/SettingsContext'
import { useLibrary } from '../context/LibraryContext'
import { useToast } from '../context/ToastContext'
import type { ThemeMode } from '../types'
import { requestMotionPermission } from '../lib/useShake'
import { haptic } from '../lib/haptics'
import { clearAll } from '../lib/storage'
import { Sheet } from '../components/Sheet'
import { ListRow, PageHeader, Segmented, Switch } from '../components/ui'
import { IconMoon, IconSparkles, IconTextSize, IconWhatsApp } from '../components/Icons'
import { APP_VERSION, DEVELOPER, tautanUsulanFitur } from '../lib/kontak'

export function PengaturanPage() {
  const { settings, update, reset } = useSettings()
  const { restoreSeed } = useLibrary()
  const toast = useToast()
  const [confirmReset, setConfirmReset] = useState(false)

  const onToggleShake = async (value: boolean) => {
    if (!value) {
      update('shakeToCount', false)
      return
    }
    const granted = await requestMotionPermission()
    if (!granted) {
      toast('Izin sensor gerak ditolak perangkat')
      return
    }
    update('shakeToCount', true)
    haptic('tap')
  }

  return (
    <main className="page page-enter">
      <PageHeader title="Pengaturan" subtitle="Sesuaikan tampilan dan perilaku sesi." />

      <h2 className="section-title">Tampilan</h2>
      <div className="list-group">
        <ListRow
          icon={<IconMoon />}
          label="Tema"
          trailing={
            <Segmented<ThemeMode>
              label="Tema tampilan"
              value={settings.theme}
              onChange={(value) => update('theme', value)}
              options={[
                { value: 'sistem', label: 'Sistem' },
                { value: 'terang', label: 'Terang' },
                { value: 'gelap', label: 'Gelap' },
              ]}
            />
          }
        />
        <div className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
          <div className="row">
            <span className="list-row__icon">
              <IconTextSize />
            </span>
            <span className="list-row__label">Ukuran teks Arab</span>
            <span className="list-row__value">{settings.arabicSize}px</span>
          </div>
          <input
            type="range"
            min={22}
            max={52}
            step={2}
            value={settings.arabicSize}
            onChange={(e) => update('arabicSize', Number(e.target.value))}
            aria-label="Ukuran teks Arab"
            style={{ accentColor: 'var(--accent)', width: '100%' }}
          />
          <p className="arabic" style={{ textAlign: 'center', margin: '2px 0 4px' }}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        </div>
        <div className="list-row" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
          <div className="row">
            <span className="list-row__label">Jarak antar baris</span>
            <span className="list-row__value">{settings.arabicLeading.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={1.6}
            max={2.8}
            step={0.05}
            value={settings.arabicLeading}
            onChange={(e) => update('arabicLeading', Number(e.target.value))}
            aria-label="Jarak antar baris teks Arab"
            style={{ accentColor: 'var(--accent)', width: '100%' }}
          />
        </div>
        <ListRow
          label="Tampilkan transliterasi Latin"
          trailing={
            <Switch
              label="Tampilkan transliterasi Latin"
              checked={settings.showLatin}
              onChange={(v) => update('showLatin', v)}
            />
          }
        />
        <ListRow
          label="Tampilkan terjemahan"
          trailing={
            <Switch
              label="Tampilkan terjemahan"
              checked={settings.showTranslation}
              onChange={(v) => update('showTranslation', v)}
            />
          }
        />
      </div>

      <h2 className="section-title">Sesi & tasbih</h2>
      <div className="list-group">
        <ListRow
          label="Pindah otomatis saat target tercapai"
          trailing={
            <Switch
              label="Pindah otomatis saat target tercapai"
              checked={settings.autoAdvance}
              onChange={(v) => update('autoAdvance', v)}
            />
          }
        />
        <ListRow
          label="Getar tiap hitungan"
          trailing={
            <Switch
              label="Getar tiap hitungan"
              checked={settings.haptics}
              onChange={(v) => {
                update('haptics', v)
                if (v) haptic('tap')
              }}
            />
          }
        />
        <ListRow
          label="Goyangkan perangkat untuk menghitung"
          trailing={
            <Switch
              label="Goyangkan perangkat untuk menghitung"
              checked={settings.shakeToCount}
              onChange={(v) => void onToggleShake(v)}
            />
          }
        />
        <ListRow
          label="Layar tetap menyala selama sesi"
          trailing={
            <Switch
              label="Layar tetap menyala selama sesi"
              checked={settings.keepAwake}
              onChange={(v) => update('keepAwake', v)}
            />
          }
        />
        <ListRow
          label="Pengingat Mode Pesawat sebelum sesi"
          trailing={
            <Switch
              label="Pengingat Mode Pesawat sebelum sesi"
              checked={settings.airplaneReminder}
              onChange={(v) => update('airplaneReminder', v)}
            />
          }
        />
      </div>
      <p className="muted-note" style={{ margin: '10px 4px 0' }}>
        Selama sesi berlangsung, notifikasi dari dalam aplikasi ini otomatis dibisukan.
      </p>

      <h2 className="section-title">Data</h2>
      <div className="list-group">
        <ListRow
          label="Pulihkan arsip bawaan"
          onClick={() => {
            restoreSeed()
            toast('Arsip bawaan dikembalikan')
          }}
          chevron
        />
        <ListRow
          label="Kembalikan pengaturan awal"
          onClick={() => {
            reset()
            toast('Pengaturan dikembalikan ke awal')
          }}
          chevron
        />
        <ListRow label="Hapus semua data aplikasi" onClick={() => setConfirmReset(true)} chevron />
      </div>

      <h2 className="section-title">Tentang</h2>
      <div className="card">
        <p className="card__title">Arsip Santriku</p>
        <p className="card__meta" style={{ marginTop: 8, lineHeight: 1.65 }}>
          Arsip digital bacaan, wirid, dan dokumen pesantren, dilengkapi tasbih digital otomatis
          untuk bacaan berhitung. Seluruh data tersimpan di perangkatmu sendiri dan tetap bisa
          dibuka tanpa internet setelah aplikasi dimuat sekali.
        </p>
        <p className="muted-note" style={{ marginTop: 12 }}>Versi {APP_VERSION}</p>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="row" style={{ alignItems: 'flex-start', gap: 12 }}>
          <span className="list-row__icon">
            <IconSparkles />
          </span>
          <span>
            <span className="card__title" style={{ display: 'block', fontSize: 15 }}>
              Terus dikembangkan
            </span>
            <span className="card__meta" style={{ display: 'block', marginTop: 6, lineHeight: 1.65 }}>
              Aplikasi ini akan terus mendapat pembaruan — fitur baru, penyempurnaan tampilan, dan
              tambahan arsip. Pembaruan terpasang sendiri saat aplikasi dibuka dalam keadaan
              online, jadi tidak perlu memasang ulang.
            </span>
          </span>
        </div>
      </div>

      <h2 className="section-title">Punya usulan fitur?</h2>
      <div className="card">
        <p className="card__meta" style={{ lineHeight: 1.65 }}>
          Ada fitur yang ingin ditambahkan, atau bacaan yang perlu dimasukkan ke arsip? Kirim
          langsung ke pengembang lewat WhatsApp — pesannya sudah disiapkan, tinggal dilengkapi.
        </p>
        <a
          className="btn btn--primary btn--block"
          style={{ marginTop: 16 }}
          href={tautanUsulanFitur()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconWhatsApp style={{ width: 18, height: 18 }} /> Kirim usulan lewat WhatsApp
        </a>
      </div>

      <footer className="app-credit">
        <p className="app-credit__line">
          Develop by <span className="app-credit__name">{DEVELOPER}</span>
        </p>
      </footer>

      <Sheet
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Hapus semua data?"
        actions={
          <>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                clearAll()
                window.location.reload()
              }}
            >
              Ya, hapus semuanya
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setConfirmReset(false)}
            >
              Batal
            </button>
          </>
        }
      >
        Arsip buatanmu, riwayat statistik, sesi berjalan, dan pengaturan akan dihapus dari
        perangkat ini. Arsip bawaan akan kembali muncul.
      </Sheet>
    </main>
  )
}
