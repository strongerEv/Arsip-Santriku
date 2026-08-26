import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** Ikon opsional di kepala sheet. */
  icon?: ReactNode
  /** Tombol aksi di bawah — sudah tersusun vertikal. */
  actions?: ReactNode
  dismissible?: boolean
}

export function Sheet({
  open,
  onClose,
  title,
  children,
  icon,
  actions,
  dismissible = true,
}: SheetProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, dismissible])

  if (!open) return null

  // Dirender lewat portal ke <body>: elemen halaman yang sedang beranimasi
  // membentuk containing block sehingga `position: fixed` di dalamnya salah posisi.
  return createPortal(
    <div
      className="sheet-backdrop"
      onClick={dismissible ? onClose : undefined}
      role="presentation"
    >
      <div
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet__grabber" />
        {icon && <div className="sheet__icon">{icon}</div>}
        <h2 className="sheet__title">{title}</h2>
        <div className="sheet__body">{children}</div>
        {actions && <div className="sheet__actions">{actions}</div>}
      </div>
    </div>,
    document.body,
  )
}
