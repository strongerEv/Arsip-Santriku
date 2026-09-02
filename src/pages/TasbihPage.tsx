import { useCallback, useEffect, useState } from 'react'
import { useSession } from '../context/SessionContext'
import { useSettings } from '../context/SettingsContext'
import { loadJSON, saveJSON } from '../lib/storage'
import { formatNumber } from '../lib/format'
import { haptic } from '../lib/haptics'
import { useWakeLock } from '../lib/useWakeLock'
import { useShake } from '../lib/useShake'
import { useKeyCounter } from '../lib/useKeyCounter'
import { useRingSize } from '../lib/useRingSize'
import { TasbihRing } from '../components/TasbihRing'
import { Sheet } from '../components/Sheet'
import { IconMinus, IconRefresh } from '../components/Icons'
import { PageHeader } from '../components/ui'

const STORAGE_KEY = 'arsip-santriku:v1:tasbih'

/** Pilihan target satu putaran. `null` berarti menghitung terus tanpa batas. */
const TARGET_PILIHAN: { nilai: number | null; label: string }[] = [
  { nilai: 33, label: '33' },
  { nilai: 99, label: '99' },
  { nilai: 100, label: '100' },
  { nilai: 1000, label: '1.000' },
  { nilai: null, label: 'Tanpa batas' },
]

interface TasbihState {
  /** Hitungan pada putaran yang sedang berjalan. */
  count: number
  /** Jumlah putaran yang sudah tuntas. */
  laps: number
  /** Seluruh hitungan sejak terakhir direset. */
  total: number
  target: number | null
}

const AWAL: TasbihState = { count: 0, laps: 0, total: 0, target: 33 }

export function TasbihPage() {
  const { bumpTaps } = useSession()
  const { settings } = useSettings()
  const ringSize = Math.round(useRingSize() * 1.7)
  const [state, setState] = useState<TasbihState>(() => ({
    ...AWAL,
    ...loadJSON<Partial<TasbihState>>(STORAGE_KEY, {}),
  }))
  const [konfirmasiReset, setKonfirmasiReset] = useState(false)

  useEffect(() => {
    saveJSON(STORAGE_KEY, state)
  }, [state])

  useWakeLock(settings.keepAwake)

  const tambah = useCallback(() => {
    setState((prev) => {
      const berikutnya = prev.count + 1
      const tuntas = prev.target !== null && berikutnya >= prev.target
      haptic(tuntas ? 'finish' : 'tap')
      return {
        ...prev,
        // Satu putaran penuh mengembalikan hitungan ke nol, seperti tasbih biasa.
        count: tuntas ? 0 : berikutnya,
        laps: tuntas ? prev.laps + 1 : prev.laps,
        total: prev.total + 1,
      }
    })
    bumpTaps(1)
  }, [bumpTaps])

  const kurangi = () => {
    haptic('tap')
    setState((prev) => ({
      ...prev,
      count: Math.max(0, prev.count - 1),
      total: Math.max(0, prev.total - 1),
    }))
  }

  useShake(settings.shakeToCount, tambah)
  useKeyCounter(settings.keyCount, tambah)

  return (
    <main className="page page-enter">
      <PageHeader
        title="Tasbih"
        subtitle="Penghitung dzikir bebas — tanpa teks bacaan, tinggal ketuk."
      />

      {/* Seluruh area ini menghitung, jadi ibu jari bebas posisinya. */}
      <div className="tasbih-area" onClick={tambah} role="presentation">
        <span onClick={(e) => e.stopPropagation()} style={{ display: 'contents' }}>
          <TasbihRing count={state.count} target={state.target} onTap={tambah} size={ringSize} />
        </span>
        <p className="session__note" style={{ marginTop: 16 }}>
          {settings.shakeToCount
            ? 'Ketuk di mana saja pada area ini, atau goyangkan perangkat'
            : 'Ketuk di mana saja pada area ini'}
        </p>
      </div>

      <div className="stat-grid" style={{ marginTop: 14 }}>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(state.laps)}</p>
          <p className="stat-card__label">Putaran selesai</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(state.total)}</p>
          <p className="stat-card__label">Total hitungan</p>
        </div>
      </div>

      <h2 className="section-title">Target per putaran</h2>
      <div className="preset-row">
        {TARGET_PILIHAN.map((pilihan) => (
          <button
            key={pilihan.label}
            type="button"
            className={`chip${state.target === pilihan.nilai ? ' is-active' : ''}`}
            onClick={() => setState((prev) => ({ ...prev, target: pilihan.nilai }))}
          >
            {pilihan.label}
          </button>
        ))}
      </div>

      <div className="row" style={{ gap: 9, marginTop: 20, flexWrap: 'wrap' }}>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={kurangi}
          disabled={state.count === 0 && state.total === 0}
        >
          <IconMinus style={{ width: 16, height: 16 }} /> Kurangi
        </button>
        <button
          type="button"
          className="btn btn--secondary btn--sm"
          onClick={() => setKonfirmasiReset(true)}
        >
          <IconRefresh style={{ width: 16, height: 16 }} /> Reset
        </button>
      </div>

      <p className="muted-note" style={{ marginTop: 22 }}>
        {settings.keyCount
          ? 'Tombol volume pada remote/tombol rana Bluetooth dan keyboard juga menambah hitungan. Tombol volume bawaan HP tidak bisa dipakai karena ditangani sistem, bukan aplikasi.'
          : 'Penghitungan lewat tombol fisik sedang dimatikan — dapat dinyalakan di Pengaturan.'}
      </p>

      <Sheet
        open={konfirmasiReset}
        onClose={() => setKonfirmasiReset(false)}
        title="Reset hitungan?"
        actions={
          <>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                setState((prev) => ({ ...AWAL, target: prev.target }))
                setKonfirmasiReset(false)
                haptic('warn')
              }}
            >
              Ya, reset
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setKonfirmasiReset(false)}
            >
              Batal
            </button>
          </>
        }
      >
        Hitungan berjalan, jumlah putaran, dan totalnya akan kembali ke nol. Total tasbih pada
        halaman Statistik tidak ikut terhapus.
      </Sheet>
    </main>
  )
}
