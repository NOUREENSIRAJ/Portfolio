import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { FormEvent, MouseEvent, ReactNode } from "react"
import Scene from "@/three/Scene"
import { startScrollTracking } from "@/scroll"
import { isMuted, setMuted, startClickSound } from "@/click"
import ProjectVisual from "./ProjectVisual"
import {
  categories,
  certifications,
  contact,
  disciplines,
  education,
  profile,
  qa,
  skills,
  type Project,
} from "@/data/cv"
import { aiProject } from "@/data/aiProject"

const NAV = [
  { id: "about", label: "About" },
  { id: "ai-project", label: "AI Project" },
  { id: "fullstack", label: "Work" },
  { id: "testing", label: "QA" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

const CATEGORY_EYEBROWS = [
  "02 · Full-stack builds",
  "03 · Front-end builds",
  "04 · Python utilities",
  "05 · Applied ML",
]

/** "Luna & Spice" → "luna-spice". Screenshot ka file naam isi se banta hai. */
function slug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()&]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

/* ── Icons ──────────────────────────────────────────────────── */

const icon = "h-4 w-4 shrink-0"

function MailIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className={icon} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" strokeLinecap="round" />
    </svg>
  )
}

function TagIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 6h18M3 12h18M3 18h11" strokeLinecap="round" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 5h16v11H9l-5 4V5Z" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Welcome ────────────────────────────────────────────────── */

function Welcome() {
  const [fading, setFading] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const a = setTimeout(() => setFading(true), 1000)
    const b = setTimeout(() => setGone(true), 1800)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream transition-opacity duration-700 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-display text-5xl italic text-ink md:text-7xl">Welcome</p>
    </div>
  )
}

/* ── Sound toggle ───────────────────────────────────────────── */

function SoundToggle() {
  const [on, setOn] = useState(!isMuted())

  return (
    <button
      type="button"
      onClick={() => {
        setOn(!on)
        setMuted(on)
      }}
      aria-pressed={on}
      className="fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full border border-ink/15 bg-cream/90 px-4 py-2 text-sm text-ink backdrop-blur transition-colors hover:border-pink hover:text-pink"
    >
      <span className={`inline-block h-2 w-2 rounded-full ${on ? "bg-pink" : "bg-ink/25"}`} />
      {on ? "Sound on" : "Sound off"}
    </button>
  )
}

/* ── Reveal ─────────────────────────────────────────────────── */

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: "-8% 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="reveal" data-shown={shown} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }

  return (
    <section
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse({ x: 0, y: 0 })}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-14"
    >
      <p
        aria-hidden="true"
        style={{ transform: `translate(${mouse.x * -26}px, ${mouse.y * -14}px)` }}
        className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 select-none justify-center whitespace-nowrap text-center font-display text-[11vw] leading-none text-ink/5 transition-transform duration-300 ease-out"
      >
        Noureen — Siraj
      </p>

      <div className="relative mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="mb-7 flex items-center gap-2.5 text-sm text-ash">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
            {profile.status} · {profile.location}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1
            style={{ transform: `translate(${mouse.x * 12}px, ${mouse.y * 7}px)` }}
            className="font-display text-[clamp(3rem,10vw,7.5rem)] leading-[0.95] text-ink transition-transform duration-300 ease-out"
          >
            Noureen
            <br />
            <em className="text-pink">Siraj</em>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 font-display text-2xl italic text-ink/80 md:text-3xl">
            {profile.role}
          </p>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/70">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#fullstack"
              className="rounded-full bg-pink px-7 py-3 text-cream transition-opacity hover:opacity-85"
            >
              See my work
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-ink transition-colors hover:border-pink hover:text-pink"
            >
              <GitHubIcon />
              GitHub
            </a>
            <CopyEmail className="flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-ink transition-colors hover:border-pink hover:text-pink" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Ribbon ─────────────────────────────────────────────────── */

