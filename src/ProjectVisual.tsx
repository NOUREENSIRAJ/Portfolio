import { useState } from "react"
import type { CSSProperties, MouseEvent } from "react"

/**
 * Drop-in replacement for a project screenshot.
 * Renders a themed, tilted "3D" card with an icon related to the project,
 * using your existing color tokens (--color-cream / pink / blush / ink / plum).
 *
 * Usage:
 *   <ProjectVisual slug="archstudio" />
 *
 * Put it wherever the project card currently renders the screenshot <img>,
 * e.g. inside the browser-mockup frame, sized to fill it (w-full h-full).
 */

type Slug =
  | "archstudio"
  | "luna-spice"
  | "gloss"
  | "gloss-static-build"
  | "wellcrest"
  | "devhire"
  | "shopcart"
  | "taskflow"
  | "medibook"
  | "budgetbuddy"
  | "quickblog"
  | "aes-file-encryption-tool"
  | "password-generator"
  | "qr-code-generator"
  | "sentiment-analysis-web-app"

const ICONS: Record<Slug, JSX.Element> = {
  archstudio: (
    <g>
      <path d="M20 46V22l14-9 14 9v24" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <rect x="27" y="30" width="6" height="16" fill="var(--color-pink)" />
      <rect x="41" y="30" width="6" height="16" fill="var(--color-pink)" />
      <line x1="14" y1="46" x2="50" y2="46" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  "luna-spice": (
    <g>
      <circle cx="32" cy="30" r="14" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <line x1="32" y1="44" x2="32" y2="52" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="24" y1="52" x2="40" y2="52" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="27" cy="27" r="2.6" fill="var(--color-pink)" />
      <circle cx="37" cy="27" r="2.6" fill="var(--color-pink)" />
      <circle cx="32" cy="34" r="2.6" fill="var(--color-pink)" />
    </g>
  ),
  gloss: (
    <g>
      <path d="M22 20c0 8 4 10 4 16v10h12V36c0-6 4-8 4-16" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <line x1="26" y1="46" x2="38" y2="46" stroke="var(--color-plum)" strokeWidth="2.4" />
      <circle cx="32" cy="16" r="3" fill="var(--color-pink)" />
    </g>
  ),
  "gloss-static-build": (
    <g>
      <path d="M22 20c0 8 4 10 4 16v10h12V36c0-6 4-8 4-16" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <line x1="26" y1="46" x2="38" y2="46" stroke="var(--color-plum)" strokeWidth="2.4" />
      <rect x="42" y="14" width="10" height="8" rx="1.5" fill="none" stroke="var(--color-pink)" strokeWidth="2" />
      <line x1="44" y1="18" x2="50" y2="18" stroke="var(--color-pink)" strokeWidth="1.6" />
    </g>
  ),
  wellcrest: (
    <g>
      <rect x="18" y="18" width="28" height="26" rx="2" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <line x1="18" y1="26" x2="46" y2="26" stroke="var(--color-plum)" strokeWidth="2.4" />
      <line x1="25" y1="14" x2="25" y2="22" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="39" y1="14" x2="39" y2="22" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M25 35h4l2-4 3 8 2-4h5" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinejoin="round" />
    </g>
  ),
  devhire: (
    <g>
      <rect x="16" y="24" width="32" height="20" rx="2.5" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <path d="M25 24v-4a7 7 0 0 1 14 0v4" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <line x1="16" y1="32" x2="48" y2="32" stroke="var(--color-pink)" strokeWidth="2" />
    </g>
  ),
  shopcart: (
    <g>
      <path d="M18 20h4l4 20h18l4-14H26" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="28" cy="46" r="3" fill="var(--color-pink)" />
      <circle cx="42" cy="46" r="3" fill="var(--color-pink)" />
    </g>
  ),
  taskflow: (
    <g>
      <rect x="15" y="16" width="10" height="32" rx="1.5" fill="none" stroke="var(--color-plum)" strokeWidth="2" />
      <rect x="27" y="16" width="10" height="20" rx="1.5" fill="none" stroke="var(--color-plum)" strokeWidth="2" />
      <rect x="39" y="16" width="10" height="26" rx="1.5" fill="none" stroke="var(--color-plum)" strokeWidth="2" />
      <rect x="17" y="20" width="6" height="4" fill="var(--color-pink)" />
      <rect x="29" y="20" width="6" height="4" fill="var(--color-pink)" />
      <rect x="41" y="20" width="6" height="4" fill="var(--color-pink)" />
    </g>
  ),
  medibook: (
    <g>
      <path d="M18 18h20a4 4 0 0 1 4 4v24H22a4 4 0 0 1-4-4V18Z" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <line x1="32" y1="24" x2="32" y2="34" stroke="var(--color-pink)" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="27" y1="29" x2="37" y2="29" stroke="var(--color-pink)" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  ),
  budgetbuddy: (
    <g>
      <line x1="18" y1="46" x2="46" y2="46" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="21" y="34" width="6" height="12" fill="var(--color-pink)" />
      <rect x="29" y="26" width="6" height="20" fill="var(--color-plum)" />
      <rect x="37" y="18" width="6" height="28" fill="var(--color-pink)" />
    </g>
  ),
  quickblog: (
    <g>
      <rect x="18" y="16" width="28" height="32" rx="2" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <line x1="23" y1="24" x2="41" y2="24" stroke="var(--color-pink)" strokeWidth="2" />
      <line x1="23" y1="30" x2="41" y2="30" stroke="var(--color-pink)" strokeWidth="2" />
      <line x1="23" y1="36" x2="34" y2="36" stroke="var(--color-pink)" strokeWidth="2" />
    </g>
  ),
  "aes-file-encryption-tool": (
    <g>
      <rect x="21" y="28" width="22" height="18" rx="2.5" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <path d="M25 28v-6a7 7 0 0 1 14 0v6" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
      <circle cx="32" cy="37" r="2.6" fill="var(--color-pink)" />
    </g>
  ),
  "password-generator": (
    <g>
      <path d="M32 14 18 20v10c0 10 6 16 14 20 8-4 14-10 14-20V20Z" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="32" cy="30" r="3" fill="var(--color-pink)" />
      <line x1="32" y1="33" x2="32" y2="39" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  "qr-code-generator": (
    <g>
      <rect x="16" y="16" width="12" height="12" fill="none" stroke="var(--color-plum)" strokeWidth="2.2" />
      <rect x="36" y="16" width="12" height="12" fill="none" stroke="var(--color-plum)" strokeWidth="2.2" />
      <rect x="16" y="36" width="12" height="12" fill="none" stroke="var(--color-plum)" strokeWidth="2.2" />
      <rect x="20" y="20" width="4" height="4" fill="var(--color-pink)" />
      <rect x="40" y="20" width="4" height="4" fill="var(--color-pink)" />
      <rect x="20" y="40" width="4" height="4" fill="var(--color-pink)" />
      <rect x="36" y="36" width="5" height="5" fill="var(--color-pink)" />
      <rect x="44" y="44" width="4" height="4" fill="var(--color-plum)" />
    </g>
  ),
  "sentiment-analysis-web-app": (
    <g>
      <path d="M16 20h32v18a3 3 0 0 1-3 3H26l-6 6v-6h-4a3 3 0 0 1-3-3V20Z" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" />
      <circle cx="25" cy="29" r="1.8" fill="var(--color-pink)" />
      <circle cx="39" cy="29" r="1.8" fill="var(--color-pink)" />
      <path d="M24 34c2.5 2.5 13.5 2.5 16 0" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
}

const DOTS: Record<Slug, [number, number][]> = {
  archstudio: [[10, 12], [54, 50]],
  "luna-spice": [[52, 14], [12, 48]],
  gloss: [[10, 40], [50, 12]],
  "gloss-static-build": [[10, 40], [16, 12]],
  wellcrest: [[52, 44], [8, 16]],
  devhire: [[10, 48], [52, 14]],
  shopcart: [[10, 12], [52, 40]],
  taskflow: [[52, 48], [8, 12]],
  medibook: [[10, 44], [52, 12]],
  budgetbuddy: [[52, 12], [8, 40]],
  quickblog: [[10, 12], [52, 44]],
  "aes-file-encryption-tool": [[12, 44], [50, 14]],
  "password-generator": [[10, 46], [52, 16]],
  "qr-code-generator": [[52, 46], [8, 14]],
  "sentiment-analysis-web-app": [[10, 44], [52, 12]],
}

const DEFAULT_ICON = (
  <g>
    <rect x="18" y="18" width="28" height="28" rx="6" fill="none" stroke="var(--color-plum)" strokeWidth="2.4" />
    <circle cx="32" cy="32" r="6" fill="var(--color-pink)" />
  </g>
)

export default function ProjectVisual({
  slug,
  className,
  style,
}: {
  slug: string
  className?: string
  style?: CSSProperties
}) {
  const icon = ICONS[slug as Slug] ?? DEFAULT_ICON
  const dots = DOTS[slug as Slug] ?? [[10, 12], [52, 46]]

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }

  return (
    <div
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(155deg, var(--color-cream) 0%, var(--color-blush) 100%)",
        overflow: "hidden",
        ...style,
      }}
    >
      {dots.map(([x, y], i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: i === 0 ? 10 : 6,
            height: i === 0 ? 10 : 6,
            borderRadius: "50%",
            background: "var(--color-pink)",
            opacity: 0.55,
            transform: `translate(${mouse.x * (i === 0 ? -18 : 12)}px, ${mouse.y * (i === 0 ? -14 : 10)}px)`,
            transition: "transform 300ms ease-out",
          }}
        />
      ))}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          background: "rgba(255,255,255,0.72)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 18px 30px -14px rgba(114,36,62,0.35)",
          transform: `perspective(600px) rotateX(${8 - mouse.y * 10}deg) rotateY(${-8 + mouse.x * 10}deg) translate(${mouse.x * 10}px, ${mouse.y * 8}px)`,
          transition: "transform 300ms ease-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          {icon}
        </svg>
      </div>
    </div>
  )
}
