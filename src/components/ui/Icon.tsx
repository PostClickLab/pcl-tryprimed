import type { SVGProps } from 'react'

/** Stroke icon set (24×24, 1.6 stroke) derived from the PRIMED design assets. */
const paths = {
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </>
  ),
  clinical: (
    <>
      <rect x="5" y="5" width="14" height="16" rx="2" />
      <rect x="9" y="2.5" width="6" height="4.5" rx="1" />
      <path d="M8.5 11.5h7M8.5 15h7M8.5 18h4" />
    </>
  ),
  consultation: (
    <>
      <rect x="3" y="5" width="13" height="14" rx="3" />
      <path d="m16 10 5-3v10l-5-3" />
    </>
  ),
  heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 6l-1.1-1.2a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-9.4a5.5 5.5 0 0 0 0-7.8Z" />,
  user: (
    <>
      <circle cx="12" cy="7.5" r="4" />
      <path d="M4 21v-1.5a8 8 0 0 1 16 0V21" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
    </>
  ),
  scale: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 9.5a5 5 0 0 1 8 0" />
      <path d="m12 9.5 1.4-2" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 19c-2.5-2-3.5-4.5-3.5-7.5S10 6 12 4.5c2 1.5 3.5 4 3.5 7s-1 5.5-3.5 7.5Z" />
      <path d="M12 19c-3.5 0-7-2-8.5-6 2-.6 4-.4 5.5.5M12 19c3.5 0 7-2 8.5-6-2-.6-4-.4-5.5.5" />
    </>
  ),
  face: (
    <>
      <path d="M17.5 13.5c0 4-2.5 7-5.5 7s-5.5-3-5.5-7V10a5.5 5.5 0 0 1 11 0z" />
      <path d="M6.5 10c2 0 5-1 6.5-3.5 1 1.8 2.7 3.2 4.5 3.5" />
      <path d="M10 15.5c1.2.8 2.8.8 4 0" />
    </>
  ),
  dumbbell: <path d="M2.5 12h19M5 8v8M8 6.5v11M16 6.5v11M19 8v8" />,
  syringe: (
    <>
      <path d="m18 2 4 4M20 4l-3.5 3.5M14 6l4 4M15.5 8.5 7 17l-3-3 8.5-8.5M4 14l-2 2M9 11l1.5 1.5M11.5 8.5 13 10M7 17l-3 3" />
    </>
  ),
  pill: (
    <>
      <rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)" />
      <path d="m9.5 9.5 5 5" />
    </>
  ),
  tube: (
    <>
      <path d="M8 2.5h8l-1 13H9z" />
      <rect x="9" y="15.5" width="6" height="3" rx="0.5" />
      <path d="M10 18.5V21h4v-2.5M8.6 7h6.8" />
    </>
  ),
  spray: (
    <>
      <path d="M10 2.5h4v3h-4zM9 5.5h6v3H9zM8 8.5h8v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
      <path d="M8 14h8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.5 4.5 5.5v6c0 4.7 3.2 8.6 7.5 10 4.3-1.4 7.5-5.3 7.5-10v-6z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  box: (
    <>
      <path d="m12 2.5 8.5 4.5v10L12 21.5 3.5 17V7z" />
      <path d="m3.5 7 8.5 4.5L20.5 7M12 11.5v10" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: <path d="M5 3.5h3.5l2 5-2.5 1.5a11 11 0 0 0 6 6l1.5-2.5 5 2V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  sparkle: <path d="M12 3c.8 4.5 3.5 7.2 8 8-4.5.8-7.2 3.5-8 8-.8-4.5-3.5-7.2-8-8 4.5-.8 7.2-3.5 8-8Z" />,
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="m15 10.5 6-3.5v10l-6-3.5" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2.5h7L17 8h3v11H4z" />
      <circle cx="12" cy="13" r="3.2" />
    </>
  ),
  phoneOff: <path d="M3 13.5c5-4.5 13-4.5 18 0l-2 2.5-3.5-1.5V12a10 10 0 0 0-7 0v2.5L5 16z" />,
  command: <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" />,
  leaf: (
    <>
      <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
      <path d="M5 19 13 11" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
} as const

export type IconName = keyof typeof paths

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  strokeWidth?: number
}

export function Icon({ name, size = 24, strokeWidth = 1.6, className, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  )
}
