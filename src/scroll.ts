/**
 * Scroll ki position ko React state mein rakhne se har frame par re-render hota hai.
 * Isliye ise ek simple mutable object mein rakha gaya hai — Canvas usko
 * useFrame ke andar parhta hai, DOM ko chhua bhi nahi jata.
 */
export const scroll = {
  /** 0 = page ke shuru mein, 1 = page ke aakhir mein */
  progress: 0,
  /** viewport ki height ke hisaab se kitne screens neeche aa chuke hain */
  screens: 0,
}

export function startScrollTracking(): () => void {
  let frame = 0

  const measure = () => {
    frame = 0
    const max = document.documentElement.scrollHeight - window.innerHeight
    scroll.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    scroll.screens = window.scrollY / Math.max(1, window.innerHeight)
  }

  const onScroll = () => {
    if (frame === 0) frame = requestAnimationFrame(measure)
  }

  measure()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", measure)

  return () => {
    if (frame !== 0) cancelAnimationFrame(frame)
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("resize", measure)
  }
}
