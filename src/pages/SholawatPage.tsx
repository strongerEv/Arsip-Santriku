import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSholawat } from '../context/SholawatContext'
import { useToast } from '../context/ToastContext'
import { CUSTOM_TEXT_ID, findSholawatText } from '../data/sholawat'
import { STATUS_LABEL, computeProgress, dateKey, parseKey } from '../lib/program'
import { formatDate, formatDateShort, formatNumber } from '../lib/format'
import { ProgressRing } from '../components/ProgressRing'
import { Sheet } from '../components/Sheet'
import {
  IconCalendar,
  IconCheckCircle,
  IconFlame,
  IconHeart,
  IconPencil,
  IconPlay,
  IconTarget,
  IconTrend,
} from '../components/Icons'
import { PageHeader } from '../components/ui'

/** Jumlah hari terakhir yang ditampilkan pada grafik. */
const CHART_DAYS = 14

export function SholawatPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const { program, history, finishProgram } = useSholawat()
  const [confirmFinish, setConfirmFinish] = useState(false)

  if (!program) {
    return (
      <main className="page page-enter">
        <PageHeader
          title="Cinta Shalawat"
          subtitle="Pasang target sholawat, biar aplikasi yang menghitung dan menjaga ritmenya."
        />

        <div className="card card--accent">
          <span
            className="list-row__icon"
            style={{ background: 'rgba(255,255,255,.18)', color: '#fff', marginBottom: 12 }}
          >
            <IconHeart />
          </span>
          <p style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.3px' }}>
            Program Cinta Nabi Muhammad ﷺ
          </p>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,.85)', marginTop: 8, lineHeight: 1.6 }}>
            Tentukan jumlah sholawat yang ingin dicapai — misalnya 10.000 dalam 30 hari — lalu baca
            dengan tasbih digital. Target harian dihitung otomatis dan progresnya terlihat setiap
            hari.
          </p>
          <Link
            to="/sholawat/baru"
            className="btn btn--sm"
            style={{ marginTop: 18, background: 'rgba(255,255,255,.2)', color: '#fff' }}
          >
            <IconTarget style={{ width: 16, height: 16 }} /> Buat program
          </Link>
        </div>

        <h2 className="section-title">Cara kerjanya</h2>
        <div className="list-group">
          {[
            ['1', 'Tentukan target & durasi', 'Misal 10.000 sholawat dalam 40 hari — bebas diatur sendiri.'],
            ['2', 'Target harian otomatis', 'Aplikasi membagi rata, dan menyesuaikan bila sempat tertinggal.'],
            ['3', 'Baca dengan tasbih digital', 'Ketuk lingkaran tiap satu sholawat; hitungan tersimpan per hari.'],
            ['4', 'Pantau progres', 'Lihat capaian total, rentetan hari, dan grafik harian.'],
          ].map(([no, judul, isi]) => (
            <div className="list-row" key={no} style={{ alignItems: 'flex-start' }}>
              <span className="list-row__icon" style={{ fontWeight: 700, fontSize: 13 }}>
                {no}
              </span>
              <span className="list-row__label">
                {judul}
                <span style={{ display: 'block', fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>
                  {isi}
                </span>
              </span>
            </div>
          ))}
        </div>

        {history.length > 0 && (
          <>
            <h2 className="section-title">Program sebelumnya</h2>
            <div className="stack">
              {history.map((old) => {
                const p = computeProgress(old, dateKey())
                return (
                  <div className="card" key={old.id}>
                    <p className="card__title">{old.name}</p>
                    <p className="card__meta" style={{ marginTop: 6 }}>
                      {formatNumber(p.total)} dari {formatNumber(old.targetTotal)} sholawat ·{' '}
                      {Math.round(p.percent)}%
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </main>
    )
  }

  const today = dateKey()
  const p = computeProgress(program, today)
  const teks = findSholawatText(program.textId)
  const namaTeks =
    program.textId === CUSTOM_TEXT_ID ? (program.customName ?? 'Teks sendiri') : (teks?.name ?? '')
  // Jendela grafik berakhir pada hari ini (atau hari terakhir program).
  const akhirJendela = Math.min(Math.max(p.dayIndex, 1), program.days)
  const awalJendela = Math.max(0, akhirJendela - CHART_DAYS)
  const chart = p.days.slice(awalJendela, awalJendela + CHART_DAYS)
  const puncak = Math.max(1, ...chart.map((d) => d.count))

  return (
    <main className="page page-enter">
      <PageHeader title="Cinta Shalawat" subtitle={program.name} />

      <div className="card card--raised" style={{ textAlign: 'center' }}>
        <div className="row" style={{ justifyContent: 'center', marginBottom: 14 }}>
          <span className={`badge${p.status === 'tertinggal' ? ' badge--neutral' : ''}`}>
            {p.status === 'selesai' && <IconCheckCircle style={{ width: 13, height: 13 }} />}
            {STATUS_LABEL[p.status]}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ProgressRing value={p.percent / 100} size={200}>
            <span className="ring__count" style={{ fontSize: 40 }}>
              {Math.round(p.percent)}%
            </span>
            <span className="ring__target">
              {formatNumber(p.total)} / {formatNumber(program.targetTotal)}
            </span>
          </ProgressRing>
        </div>

        <p className="card__meta" style={{ marginTop: 14 }}>
          {p.remaining > 0
            ? `Sisa ${formatNumber(p.remaining)} sholawat · ${p.daysLeft} hari lagi`
            : 'Alhamdulillah, target sudah tercapai.'}
        </p>
        <p className="muted-note" style={{ marginTop: 6 }}>
          {namaTeks} · berakhir {formatDate(parseKey(p.endDate).getTime())}
        </p>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="row">
          <div>
            <p className="card__eyebrow">Hari ini</p>
            <p className="today-card__angka" style={{ marginTop: 6 }}>
              <span className="today-card__count">{formatNumber(p.today)}</span>
              <span className="today-card__of">/ {formatNumber(p.dailyTarget)}</span>
            </p>
          </div>
          <span className="spacer" />
          {p.todayRemaining === 0 ? (
            <span className="badge">
              <IconCheckCircle style={{ width: 13, height: 13 }} /> Tuntas
            </span>
          ) : (
            <span className="badge badge--neutral">kurang {formatNumber(p.todayRemaining)}</span>
          )}
        </div>

        <div className="meter" style={{ marginTop: 14 }}>
          <div
            className="meter__fill"
            style={{
              width: `${p.dailyTarget > 0 ? Math.min(100, (p.today / p.dailyTarget) * 100) : 100}%`,
            }}
          />
        </div>

        <button
          type="button"
          className="btn btn--primary btn--block btn--lg"
          style={{ marginTop: 18 }}
          onClick={() => navigate('/sholawat/baca')}
        >
          <IconPlay style={{ width: 18, height: 18 }} /> Baca Sholawat Sekarang
        </button>
      </div>

      <div className="stat-grid" style={{ marginTop: 12 }}>
        <div className="stat-card">
          <p className="stat-card__value">
            {p.dayIndex < 1 ? '—' : `${Math.min(p.dayIndex, program.days)}`}
            <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-tertiary)' }}>
              /{program.days}
            </span>
          </p>
          <p className="stat-card__label">
            <IconCalendar style={{ width: 13, height: 13, verticalAlign: '-2px' }} /> Hari berjalan
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(p.streak)}</p>
          <p className="stat-card__label">
            <IconFlame style={{ width: 13, height: 13, verticalAlign: '-2px' }} /> Hari berturut-turut
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value">{formatNumber(p.averagePerActiveDay)}</p>
          <p className="stat-card__label">
            <IconTrend style={{ width: 13, height: 13, verticalAlign: '-2px' }} /> Rata-rata per hari
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-card__value" style={{ fontSize: 20 }}>
            {p.projectedEnd ? formatDateShort(parseKey(p.projectedEnd).getTime()) : '—'}
          </p>
          <p className="stat-card__label">
            {p.projectedEnd
              ? 'Perkiraan selesai dengan laju sekarang'
              : 'Perkiraan selesai muncul setelah 3 hari terisi'}
          </p>
        </div>
      </div>

      <h2 className="section-title">Grafik {CHART_DAYS} hari terakhir</h2>
      <div className="card">
        <div className="daybars">
          {chart.map((d) => (
            <div
              key={d.date}
              className={`daybar${d.count === 0 ? ' daybar--kosong' : ''}${d.date === today ? ' daybar--hariini' : ''}`}
              title={`${formatDate(parseKey(d.date).getTime())}: ${formatNumber(d.count)} sholawat`}
            >
              <div
                className="daybar__fill"
                style={{ height: `${Math.max(3, (d.count / puncak) * 100)}%` }}
              />
            </div>
          ))}
        </div>
        <div className="daybars__axis">
          <span>{chart[0] ? formatDate(parseKey(chart[0].date).getTime()) : ''}</span>
          <span>
            Tertinggi {formatNumber(p.bestDay)} · {p.activeDays} hari terisi
          </span>
        </div>
      </div>

      <div className="list-group" style={{ marginTop: 22 }}>
        <Link className="list-row" to="/sholawat/ubah">
          <span className="list-row__icon">
            <IconPencil />
          </span>
          <span className="list-row__label">Ubah target & durasi</span>
        </Link>
        <button type="button" className="list-row" onClick={() => setConfirmFinish(true)}>
          <span className="list-row__icon">
            <IconCheckCircle />
          </span>
          <span className="list-row__label">Akhiri program</span>
        </button>
      </div>

      <Sheet
        open={confirmFinish}
        onClose={() => setConfirmFinish(false)}
        title="Akhiri program ini?"
        actions={
          <>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={() => {
                finishProgram()
                setConfirmFinish(false)
                toast('Program dipindahkan ke riwayat')
              }}
            >
              Ya, akhiri
            </button>
            <button
              type="button"
              className="btn btn--secondary btn--block"
              onClick={() => setConfirmFinish(false)}
            >
              Batal
            </button>
          </>
        }
      >
        Capaian {formatNumber(p.total)} sholawat tetap tersimpan sebagai riwayat, dan kamu bisa
        menyusun program baru kapan saja.
      </Sheet>
    </main>
  )
}
