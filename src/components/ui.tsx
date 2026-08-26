import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconChevronRight, IconInbox } from './Icons'

/* -- Baris daftar -------------------------------------------------------- */

interface ListRowProps {
  label: ReactNode
  value?: ReactNode
  icon?: ReactNode
  to?: string
  onClick?: () => void
  chevron?: boolean
  trailing?: ReactNode
}

export function ListRow({ label, value, icon, to, onClick, chevron, trailing }: ListRowProps) {
  const content = (
    <>
      {icon && <span className="list-row__icon">{icon}</span>}
      <span className="list-row__label">{label}</span>
      {value !== undefined && <span className="list-row__value">{value}</span>}
      {trailing}
      {chevron && (
        <span className="list-row__chevron">
          <IconChevronRight />
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link className="list-row" to={to}>
        {content}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button type="button" className="list-row" onClick={onClick}>
        {content}
      </button>
    )
  }
  return <div className="list-row">{content}</div>
}

/* -- Switch -------------------------------------------------------------- */

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`switch${checked ? ' is-on' : ''}`}
      onClick={() => onChange(!checked)}
    />
  )
}

/* -- Segmented control --------------------------------------------------- */

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`segmented__item${opt.value === value ? ' is-active' : ''}`}
          aria-pressed={opt.value === value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/* -- Empty state --------------------------------------------------------- */

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="empty-state">
      <IconInbox />
      <p className="empty-state__title">{title}</p>
      {description && <p style={{ fontSize: 14 }}>{description}</p>}
    </div>
  )
}

/* -- Kepala halaman ------------------------------------------------------ */

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
}) {
  return (
    <header className="page-header">
      <div className="row">
        <h1 className="large-title">{title}</h1>
        <span className="spacer" />
        {action}
      </div>
      {subtitle && <p className="page-header__sub">{subtitle}</p>}
    </header>
  )
}
