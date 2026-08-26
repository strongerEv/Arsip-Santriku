import { useEffect, useState } from 'react'
import { Sheet } from './Sheet'
import { IconAirplane, IconBellSlash, IconCheck, IconWifiSlash } from './Icons'
import { airplaneSteps, isAndroid, tryOpenAirplaneSettings } from '../lib/airplane'

interface PreSessionSheetProps {
  open: boolean
  onClose: () => void
  onContinue: () => void
  packageName: string
}

/**
 * Pop-up pengingat sebelum sesi dimulai: imbauan mematikan data seluler/WiFi
 * atau mengaktifkan Mode Pesawat agar bacaan tidak terganggu notifikasi.
 *
 * Dua langkah, supaya tiap tombol selalu membawa pengguna maju — tidak ada
 * tombol yang terasa mati bila perangkat tidak bisa membuka pengaturan sendiri.
 */
export function PreSessionSheet({ open, onClose, onContinue, packageName }: PreSessionSheetProps) {
  const [step, setStep] = useState<'imbauan' | 'panduan'>('imbauan')

  // Setiap sheet dibuka lagi, mulai dari langkah pertama.
  useEffect(() => {
    if (open) setStep('imbauan')
  }, [open])

  if (step === 'panduan') {
    const steps = airplaneSteps()
    return (
      <Sheet
        open={open}
        onClose={onClose}
        title="Aktifkan Mode Pesawat"
        icon={<IconAirplane />}
        actions={
          <>
            <button type="button" className="btn btn--primary btn--block btn--lg" onClick={onContinue}>
              <IconCheck style={{ width: 18, height: 18 }} /> Sudah Aktif — Mulai Sesi
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setStep('imbauan')}
            >
              Kembali
            </button>
          </>
        }
      >
        <p style={{ marginBottom: 4 }}>
          {isAndroid()
            ? 'Jika halaman pengaturan tidak terbuka otomatis, aktifkan secara manual:'
            : 'Aplikasi web tidak dapat mengubah pengaturan perangkat. Aktifkan secara manual:'}
        </p>

        <ol className="sheet__steplist">
          {steps.map((text, i) => (
            <li key={text} className="sheet__stepitem">
              <span className="sheet__stepnum">{i + 1}</span>
              <span>{text}</span>
            </li>
          ))}
        </ol>

        <p className="muted-note" style={{ marginTop: 14 }}>
          Seluruh bacaan sudah tersimpan di perangkat, jadi sesi tetap berjalan normal tanpa
          internet.
        </p>
      </Sheet>
    )
  }

  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Siapkan hati & perangkat"
      icon={<IconAirplane />}
      actions={
        <>
          <button
            type="button"
            className="btn btn--primary btn--block btn--lg"
            onClick={() => {
              // Coba buka pengaturan (Android), lalu selalu lanjut ke panduan
              // agar pengguna tidak terjebak ketika intent tidak didukung.
              tryOpenAirplaneSettings()
              setStep('panduan')
            }}
          >
            <IconAirplane style={{ width: 18, height: 18 }} /> Aktifkan Mode Pesawat Sekarang
          </button>
          <button type="button" className="btn btn--secondary btn--block" onClick={onContinue}>
            Lanjutkan Tanpa Mengubah Pengaturan
          </button>
          <button type="button" className="btn btn--ghost btn--block btn--sm" onClick={onClose}>
            Batal
          </button>
        </>
      }
    >
      <p>
        Sebentar lagi <strong>{packageName}</strong> dimulai. Agar bacaan tidak terputus notifikasi
        WhatsApp atau telepon, sebaiknya:
      </p>

      <div className="sheet__checklist">
        <p className="sheet__checkitem">
          <IconAirplane />
          <span>
            Aktifkan <strong>Mode Pesawat</strong>, atau
          </span>
        </p>
        <p className="sheet__checkitem">
          <IconWifiSlash />
          <span>Matikan data seluler dan WiFi selama sesi berlangsung</span>
        </p>
        <p className="sheet__checkitem">
          <IconBellSlash />
          <span>Notifikasi dalam aplikasi otomatis dibisukan sampai sesi selesai</span>
        </p>
        <p className="sheet__checkitem">
          <IconCheck />
          <span>Seluruh bacaan sudah tersimpan di perangkat — tetap bisa dibaca tanpa internet</span>
        </p>
      </div>
    </Sheet>
  )
}
