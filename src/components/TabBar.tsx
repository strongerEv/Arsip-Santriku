import { NavLink } from 'react-router-dom'
import { IconArchive, IconBeads, IconGear, IconHeart, IconHome } from './Icons'

const TABS = [
  { to: '/', label: 'Beranda', Icon: IconHome, end: true },
  { to: '/arsip', label: 'Arsip', Icon: IconArchive, end: false },
  { to: '/amalan', label: 'Amalan', Icon: IconBeads, end: false },
  { to: '/sholawat', label: 'Sholawat', Icon: IconHeart, end: false },
  { to: '/pengaturan', label: 'Pengaturan', Icon: IconGear, end: false },
]

export function TabBar() {
  return (
    <nav className="tabbar" aria-label="Navigasi utama">
      <div className="tabbar__inner">
        {TABS.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `tabbar__item${isActive ? ' is-active' : ''}`}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
