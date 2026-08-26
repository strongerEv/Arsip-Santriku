import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** Ikon garis tipis bergaya SF Symbols — semua memakai currentColor. */
function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const IconHome = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z" />
    <path d="M9.5 20.5v-6h5v6" />
  </Base>
)

export const IconArchive = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4H18a1 1 0 0 1 1 1v13.5" />
    <path d="M6.5 15.5H19v3a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 18.5v-13" />
    <path d="M9 8.5h6" />
  </Base>
)

export const IconBeads = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="7.5" />
    <circle cx="12" cy="4.5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="19.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="19.5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1.6" fill="currentColor" stroke="none" />
  </Base>
)

export const IconChart = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20h16" />
    <path d="M7 20v-6" />
    <path d="M12 20V6" />
    <path d="M17 20v-9" />
  </Base>
)

export const IconGear = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3.1" />
    <path d="M12 3.2v1.9m0 13.8v1.9M20.8 12h-1.9m-13.8 0H3.2m14.9-6.1-1.35 1.35M7.45 16.55 6.1 17.9m12 0-1.35-1.35M7.45 7.45 6.1 6.1" />
  </Base>
)

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </Base>
)

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
)

export const IconChevronRight = (p: IconProps) => (
  <Base {...p} width={18} height={18}>
    <path d="m9.5 5 7 7-7 7" />
  </Base>
)

export const IconChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="m14.5 5-7 7 7 7" />
  </Base>
)

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
)

export const IconCheck = (p: IconProps) => (
  <Base {...p} strokeWidth={2.1}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Base>
)

export const IconCheckCircle = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.4 12.2 2.5 2.5 4.7-5" />
  </Base>
)

export const IconRefresh = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 12a8 8 0 1 1-2.4-5.7" />
    <path d="M20 4v4.4h-4.4" />
  </Base>
)

export const IconShare = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 15V4" />
    <path d="m8.4 7.4 3.6-3.6 3.6 3.6" />
    <path d="M6 12.5v6A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5v-6" />
  </Base>
)

export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 7h14" />
    <path d="M9.5 7V5.6A1.6 1.6 0 0 1 11.1 4h1.8a1.6 1.6 0 0 1 1.6 1.6V7" />
    <path d="M6.7 7.5 7.4 19a1.5 1.5 0 0 0 1.5 1.4h6.2a1.5 1.5 0 0 0 1.5-1.4l.7-11.5" />
  </Base>
)

export const IconAirplane = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2c.8 0 1.3.7 1.3 1.6v4.3l7 4v2l-7-2v4l2.2 1.7v1.6L12 19.3l-3.5 1.1v-1.6L10.7 17v-4l-7 2v-2l7-4V4.8c0-.9.5-1.6 1.3-1.6Z" />
  </Base>
)

export const IconBellSlash = (p: IconProps) => (
  <Base {...p}>
    <path d="M17.5 12.5V10a5.5 5.5 0 0 0-7.6-5.1" />
    <path d="M6.5 9.6V10c0 4.2-1.5 5.4-1.5 5.4h11.6" />
    <path d="M10.4 18.6a1.9 1.9 0 0 0 3.2 0" />
    <path d="m4 4 16 16" />
  </Base>
)

export const IconMoon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" />
  </Base>
)

export const IconTextSize = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 18 8 6l4.5 12" />
    <path d="M5.2 14h5.6" />
    <path d="M14.5 18 18 9l3.5 9" />
    <path d="M15.8 15.2h4.4" />
  </Base>
)

export const IconPlay = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5 18 12 8 18.5z" fill="currentColor" />
  </Base>
)

export const IconBook = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2.5 2.5 0 0 1 2 1v14a2.5 2.5 0 0 0-2-1H5.5A1.5 1.5 0 0 1 4 16.5z" />
    <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2.5 2.5 0 0 0-2 1v14a2.5 2.5 0 0 1 2-1h4.5a1.5 1.5 0 0 0 1.5-1.5z" />
  </Base>
)

export const IconPencil = (p: IconProps) => (
  <Base {...p}>
    <path d="M15.6 5.2 18.8 8.4M4.5 19.5l.8-3.4 10.6-10.6a1.6 1.6 0 0 1 2.3 0l1.3 1.3a1.6 1.6 0 0 1 0 2.3L8.9 19.7l-3.4.8Z" />
  </Base>
)

export const IconImage = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
    <circle cx="8.8" cy="10" r="1.4" />
    <path d="m4.5 17 4.6-4.4a1.6 1.6 0 0 1 2.2 0L16 17" />
  </Base>
)

export const IconInbox = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 13.5 6.2 5.9A1.5 1.5 0 0 1 7.6 4.8h8.8a1.5 1.5 0 0 1 1.4 1.1L20 13.5v4A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
    <path d="M4 13.5h4l1 2.2h6l1-2.2h4" />
  </Base>
)

export const IconFlame = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5s4.8 3.6 4.8 8.2a4.8 4.8 0 0 1-9.6 0c0-1.4.5-2.4 1.2-3.3.5 1 1.3 1.6 2 1.6 1.2 0 1.6-1.3 1.6-3.2 0-1.2 0-2.3 0-3.3Z" />
  </Base>
)

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.3" />
    <path d="M12 7.4V12l3 1.8" />
  </Base>
)

export const IconWifiSlash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4l16 16" />
    <path d="M2.8 9.2A15 15 0 0 1 8 6.1m10 1.6a15 15 0 0 1 3.2 1.5" />
    <path d="M6.3 12.6a10 10 0 0 1 2.6-1.4m6.4.4a10 10 0 0 1 2.4 1" />
    <path d="M9.6 15.9a5 5 0 0 1 4-.3" />
    <circle cx="12" cy="19" r="0.9" fill="currentColor" stroke="none" />
  </Base>
)
