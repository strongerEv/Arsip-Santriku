import { useState } from 'react'
import { Sheet } from './Sheet'
import { IconAirplane, IconBellSlash, IconCheck, IconWifiSlash } from './Icons'
import { MANUAL_HINT, isAndroid, openAirplaneSettings } from '../lib/airplane'

interface PreSessionSheetProps {
  open: boolean
  onClose: () => void
  onContinue: () => void
  packageName: string
}

/**
 * Pop-up pengingat sebelum sesi dimulai: imbauan mematikan data seluler/WiFi
 * atau mengaktifkan Mode Pesawat agar bacaan tidak terganggu notifikasi.
 */
export function PreSessionSheet({ open, onClose, onContinue, packageName }: PreSessionSheetProps) {
  const [hint, setHint] = useState(false)

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
              const opened = openAirplaneSettings()
              if (!opened) setHint(true)
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
          <span>Aktifkan <strong>Mode Pesawat</strong>, atau</span>
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

      {hint && (
        <p className="muted-note" style={{ marginTop: 14 }}>
          {isAndroid()
            ? 'Jika halaman pengaturan tidak terbuka otomatis: '
            : 'Aplikasi web tidak dapat mengubah pengaturan perangkat. '}
          {MANUAL_HINT}
        </p>
      )}
    </Sheet>
  )
}