function Ribbon({ words }: { words: string[] }) {
  const [paused, setPaused] = useState(false)
  const run = [...words, ...words, ...words, ...words]
  return (
    <div
      className="relative z-10 my-4 overflow-hidden bg-pink py-3"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="marquee-track flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {run.map((word, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-8 text-sm text-cream">
                {word}
                <span className="h-1.5 w-1.5 rounded-full bg-cream/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Browser mockup ─────────────────────────────────────────── */

function Mockup({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const file = `/projects/${slug(project.name)}.png`
  const bar = project.live ? project.live.replace(/^https?:\/\//, "") : "localhost"

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    setMouse({ x, y })
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/12 bg-white/85">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-blush/50 px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-pink/60" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="ml-3 truncate text-[11px] text-ash">{bar}</span>
      </div>

      <div
        onMouseMove={handleMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="aspect-[16/10] overflow-hidden bg-cream"
      >
        {failed ? (
          <ProjectVisual slug={slug(project.name)} />
        ) : (
          <img
            src={file}
            alt={`${project.name} screenshot`}
            loading="lazy"
            onError={() => setFailed(true)}
            style={{
              transform: `scale(1.08) translate(${mouse.x * -8}px, ${mouse.y * -6}px)`,
              transition: "transform 300ms ease-out",
            }}
            className="h-full w-full object-cover object-top"
          />
        )}
      </div>
    </div>
  )
}

/* ── Project card ───────────────────────────────────────────── */

function ProjectCard({
  project,
  detailed,
  flip,
}: {
  project: Project
  detailed: boolean
  flip: boolean
}) {
  const [active, setActive] = useState(false)
  const [caseOpen, setCaseOpen] = useState(false)
  return (
    <article
      onClick={() => setActive((a) => !a)}
      style={{
        transform: active
          ? `translateY(-8px) scale(1.02) rotate(${flip ? "0.4deg" : "-0.4deg"})`
          : "translateY(0) scale(1) rotate(0deg)",
      }}
      className={`cursor-pointer rounded-3xl border p-6 backdrop-blur-sm transition-all duration-500 ease-out md:p-9 ${
        active
          ? "border-pink bg-white/90 shadow-2xl shadow-pink/20"
          : "border-ink/10 bg-white/70 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"
      }`}
    >
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className={flip ? "md:order-2" : undefined}>
          <h3 className="font-display text-3xl text-ink">{project.name}</h3>
          <p className="mt-1 font-display text-lg italic text-pink">{project.kind}</p>

          <p className="mt-5 leading-relaxed text-ink/80">{project.blurb}</p>

          {detailed && project.points ? (
            <ul className="mt-5 space-y-2.5">
              {project.points.map((point) => (
                <li
                  key={point}
                  className="leading-relaxed text-ink/65 before:mr-3 before:text-pink before:content-['—']"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-pink/35 bg-blush/60 px-3 py-0.5 text-xs text-plum"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-pink px-5 py-2 text-sm text-cream transition-opacity hover:opacity-85"
              >
                View live
              </a>
            ) : null}
            {project.extra ? (
              <a
                href={project.extra}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-pink/60 px-5 py-2 text-sm text-pink transition-colors hover:bg-pink hover:text-cream"
              >
                {project.extraLabel ?? "Also"}
              </a>
            ) : null}
            {project.caseStudy ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setCaseOpen(true)
                }}
                className="rounded-full border border-plum/40 px-5 py-2 text-sm text-plum transition-colors hover:bg-plum hover:text-cream"
              >
                Case study
              </button>
            ) : null}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-ink/25 px-5 py-2 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className={flip ? "md:order-1" : undefined}>
          <Mockup project={project} />
        </div>
      </div>

      {caseOpen ? <CaseStudyModal project={project} onClose={() => setCaseOpen(false)} /> : null}
    </article>
  )
}

/* ── Case study modal ───────────────────────────────────────── */

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgFailed, setImgFailed] = useState(false)
  if (!project.caseStudy) return null

  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
        onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-6 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-cream p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg italic text-pink">Case study</p>
            <h3 className="font-display text-3xl text-ink">{project.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-ink/20 px-3 py-1.5 text-ink transition-colors hover:border-pink hover:text-pink"
          >
            Close
          </button>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
          {imgFailed ? (
            <ProjectVisual slug={slug(project.name)} style={{ aspectRatio: "16 / 10" }} />
          ) : (
            <img
              src={project.caseStudy.image}
              alt={`${project.name} case study screenshot`}
              onError={() => setImgFailed(true)}
              className="aspect-[16/10] w-full object-cover object-top"
            />
          )}
        </div>

        {project.caseStudy.image2 && !imgFailed ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-ink/10 bg-white/70">
            <img
              src={project.caseStudy.image2}
              alt={`${project.name} case study screenshot 2`}
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-pink/35 bg-blush/60 px-3 py-0.5 text-xs text-plum"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <h4 className="font-display text-lg italic text-pink">Problem</h4>
          <p className="mt-2 leading-relaxed text-ink/80">{project.caseStudy.problem}</p>
        </div>

        <div className="mt-5">
          <h4 className="font-display text-lg italic text-pink">Approach</h4>
          <p className="mt-2 leading-relaxed text-ink/80">{project.caseStudy.approach}</p>
        </div>
      </div>
    </div>
  )
}

/* ── AI project (Final Year Project) ────────────────────────── */

/* Digital signature graphic — baqi projects ke graphics jaisa, code se bana hua. */
function SignatureVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-cream via-white to-blush/60">
      <style>{`
        @keyframes sig-float { 0%, 100% { transform: translateY(0) rotate(-3deg) } 50% { transform: translateY(-8px) rotate(-3deg) } }
        @keyframes sig-dot { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes sig-draw { 0% { stroke-dashoffset: 40 } 45%, 100% { stroke-dashoffset: 0 } }
        .sig-tile { animation: sig-float 5s ease-in-out infinite; }
        .sig-dot { animation: sig-dot 6s ease-in-out infinite; }
        .sig-stroke { stroke-dasharray: 40; animation: sig-draw 3.5s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .sig-tile, .sig-dot, .sig-stroke { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <span className="sig-dot absolute top-[22%] left-[58%] h-3 w-3 rounded-full bg-pink/70" />
      <span className="sig-dot absolute top-[58%] left-[18%] h-2 w-2 rounded-full bg-pink/60" style={{ animationDelay: "1.5s" }} />
      <span className="sig-dot absolute top-[70%] right-[20%] h-1.5 w-1.5 rounded-full bg-pink/50" style={{ animationDelay: "3s" }} />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="sig-tile flex h-28 w-28 items-center justify-center rounded-3xl border border-ink/5 bg-white shadow-2xl shadow-pink/25">
          <svg
            viewBox="0 2.5 24 24"
            className="h-12 w-12 text-plum"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
            aria-label="Digital signature"
          >
            <path className="sig-stroke" d="M2.5 16.5c1.2-2.6 2.6-4.6 3.5-4.6 1 0-.2 3.6.9 3.6 1 0 1.8-2.6 2.8-2.6.8 0 .4 1.8 1.4 1.8.6 0 1.1-.5 1.6-1" />
            <path d="M2.5 20h9" />
            <path d="M14.5 14.5 20 9l2 2-5.5 5.5-2.8.8.8-2.8Z" />
            <path d="m18.6 10.4 2 2" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function AIProjectCard() {
  const [caseOpen, setCaseOpen] = useState(false)
  const p = aiProject

  return (
    <article className="rounded-3xl border border-pink/40 bg-white/80 p-6 shadow-xl shadow-pink/10 backdrop-blur-sm md:p-9">
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-pink px-3 py-1 text-xs tracking-wide text-cream">
            <span className="h-1.5 w-1.5 rounded-full bg-cream" />
            Final Year Project
          </span>
          <h3 className="mt-4 font-display text-3xl text-ink">{p.name}</h3>
          <p className="mt-1 font-display text-lg italic text-pink">{p.kind}</p>

          <p className="mt-5 leading-relaxed text-ink/80">{p.blurb}</p>

          <ul className="mt-5 space-y-2.5">
            {p.points.map((point) => (
              <li
                key={point}
                className="leading-relaxed text-ink/65 before:mr-3 before:text-pink before:content-['—']"
              >
                {point}
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-pink/35 bg-blush/60 px-3 py-0.5 text-xs text-plum"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={p.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-pink px-5 py-2 text-sm text-cream transition-opacity hover:opacity-85"
            >
              View live
            </a>
            <button
              type="button"
              onClick={() => setCaseOpen(true)}
              className="rounded-full border border-plum/40 px-5 py-2 text-sm text-plum transition-colors hover:bg-plum hover:text-cream"
            >
              Case study
            </button>
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-ink/12 bg-white/85">
          <div className="flex items-center gap-1.5 border-b border-ink/10 bg-blush/50 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-pink/60" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="ml-3 truncate text-[11px] text-ash">
              {p.live.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden">
            <SignatureVisual />
          </div>
        </div>
      </div>

      {caseOpen ? <AIProjectCaseStudy onClose={() => setCaseOpen(false)} /> : null}
    </article>
  )
}

function Shot({ src, caption }: { src: string; caption: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <figure className="mt-4 overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <img src={src} alt={caption} loading="lazy" onError={() => setFailed(true)} className="w-full" />
      <figcaption className="border-t border-ink/10 px-4 py-2.5 text-sm text-ash">{caption}</figcaption>
    </figure>
  )
}

function ShotGroup({
  title,
  lead,
  shots,
}: {
  title: string
  lead: string
  shots: { src: string; caption: string }[]
}) {
  return (
    <div className="mt-12">
      <h4 className="font-display text-2xl italic text-pink">{title}</h4>
      <p className="mt-1 text-ink/70">{lead}</p>
      {shots.map((shot) => (
        <Shot key={shot.src} src={shot.src} caption={shot.caption} />
      ))}
    </div>
  )
}

function AIProjectCaseStudy({ onClose }: { onClose: () => void }) {
  const p = aiProject
  const cs = p.caseStudy

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  const heading = "font-display text-2xl italic text-pink"

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/55 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} case study`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="my-auto w-full max-w-4xl rounded-3xl bg-cream p-6 text-ink md:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-lg italic text-pink">Case study · Final Year Project</p>
            <h3 className="mt-1 font-display text-3xl text-ink md:text-4xl">{p.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-full border border-ink/20 px-3 py-1.5 text-ink transition-colors hover:border-pink hover:text-pink"
          >
            Close
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-pink px-5 py-2 text-sm text-cream transition-opacity hover:opacity-85"
          >
            View live
          </a>
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
          >
            <GitHubIcon />
            Source on GitHub
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-pink/35 bg-blush/60 px-3 py-0.5 text-xs text-plum"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h4 className={heading}>The problem</h4>
            <p className="mt-2 leading-relaxed text-ink/80">{cs.problem}</p>
          </div>
          <div>
            <h4 className={heading}>My approach</h4>
            <p className="mt-2 leading-relaxed text-ink/80">{cs.approach}</p>
          </div>
        </div>

        <div className="mt-12">
          <h4 className={heading}>System flowchart</h4>
          <Shot src={cs.flowchart} caption="Full flow, from selecting the customer to recording the result in the logs" />
          <p className="mt-5 leading-relaxed text-ink/80">{cs.matching}</p>
          <p className="mt-4 leading-relaxed text-ink/80">
            If the OTP is not confirmed, or the match is 70% or lower, the transaction is stopped.
            Either way, the attempt is written to the logs so every decision can be reviewed later.
          </p>
        </div>

        <ShotGroup title="Admin" lead="The admin manages branches and their managers, and sees overall activity." shots={cs.admin} />

        <div className="mt-12">
          <h4 className={heading}>The verification process</h4>
          <ol className="mt-4 space-y-3">
            {cs.steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white/75 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink text-sm text-cream">
                  {i + 1}
                </span>
                <span>
                  <span className="block font-medium text-ink">{step.title}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink/65">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <ShotGroup title="Manager" lead="Managers look after cashiers and customers, and review every verification in the logs." shots={cs.manager} />
        <ShotGroup title="Cashier" lead="The cashier runs the verification at the counter." shots={cs.cashier} />
        <ShotGroup title="Customer" lead="Every verification starts by finding the customer." shots={cs.customer} />
      </div>
    </div>,
    document.body,
  )
}

/* ── Section ────────────────────────────────────────────────── */

function Section({
  id,
  eyebrow,
  title,
  accent,
  lead,
  compact = false,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  accent?: string
  lead?: string
  compact?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      className={`relative px-6 md:px-14 ${compact ? "py-12 md:py-16" : "py-24 md:py-32"}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-wide text-ash">{eyebrow}</p>
          <h2 className="font-display text-5xl leading-[1.05] text-ink md:text-6xl">
            {title}
            {accent ? (
              <em className="text-pink">
                {title ? " " : ""}
                {accent}
              </em>
            ) : null}
          </h2>
          {lead ? <p className="mt-5 max-w-[56ch] text-lg text-ink/70">{lead}</p> : null}
        </Reveal>
        <div className={compact ? "mt-8" : "mt-12"}>{children}</div>
      </div>
    </section>
  )
}

/* ── Skill row ──────────────────────────────────────────────── */

function SkillRow({ row }: { row: { group: string; items: string } }) {
  const [active, setActive] = useState(false)
  return (
    <div
      onClick={() => setActive((a) => !a)}
      className={`grid cursor-pointer gap-1.5 rounded-xl py-5 transition-all duration-300 sm:grid-cols-[11rem_1fr] sm:gap-8 ${
        active ? "scale-[1.01] bg-blush/50 px-4" : "px-0"
      }`}
    >
      <dt className={`font-display text-lg italic transition-colors ${active ? "text-plum" : "text-pink"}`}>
        {row.group}
      </dt>
      <dd className="max-w-[58ch] leading-relaxed text-ink/80">{row.items}</dd>
    </div>
  )
}

/* ── Contact form ───────────────────────────────────────────── */

type FormState = "idle" | "sending" | "sent" | "error"

function ContactForm() {
  const [state, setState] = useState<FormState>("idle")
  const [note, setNote] = useState("")

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setState("sending")
    setNote("")

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })

      if (!response.ok) throw new Error("Request failed")

      form.reset()
      setState("sent")
      setNote("Thank you! Your message is on its way.")
    } catch {
      setState("error")
      setNote("That didn't send. Email me directly instead.")
    }
  }

  const wrap =
    "flex items-center gap-3 rounded-xl border border-ink/12 bg-white/80 px-4 transition-colors focus-within:border-pink"
  const input =
    "w-full bg-transparent py-3.5 text-ink placeholder:text-ash/70 focus:outline-none"

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      className="rounded-3xl border border-ink/10 bg-blush/40 p-6 backdrop-blur-sm md:p-8"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Leave this empty <input name="bot-field" />
        </label>
      </p>

      <div className="space-y-3.5">
        <div className={wrap}>
          <span className="text-ash">
            <UserIcon />
          </span>
          <input name="name" type="text" required placeholder="Name" className={input} />
        </div>

        <div className={wrap}>
          <span className="text-ash">
            <MailIcon />
          </span>
          <input name="email" type="email" required placeholder="Email" className={input} />
        </div>

        <div className={wrap}>
          <span className="text-ash">
            <TagIcon />
          </span>
          <input name="subject" type="text" placeholder="Subject" className={input} />
        </div>

        <div className={`${wrap} items-start`}>
          <span className="mt-4 text-ash">
            <ChatIcon />
          </span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Your message"
            className={`${input} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 w-full rounded-xl bg-pink py-3.5 text-sm tracking-wide text-cream transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Submit ↗"}
      </button>

      {note ? (
        <p className={`mt-4 text-sm ${state === "error" ? "text-plum" : "text-ash"}`} role="status">
          {note}
        </p>
      ) : null}
    </form>
  )
}

/* ── Contact detail row ─────────────────────────────────────── */

function Detail({
  glyph,
  label,
  value,
  href,
}: {
  glyph: ReactNode
  label: string
  value: string
  href?: string
}) {
  const text = href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:text-pink">
      {value}
    </a>
  ) : (
    value
  )

  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/12 bg-white/70 text-pink">
        {glyph}
      </span>
      <span>
        <span className="block text-sm text-ash">{label}</span>
        <span className="block text-ink/85">{text}</span>
      </span>
    </div>
  )
}

/* ── Copy email button ──────────────────────────────────────── */

function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${contact.email}`}
      className={
        className ??
        "flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
      }
    >
      <MailIcon />
      {copied ? "Copied" : "Copy email"}
    </button>
  )
}

/* ── Page ───────────────────────────────────────────────────── */

export default function App() {
  useEffect(() => startScrollTracking(), [])
  useEffect(() => startClickSound(), [])

  return (
    <>
      <Welcome />
      <Scene />
      <div className="pointer-events-none fixed inset-0 z-[5] bg-cream/55" aria-hidden="true" />
      <SoundToggle />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-30 border-b border-ink/8 bg-cream/70 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-14">
          <a href="#top" className="font-display text-lg italic text-ink">
            Noureen
          </a>
          <ul className="hidden gap-7 text-sm text-ash md:flex">
            {NAV.map((item) => (
              <li key={item.id}>
                <a className="transition-colors hover:text-pink" href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={contact.cv}
            download
            className="rounded-full bg-pink px-4 py-1.5 text-sm text-cream transition-opacity hover:opacity-85"
          >
            Download CV
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        <Hero />

        <Ribbon words={disciplines} />

        <Section id="about" eyebrow="01 · Introduction" title="A little" accent="about me">
          <Reveal>
            <p className="max-w-[62ch] text-lg leading-[1.8] text-ink/80">{profile.intro}</p>
            <p className="mt-5 max-w-[62ch] text-lg leading-[1.8] text-ink/80">{profile.intro2}</p>
          </Reveal>
        </Section>

        <Section
          id="ai-project"
          eyebrow="Featured · AI project"
          title="AI"
          accent="project"
          lead="A signature verification system I built for my final year, aimed at catching forged signatures at the bank counter."
        >
          <Reveal>
            <AIProjectCard />
          </Reveal>
        </Section>

        {categories.map((category, ci) => (
          <div key={category.id}>
            <Section
              id={category.id}
              eyebrow={CATEGORY_EYEBROWS[ci] ?? "Selected work"}
              title={category.title}
              accent="work"
              lead={category.lead}
            >
              <div className="grid gap-6">
                {category.projects.map((project, i) => (
                  <Reveal key={project.name} delay={i * 50}>
                    <ProjectCard
                      project={project}
                      detailed={category.id !== "frontend"}
                      flip={i % 2 === 1}
                    />
                  </Reveal>
                ))}
              </div>
            </Section>
            {ci === 1 ? <Ribbon words={["React", "Flask", "MongoDB", "Python", "Software QA"]} /> : null}
          </div>
        ))}

        <Section id="testing" eyebrow="06 · How I test" title="Software Quality" accent="Assurance" lead={qa.lead}>
          <div className="grid gap-6 md:grid-cols-2">
            {qa.blocks.map((block, i) => (
              <Reveal key={block.title} delay={i * 60}>
                <div className="h-full rounded-3xl border border-ink/10 bg-white/75 p-7 backdrop-blur-sm">
                  <h3 className="font-display text-2xl text-ink">{block.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {block.points.map((point) => (
                      <li
                        key={point}
                        className="leading-relaxed text-ink/75 before:mr-3 before:text-pink before:content-['—']"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="07 · Toolkit" title="What I" accent="work with">
          <dl className="divide-y divide-ink/10 border-t border-ink/10">
            {skills.map((row, i) => (
              <Reveal key={row.group} delay={i * 40}>
                <SkillRow row={row} />
              </Reveal>
            ))}
          </dl>
        </Section>

        <Section id="education" eyebrow="08 · Background" title="Education" compact>
          <ul className="space-y-5">
            {education.map((item) => (
              <Reveal key={item.title}>
                <li className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                  <span className="w-32 shrink-0 text-sm text-ash tabular-nums">{item.period}</span>
                  <span>
                    <span className="block text-ink">{item.title}</span>
                    <span className="block text-sm text-ash">{item.org}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="certifications" eyebrow="09 · Credentials" title="" accent="Certifications" compact>
          <ul className="space-y-5">
            {certifications.map((item) => (
              <Reveal key={item.title}>
                <li className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                  <span className="w-32 shrink-0 text-sm text-ash tabular-nums">{item.period}</span>
                  <span>
                    <span className="block text-ink">{item.title}</span>
                    <span className="block text-sm text-ash">{item.org}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Ribbon words={["Let's work together", "Open to work", "Karachi"]} />

        {/* ── Contact ──────────────────────────────────────── */}
        <section id="contact" className="relative px-6 py-24 md:px-14 md:py-32">
          <div className="mx-auto w-full max-w-5xl">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <p className="mb-4 text-sm tracking-wide text-ash">10 · Contact</p>
                <h2 className="font-display text-5xl leading-[1.05] text-ink md:text-6xl">
                  Get in <em className="text-pink">Touch</em>
                </h2>
                <p className="mt-6 max-w-[46ch] leading-relaxed text-ink/70">
                  Have a project, a role to fill, or a system that needs building? Send a message
                  and I will reply within a day.
                </p>

                <div className="mt-10 space-y-6">
                  <Detail
                    glyph={<MailIcon />}
                    label="Email"
                    value={contact.email}
                    href={`mailto:${contact.email}`}
                  />
                  <Detail
                    glyph={<PhoneIcon />}
                    label="Phone"
                    value={contact.phone}
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  />
                  <Detail glyph={<PinIcon />} label="Location" value={profile.location} />
                </div>

                <a
                  href={contact.cv}
                  download
                  className="mt-10 inline-block rounded-full border border-ink/25 px-6 py-2.5 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
                >
                  Download CV
                </a>
              </Reveal>

              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>

        <footer className="border-t border-ink/10 px-6 pt-8 pb-28 text-sm text-ash md:px-14 md:pb-10">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5">
            <div>
              <span className="block text-ink">Noureen Siraj — Web Developer</span>
              <span className="mt-1 block">React · Node.js · Python · Flask · MongoDB</span>
              <span className="mt-2.5 flex items-center gap-2 text-ink/70">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
                Available for opportunities · onsite, hybrid or remote
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="rounded-full bg-pink px-5 py-2 text-sm text-cream transition-opacity hover:opacity-85"
              >
                Hire me
              </a>
              <CopyEmail />
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition-colors hover:border-pink hover:text-pink"
              >
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
