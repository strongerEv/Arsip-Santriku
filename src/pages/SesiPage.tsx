import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLibrary } from '../context/LibraryContext'
import { useSession } from '../context/SessionContext'
import { useSettings } from '../context/SettingsContext'
import type { CompletionRecord } from '../types'
import { haptic } from '../lib/haptics'
import { setFocusMode } from '../lib/focusMode'
import { useWakeLock } from '../lib/useWakeLock'
import { useShake } from '../lib/useShake'
import { useRingSize } from '../lib/useRingSize'
import { formatDuration, formatNumber } from '../lib/format'
import { ReadingCard } from '../components/ReadingCard'
import { TasbihRing } from '../components/TasbihRing'
import { Sheet } from '../components/Sheet'
import {
  IconCheck,
  IconCheckCircle,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconMinus,
  IconRefresh,
} from '../components/Icons'
import { EmptyState } from '../components/ui'

/** Jeda sebelum pindah bacaan, memberi ruang untuk transisi halus. */
const ADVANCE_DELAY = 520

export function SesiPage() {
  const { packageId = '' } = useParams()
  const navigate = useNavigate()
  const { getPackage } = useLibrary()
  const { settings } = useSettings()
  const { session, start, addCount, resetCount, advanceTo, jumpTo, finish, abandon } = useSession()

  const [summary, setSummary] = useState<CompletionRecord | null>(null)
  const [askExit, setAskExit] = useState(false)
  const [flash, setFlash] = useState(false)
  const advancing = useRef(false)
  const readingRef = useRef<HTMLDivElement>(null)
  const ringSize = useRingSize()

  const pkg = getPackage(packageId)
  const active = Boolean(pkg) && !summary

  // Mode fokus: layar tetap menyala & notifikasi internal dibisukan.
  useWakeLock(active && settings.keepAwake)
  useEffect(() => {
    setFocusMode(active)
    return () => setFocusMode(false)
  }, [active])

  // Sesi dimulai otomatis bila halaman dibuka langsung tanpa melalui paket.
  useEffect(() => {
    if (!pkg || summary) return
    if (!session || session.packageId !== pkg.id) start(pkg)
  }, [pkg, session, start, summary])

  const reading = useMemo(() => {
    if (!pkg || !session || session.packageId !== pkg.id) return null
    return pkg.readings[Math.min(session.index, pkg.readings.length - 1)] ?? null
  }, [pkg, session])

  const isLast = pkg && session ? session.index >= pkg.readings.length - 1 : false
  const reached = Boolean(reading?.target && session && session.count >= reading.target)

  const doFinish = useCallback(
    (complete: boolean) => {
      if (!pkg || !reading || !session) return
      advancing.current = true
      haptic('finish')
      const record = finish(pkg, {
        readingId: reading.id,
        achieved: session.count,
        complete,
      })
      setSummary(record)
    },
    [pkg, reading, session, finish],
  )

  const goNext = useCallback(() => {
    if (!pkg || !reading || !session) return
    if (isLast) {
      doFinish(true)
      return
    }
    haptic('advance')
    setFlash(true)
    window.setTimeout(() => setFlash(false), 560)
    advanceTo(session.index + 1, reading.id, session.count)
  }, [pkg, reading, session, isLast, advanceTo, doFinish])

  const goPrev = useCallback(() => {
    if (!session || session.index === 0) return
    jumpTo(session.index - 1)
  }, [session, jumpTo])

  const onTap = useCallback(() => {
    if (advancing.current) return
    haptic('tap')
    addCount(1)
  }, [addCount])

  useShake(active && settings.shakeToCount && Boolean(reading?.counted), onTap)

  // Tiap ganti bacaan, kembalikan gulir ke awal teks.
  useEffect(() => {
    readingRef.current?.scrollTo({ top: 0 })
  }, [reading?.id])

  // Pindah otomatis begitu hitungan mencapai target.
  useEffect(() => {
    advancing.current = false
    if (!settings.autoAdvance || !reading?.counted || !reading.target || !session) return
    if (session.count < reading.target) return
    advancing.current = true
    const timer = window.setTimeout(goNext, ADVANCE_DELAY)
    return () => window.clearTimeout(timer)
  }, [session, reading, settings.autoAdvance, goNext])

  if (!pkg) {
    return (
      <main className="page page-enter page--flush">
        <EmptyState title="Paket bacaan tidak ditemukan" />
        <p style={{ textAlign: 'center' }}>
          <Link to="/istighosah" className="btn btn--tinted btn--sm">
            Kembali ke daftar paket
          </Link>
        </p>
      </main>
    )
  }

  /* ---- Layar selesai --------------------------------------------------- */
  if (summary) {
    return (
      <main className="session">
        <div className="session__body">
          <div className="finish">
            <span className="finish__seal">
              <IconCheck />
            </span>
            <h1 className="finish__title">
              {summary.complete ? 'Istighosah Selesai' : 'Sesi Diakhiri'}
            </h1>
            <p className="text-secondary" style={{ maxWidth: 320 }}>
              {summary.complete
                ? `Alhamdulillah, seluruh bacaan ${pkg.name} telah dikhatamkan.`
                : `Sesi ${pkg.name} dihentikan lebih awal. Hitungan yang sudah berjalan tetap tercatat.`}
            </p>

            <div className="summary-grid">
              <div className="summary-tile">
                <p className="summary-tile__value">{formatNumber(summary.totalTaps)}</p>
                <p className="summary-tile__label">Hitungan</p>
              </div>
              <div className="summary-tile">
                <p className="summary-tile__value">
                  {summary.readingsDone}/{summary.readingsTotal}
                </p>
                <p className="summary-tile__label">Bacaan</p>
              </div>
              <div className="summary-tile">
                <p className="summary-tile__value">
                  {formatDuration(summary.finishedAt - summary.startedAt)}
                </p>
                <p className="summary-tile__label">Durasi</p>
              </div>
            </div>
          </div>
        </div>

        <div className="session__controls" style={{ flexDirection: 'column', gap: 9 }}>
          <button
            type="button"
            className="btn btn--primary btn--block btn--lg"
            onClick={() => navigate('/', { replace: true })}
          >
            Selesai
          </button>
          <button
            type="button"
            className="btn btn--secondary btn--block"
            onClick={() => {
              setSummary(null)
              start(pkg)
            }}
          >
            <IconRefresh style={{ width: 17, height: 17 }} /> Ulangi dari awal
          </button>
        </div>
      </main>
    )
  }

  if (!session || !reading) {
    return (
      <main className="session">
        <div className="session__body">
          <p className="text-secondary" style={{ textAlign: 'center' }}>
            Menyiapkan sesi…
          </p>
        </div>
      </main>
    )
  }

  const order = session.index + 1
  const canCount = reading.counted
  // Tinggi dock dipakai sebagai ruang bawah area baca.
  const dockHeight = canCount ? ringSize + 30 : 68
  const dockStyle = { '--dock-h': `${dockHeight}px` } as CSSProperties

  return (
    <main className={`session${flash ? ' session--complete-flash' : ''}`} style={dockStyle}>
      <div className="session__topbar">
        <button
          type="button"
          className="icon-btn"
          onClick={() => setAskExit(true)}
          aria-label="Keluar dari sesi"
        >
          <IconClose />
        </button>
        <span className="session__topbar-title">{pkg.name}</span>
        <button
          type="button"
          className="icon-btn"
          onClick={() => addCount(-1)}
          aria-label="Kurangi satu hitungan"
          disabled={!canCount || session.count === 0}
          style={{ opacity: canCount && session.count > 0 ? 1 : 0.4 }}
        >
          <IconMinus />
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={resetCount}
          aria-label="Ulangi hitungan bacaan ini"
          disabled={!canCount}
          style={{ opacity: canCount ? 1 : 0.4 }}
        >
          <IconRefresh />
        </button>
      </div>

      <div className="session__steps" aria-hidden="true">
        {pkg.readings.map((r, i) => {
          const done = i < session.index
          const current = i === session.index
          const ratio = done ? 1 : current ? (r.target ? Math.min(session.count / r.target, 1) : 0.35) : 0
          return (
            <span className="session__step" key={r.id}>
              <span className="session__step-fill" style={{ transform: `scaleX(${ratio})` }} />
            </span>
          )
        })}
      </div>

      {/* Teks Arab mendapat seluruh tinggi layar; mengetuk di mana saja pada
          area ini ikut menambah hitungan, jadi bisa membaca sambil menghitung. */}
      <div
        ref={readingRef}
        className={`session__reading${canCount ? ' session__reading--tappable' : ''}`}
        onClick={canCount ? onTap : undefined}
      >
        <ReadingCard
          reading={reading}
          order={order}
          total={pkg.readings.length}
          showLatin={settings.showLatin}
          showTranslation={settings.showTranslation}
          animateKey={reading.id}
        />
      </div>

      {/* Petunjuk hilang setelah ketukan pertama agar tidak menutupi teks. */}
      {canCount && (reached || session.count === 0) && (
        <p className={`session__hint${reached ? ' session__hint--accent' : ''}`}>
          <span>
            {reached
              ? 'Target tercapai'
              : settings.shakeToCount
                ? 'Ketuk teks atau goyangkan perangkat'
                : 'Ketuk teks atau lingkaran untuk menghitung'}
          </span>
        </p>
      )}

      <div className="session__dock">
        <span className="session__dock-slot">
          <button
            type="button"
            className="icon-btn"
            onClick={goPrev}
            disabled={session.index === 0}
            aria-label="Bacaan sebelumnya"
            style={{ opacity: session.index === 0 ? 0.4 : 1 }}
          >
            <IconChevronLeft />
          </button>
        </span>

        {canCount && (
          <TasbihRing
            count={session.count}
            target={reading.target}
            onTap={onTap}
            size={ringSize}
          />
        )}

        <span className="session__dock-slot session__dock-slot--kanan">
          {reading.target === null && canCount ? (
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => doFinish(true)}
            >
              <IconCheckCircle style={{ width: 17, height: 17 }} /> Selesai
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn--sm ${reached || !canCount ? 'btn--primary' : 'btn--secondary'}`}
              onClick={goNext}
            >
              {isLast ? 'Selesai' : 'Lanjut'}
              <IconChevronRight style={{ width: 16, height: 16 }} />
            </button>
          )}
        </span>
      </div>

      <Sheet
        open={askExit}
        onClose={() => setAskExit(false)}
        title="Keluar dari sesi?"
        actions={
          <>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                setAskExit(false)
                navigate('/istighosah', { replace: true })
              }}
            >
              Simpan & keluar
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => {
                setAskExit(false)
                doFinish(false)
              }}
            >
              Akhiri sesi & lihat ringkasan
            </button>
            <button
              type="button"
              className="btn btn--danger btn--block btn--sm"
              onClick={() => {
                abandon()
                setAskExit(false)
                navigate('/istighosah', { replace: true })
              }}
            >
              Buang sesi ini
            </button>
          </>
        }
      >
        Sesi yang disimpan bisa dilanjutkan kapan saja dari Beranda — hitungan terakhir tidak
        hilang.
      </Sheet>
    </main>
  )
}
