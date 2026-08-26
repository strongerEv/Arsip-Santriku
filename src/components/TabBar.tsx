import { NavLink } from 'react-router-dom'
import { IconArchive, IconBeads, IconChart, IconGear, IconHome } from './Icons'

const TABS = [
  { to: '/', label: 'Beranda', Icon: IconHome, end: true },
  { to: '/arsip', label: 'Arsip', Icon: IconArchive, end: false },
  { to: '/istighosah', label: 'Istighosah', Icon: IconBeads, end: false },
  { to: '/statistik', label: 'Statistik', Icon: IconChart, end: false },
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
