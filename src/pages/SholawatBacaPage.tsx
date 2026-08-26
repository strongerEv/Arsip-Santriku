import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSholawat } from '../context/SholawatContext'
import { useSession } from '../context/SessionContext'
import { useSettings } from '../context/SettingsContext'
import { CUSTOM_TEXT_ID, findSholawatText } from '../data/sholawat'
import { computeProgress, dateKey } from '../lib/program'
import { formatNumber } from '../lib/format'
import { haptic } from '../lib/haptics'
import { setFocusMode } from '../lib/focusMode'
import { useWakeLock } from '../lib/useWakeLock'
import { useShake } from '../lib/useShake'
import { TasbihRing } from '../components/TasbihRing'
import { IconCheck, IconClose, IconHeart } from '../components/Icons'
import { EmptyState } from '../components/ui'

/**
 * Layar baca Program Cinta Shalawat: satu teks, satu tombol tasbih,
 * hitungan langsung tercatat pada tanggal hari ini.
 */
export function SholawatBacaPage() {
  const navigate = useNavigate()
  const { program, addCount } = useSholawat()
  const { bumpTaps } = useSession()
  const { settings } = useSettings()
  const [rayakan, setRayakan] = useState(false)
  const sudahTercapai = useRef(false)

  const aktif = Boolean(program)
  useWakeLock(aktif && settings.keepAwake)
  useEffect(() => {
    setFocusMode(aktif)
    return () => setFocusMode(false)
  }, [aktif])

  const onTap = useCallback(() => {
    haptic('tap')
    addCount(1)
    bumpTaps(1)
  }, [addCount, bumpTaps])

  useShake(aktif && settings.shakeToCount, onTap)

  const progress = program ? computeProgress(program, dateKey()) : null

  // Rayakan sekali saat target harian baru saja terlampaui.
  useEffect(() => {
    if (!progress) return
    const tercapai = progress.dailyTarget > 0 && progress.today >= progress.dailyTarget
    if (tercapai && !sudahTercapai.current) {
      sudahTercapai.current = true
      haptic('finish')
      setRayakan(true)
      const timer = window.setTimeout(() => setRayakan(false), 2600)
      return () => window.clearTimeout(timer)
    }
    if (!tercapai) sudahTercapai.current = false
  }, [progress])

  if (!program || !progress) {
    return (
      <main className="page page-enter page--flush">
        <EmptyState
          title="Belum ada program berjalan"
          description="Susun program Cinta Shalawat terlebih dahulu."
        />
        <p style={{ textAlign: 'center' }}>
          <button type="button" className="btn btn--tinted btn--sm" onClick={() => navigate('/sholawat')}>
            Ke halaman program
          </button>
        </p>
      </main>
    )
  }

  const teks = findSholawatText(program.textId)
  const arabic = program.textId === CUSTOM_TEXT_ID ? (program.customArabic ?? '') : (teks?.arabic ?? '')
  const nama =
    program.textId === CUSTOM_TEXT_ID ? (program.customName ?? 'Teks sendiri') : (teks?.name ?? '')
  const targetHariIni = progress.dailyTarget > 0 ? progress.dailyTarget : null

  return (
    <main className={`session${rayakan ? ' session--complete-flash' : ''}`}>
      <div className="session__topbar">
        <button
          type="button"
          className="icon-btn"
          onClick={() => navigate('/sholawat')}
          aria-label="Selesai membaca"
        >
          <IconClose />
        </button>
        <span className="session__topbar-title">{nama}</span>
        <span className="icon-btn" style={{ background: 'transparent', color: 'var(--accent)' }}>
          <IconHeart />
        </span>
      </div>

      <div className="session__body">
        <article className="reading-card reading-card--in">
          <header className="reading-card__head">
            <span className="reading-card__index">Hari ke-{Math.max(1, Math.min(progress.dayIndex, program.days))}</span>
            <span className="reading-card__target">
              {targetHariIni ? `${formatNumber(targetHariIni)}× hari ini` : 'bebas'}
            </span>
          </header>

          <p className="reading-card__arabic">{arabic}</p>

          {((settings.showLatin && teks?.latin) || (settings.showTranslation && teks?.translation)) && (
            <div className="reading-card__divider" />
          )}
          {settings.showLatin && teks?.latin && <p className="reading-card__latin">{teks.latin}</p>}
          {settings.showTranslation && teks?.translation && (
            <p className="reading-card__translation">{teks.translation}</p>
          )}
        </article>

        <div className="session__counter-area">
          <TasbihRing count={progress.today} target={targetHariIni} onTap={onTap} />
          {rayakan ? (
            <p className="session__note" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              <IconCheck style={{ width: 14, height: 14, verticalAlign: '-2px' }} /> Target harian
              tercapai — silakan lanjut bila masih ingin menambah
            </p>
          ) : (
            <p className="session__note">
              {settings.shakeToCount
                ? 'Ketuk lingkaran atau goyangkan perangkat tiap satu sholawat'
                : 'Ketuk lingkaran tiap satu sholawat'}
            </p>
          )}
        </div>
      </div>

      <div className="stack" style={{ gap: 10, flex: 'none' }}>
        <div>
          <div className="row" style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginBottom: 6 }}>
            <span>Total program</span>
            <span className="spacer" />
            <span>
              {formatNumber(progress.total)} / {formatNumber(program.targetTotal)}
            </span>
          </div>
          <div className="meter meter--slim">
            <div className="meter__fill" style={{ width: `${progress.percent}%` }} />
          </div>
        </div>

        <div className="session__controls">
          <button
            type="button"
            className="btn btn--secondary btn--sm"
            onClick={() => addCount(-1)}
            disabled={progress.today === 0}
          >
            Kurangi
          </button>
          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={() => navigate('/sholawat')}
          >
            <IconCheck style={{ width: 16, height: 16 }} /> Selesai
          </button>
        </div>
      </div>
    </main>
  )
}
