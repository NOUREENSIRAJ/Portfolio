/**
 * Button aur link par click ki awaz.
 *
 * Koi mp3 file nahi chahiye — awaz Web Audio se yahin banti hai.
 * Isliye na download karna parta hai, na copyright ka masla hai.
 */

let ctx: AudioContext | null = null
let muted = false

function context(): AudioContext | null {
  if (typeof window === "undefined") return null
  if (!ctx) {
    const Ctor = window.AudioContext ?? (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  if (ctx.state === "suspended") void ctx.resume()
  return ctx
}

export function playClick(): void {
  if (muted) return

  const audio = context()
  if (!audio) return

  const now = audio.currentTime
  const osc = audio.createOscillator()
  const gain = audio.createGain()

  // Chhoti si narm "tick" — oonchi se neechi pitch, 90 millisecond mein khatam.
  osc.type = "sine"
  osc.frequency.setValueAtTime(920, now)
  osc.frequency.exponentialRampToValueAtTime(340, now + 0.07)

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.14, now + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(now)
  osc.stop(now + 0.1)
}

export function setMuted(value: boolean): void {
  muted = value
}

export function isMuted(): boolean {
  return muted
}

/** Har button aur link ke click par awaz. Ek hi listener, poori page ke liye. */
export function startClickSound(): () => void {
  const onPointerDown = (event: Event) => {
    const target = event.target as HTMLElement | null
    if (target?.closest("a, button, [role='button']")) playClick()
  }

  document.addEventListener("pointerdown", onPointerDown)
  return () => document.removeEventListener("pointerdown", onPointerDown)
}
