/**
 * CursorSparkle — canvas-based sparkle trail
 *
 * Design choices:
 *  • Canvas (not DOM elements) — O(1) compositing at any particle count
 *  • globalCompositeOperation "lighter" → particles bloom when they overlap
 *  • canvas element mix-blend-mode "screen" → blends with dark page background
 *  • Distance-throttled spawning → consistent density at any cursor speed
 *  • Particle cap (200) → GPU-friendly; excess are dropped from the tail
 *  • Gravity + air resistance → natural scatter arc, not linear fade
 */

import { useEffect, useRef, useCallback } from "react"

// ── Particle type ────────────────────────────────────
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number   // core dot radius
  opacity: number  // 0–1
  decay: number    // opacity lost per frame
  color: string    // hex
}

// Purple + violet + white — four weights
const PALETTE = [
  "#7C3AED", // brand purple
  "#9F5FFF", // lighter purple
  "#C084FC", // soft lilac
  "#EDE9FE", // almost white-violet
  "#ffffff",  // pure white core accent
]

const MAX_PARTICLES = 200
const SPAWN_DISTANCE = 4   // px between spawns — tighter = more responsive
const SPAWN_COUNT   = 4    // particles per spawn event

// ── Component ────────────────────────────────────────
export default function CursorSparkle() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const particles   = useRef<Particle[]>([])
  const rafId       = useRef<number>(0)
  const lastPos     = useRef({ x: -999, y: -999 })

  // ── Spawn a burst at (x, y) ────────────────────────
  const spawn = useCallback((x: number, y: number) => {
    for (let i = 0; i < SPAWN_COUNT; i++) {
      // Random direction, faster upward on average
      const angle  = Math.random() * Math.PI * 2
      const speed  = 0.4 + Math.random() * 2.2
      const isCore = Math.random() < 0.25   // 25 % chance of bright white core dot

      particles.current.push({
        x:       x + (Math.random() - 0.5) * 6,
        y:       y + (Math.random() - 0.5) * 6,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed - 0.6,
        radius:  isCore ? 0.6 + Math.random() * 0.6 : 0.8 + Math.random() * 1.4,
        opacity: 0.7 + Math.random() * 0.3,
        decay:   0.055 + Math.random() * 0.035,  // ~15–25 frames lifetime
        color:   isCore ? "#ffffff" : PALETTE[Math.floor(Math.random() * (PALETTE.length - 1))],
      })
    }

    // Drop oldest if over cap
    if (particles.current.length > MAX_PARTICLES) {
      particles.current.splice(0, particles.current.length - MAX_PARTICLES)
    }
  }, [])

  // ── Mouse move ────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return // throttle by distance
      lastPos.current = { x: e.clientX, y: e.clientY }
      spawn(e.clientX, e.clientY)
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [spawn])

  // ── Animation loop ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Resize canvas to viewport
    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    const frame = () => {
      // Clear with full transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // "lighter" composite → overlapping particles bloom into white-purple glow
      ctx.globalCompositeOperation = "lighter"

      const alive: Particle[] = []

      for (const p of particles.current) {
        // Physics step
        p.vy   += 0.045  // gravity
        p.vx   *= 0.965  // horizontal drag
        p.vy   *= 0.965  // vertical drag
        p.x    += p.vx
        p.y    += p.vy
        p.opacity -= p.decay
        p.radius  *= 0.972  // shrinks faster

        if (p.opacity <= 0.01) continue
        alive.push(p)

        const alpha = Math.max(0, p.opacity)
        const r     = Math.max(0.3, p.radius)

        ctx.globalAlpha = alpha

        // ── Soft outer halo ──
        const haloR = r * 2.5
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR)
        grad.addColorStop(0,   p.color + "60")
        grad.addColorStop(0.4, p.color + "22")
        grad.addColorStop(1,   "transparent")

        ctx.beginPath()
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // ── Hard glowing core ──
        ctx.shadowBlur  = 8
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      }

      particles.current = alive

      // Reset compositing for next frame's clearRect to work properly
      ctx.globalCompositeOperation = "source-over"
      ctx.globalAlpha = 1

      rafId.current = requestAnimationFrame(frame)
    }

    rafId.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 9998,         // below custom cursor (9999) but above everything else
        mixBlendMode: "screen", // page-level blend → adds to dark bg without washing it out
      }}
    />
  )
}
