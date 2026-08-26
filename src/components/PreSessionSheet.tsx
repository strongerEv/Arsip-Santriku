import { Sheet } from './Sheet'
import { IconAirplane, IconBellSlash, IconCheck, IconWifiSlash } from './Icons'

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
 * Isinya murni pengingat — pengaturan perangkat diubah sendiri oleh santri,
 * lalu satu tombol untuk langsung masuk sesi.
 */
export function PreSessionSheet({ open, onClose, onContinue, packageName }: PreSessionSheetProps) {
  return (
    <Sheet
      open={open}
      onClose={onClose}
      title="Siapkan hati & perangkat"
      icon={<IconAirplane />}
      actions={
        <button type="button" className="btn btn--primary btn--block btn--lg" onClick={onContinue}>
          Mulai
        </button>
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
