import { Link } from 'react-router-dom'
import { useSholawat } from '../context/SholawatContext'
import { computeProgress, dateKey } from '../lib/program'
import { formatNumber } from '../lib/format'
import {
  IconBook,
  IconCalendar,
  IconChevronRight,
  IconHeart,
  IconMoon,
  IconSunrise,
} from '../components/Icons'
import { PageHeader } from '../components/ui'
import type { ReactNode } from 'react'

interface ProgramSegera {
  id: string
  nama: string
  keterangan: string
  ikon: ReactNode
}

/** Program yang sedang disiapkan — tampil sebagai penanda, belum bisa dibuka. */
const SEGERA: ProgramSegera[] = [
  {
    id: 'odoj',
    nama: 'One Day One Juz',
    keterangan:
      'Tracker setoran satu juz setiap hari: mencatat juz keberapa yang sudah dibaca dan menjaga rentetan harian. Teks Al-Qur’an dibaca dari mushaf masing-masing.',
    ikon: <IconBook />,
  },
  {
    id: 'tahajud',
    nama: 'Sholat Tahajud',
    keterangan: 'Tracker bangun malam — mencatat malam-malam yang berhasil ditegakkan.',
    ikon: <IconMoon />,
  },
  {
    id: 'sedekah-subuh',
    nama: 'Sedekah Subuh',
    keterangan: 'Tracker sedekah rutin di waktu subuh, lengkap dengan rekap bulanannya.',
    ikon: <IconSunrise />,
  },
  {
    id: 'puasa-sunah',
    nama: 'Puasa Sunah',
    keterangan: 'Tracker puasa Senin–Kamis, Ayyamul Bidh, dan puasa sunah lainnya.',
    ikon: <IconCalendar />,
  },
]

export function ProgramPage() {
  const { program } = useSholawat()
  const sholawat = program ? computeProgress(program, dateKey()) : null

  return (
    <main className="page page-enter">
      <PageHeader
        title="Program"
        subtitle="Amalan yang dijalankan bertahap dengan target dan progres harian."
      />

      <Link to="/program/sholawat" className="card card--tappable">
        <span className="row" style={{ gap: 12 }}>
          <span className="list-row__icon">
            <IconHeart />
          </span>
          <span style={{ minWidth: 0 }}>
            <span className="card__title" style={{ display: 'block' }}>
              Cinta Shalawat
            </span>
            <span className="card__meta" style={{ display: 'block', marginTop: 2 }}>
              {program ? program.name : 'Pasang target sholawat sendiri'}
            </span>
          </span>
          <span className="spacer" />
          <span className="list-row__chevron">
            <IconChevronRight />
          </span>
        </span>

        {program && sholawat ? (
          <>
            <span className="meter" style={{ display: 'block', marginTop: 16 }}>
              <span
                className="meter__fill"
                style={{ display: 'block', width: `${sholawat.percent}%` }}
              />
            </span>
            <span className="card__meta" style={{ display: 'block', marginTop: 10 }}>
              {formatNumber(sholawat.total)} / {formatNumber(program.targetTotal)} ·{' '}
              {Math.round(sholawat.percent)}% · hari ini {formatNumber(sholawat.today)} dari{' '}
              {formatNumber(sholawat.dailyTarget)}
            </span>
          </>
        ) : (
          <span className="card__meta" style={{ display: 'block', marginTop: 14, lineHeight: 1.6 }}>
            Tentukan jumlah sholawat dan durasinya — misalnya 10.000 dalam 30 hari — lalu baca
            dengan tasbih digital. Target harian dihitung otomatis.
          </span>
        )}
      </Link>

      <h2 className="section-title">Segera hadir</h2>
      <div className="stack">
        {SEGERA.map((item) => (
          <div className="card card--segera" key={item.id} aria-disabled="true">
            <div className="row" style={{ gap: 12 }}>
              <span className="list-row__icon list-row__icon--netral">{item.ikon}</span>
              <span style={{ minWidth: 0 }}>
                <span className="card__title" style={{ display: 'block' }}>
                  {item.nama}
                </span>
              </span>
              <span className="spacer" />
              <span className="badge badge--neutral">Segera</span>
            </div>
            <p className="card__meta" style={{ marginTop: 12, lineHeight: 1.6 }}>
              {item.keterangan}
            </p>
          </div>
        ))}
      </div>

      <p className="muted-note" style={{ margin: '18px 4px 0' }}>
        Program-program di atas sedang disiapkan dan akan muncul lewat pembaruan aplikasi.
      </p>
    </main>
  )
}
