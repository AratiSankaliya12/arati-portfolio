import { useEffect, useRef, useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Mail, Download, ArrowUpRight, Menu } from "lucide-react"
import TypeWriter from "../ui/TypeWriter"
import { portfolioData } from "../../data/portfolio"

// First name — solid, slides up from below as a block
const firstNameVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
}

// Last name — each letter floats up individually from scattered positions
const lastLetterVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 120 + (i % 3) * 30,
    x: (i % 2 === 0 ? -1 : 1) * (i % 4) * 8,
    filter: "blur(4px)",
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.9 + i * 0.07,
    },
  }),
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 1.4 + i * 0.12,
    },
  }),
}

// Menu overlay variants
const menuOverlayVariants: Variants = {
  hidden: { opacity: 0, y: "-100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

const menuItemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.08 },
  }),
}

export default function Hero() {
  const { name, tagline, typewriterPhrases, contact } = portfolioData
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const firstName = name.split(" ")[0].toUpperCase()
  const lastName = name.split(" ")[1].toUpperCase()

  const navItems = ["about", "projects", "experience", "gallery", "contact"]

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0,
      mouseY = 0
    let cursorX = 0,
      cursorY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setCursorVisible(true)
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12
      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMove)
    const raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  const scrollToSelector = () => {
    document.getElementById("experience-selector")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* custom cursor — purple */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#7C3AED]/50 pointer-events-none z-[9999] hidden md:block"
        style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.3s" }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#7C3AED] pointer-events-none z-[9999] hidden md:block"
        style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.3s" }}
      />

      {/* ── MENU OVERLAY ── */}
      {menuOpen && (
        <motion.div
          variants={menuOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-[#080808] z-[9998] flex flex-col px-8 md:px-12 py-8"
        >
          {/* overlay navbar */}
          <div className="flex items-center justify-between mb-16">
            <div className="font-mono text-xs text-white/30 tracking-widest uppercase">
              arati@ABS12
            </div>
            {/* center name */}
            <div className="font-sans text-sm font-semibold tracking-widest text-white/70 uppercase hidden md:block">
              Arati <span className="italic font-light text-[#7C3AED]">Sankaliya</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs text-white/40 hover:text-white transition-colors flex items-center gap-2 border border-white/10 rounded-full px-4 py-2"
            >
              ✕ CLOSE
            </button>
          </div>

          {/* menu items */}
          <div className="flex-1 flex flex-col justify-center gap-2">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                custom={i}
                variants={menuItemVariants}
                initial="hidden"
                animate="visible"
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-4 py-4 border-b border-white/[0.06] hover:border-[#7C3AED]/30 transition-colors duration-300"
              >
                <span className="font-mono text-[10px] text-white/20 w-6">0{i + 1}</span>
                <span className="text-4xl md:text-6xl font-black text-white/80 group-hover:text-white tracking-tight transition-colors duration-300 uppercase">
                  {item}
                </span>
                <ArrowUpRight
                  size={20}
                  className="ml-auto text-white/10 group-hover:text-[#7C3AED] transition-colors duration-300"
                />
              </motion.a>
            ))}
          </div>

          {/* overlay bottom */}
          <div className="flex items-center justify-between pt-8 border-t border-white/[0.05]">
            <div className="flex items-center gap-5">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/30 hover:text-[#7C3AED] transition-colors flex items-center gap-1.5"
              >
                <img
                  src="/social/github.png"
                  alt=""
                  aria-hidden="true"
                  className="h-3 w-3 opacity-60"
                />
                github
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/30 hover:text-[#7C3AED] transition-colors flex items-center gap-1.5"
              >
                <img
                  src="/social/linkedin.png"
                  alt=""
                  aria-hidden="true"
                  className="h-3 w-3 opacity-60"
                />
                linkedin
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-[11px] text-white/30 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail size={12} />
                mail
              </a>
            </div>
            <div className="font-mono text-[10px] text-white/15 hidden md:block">
              arati@ABS12-Bold-05Dhamu · zsh 5.9
            </div>
          </div>
        </motion.div>
      )}

      <section className="relative min-h-screen bg-[#080808] flex flex-col justify-between overflow-hidden">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* ambient glow top-left — purple */}
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-[#7C3AED] opacity-[0.04] rounded-full blur-[160px] pointer-events-none" />
        {/* ambient glow bottom-right — deeper purple */}
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] bg-[#5B21B6] opacity-[0.05] rounded-full blur-[140px] pointer-events-none" />

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 flex items-center justify-between px-8 md:px-12 pt-8"
        >
          {/* left — menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 font-mono text-xs text-white/50 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/20 rounded-full px-4 py-2"
          >
            <Menu size={12} />
            MENU
          </button>

          {/* center — name */}
          <div className="font-sans text-sm font-semibold tracking-widest text-white/60 uppercase">
            Arati <span className="italic font-light text-[#7C3AED]">Sankaliya</span>
          </div>

          {/* right — let's connect */}
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 font-mono text-xs text-[#080808] bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors duration-300 rounded-full px-5 py-2 font-semibold"
          >
            LET'S CONNECT
          </a>
        </motion.nav>

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 px-8 md:px-12 flex-1 flex flex-col justify-center pt-4">
          {/* identity label — purple */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-[11px] text-[#7C3AED]/70 tracking-[0.25em] uppercase mb-6 flex items-center gap-3"
          >
            <span>AI Engineer</span>
            <span className="text-[#7C3AED]/40">·</span>
            <span>Agentic Systems</span>
            <span className="text-[#7C3AED]/40">·</span>
            <span>Power Linux User</span>
          </motion.div>

          {/* BIG NAME */}
          <div className="mb-2 leading-[0.85] overflow-hidden">
            {/* First name — solid white, animates as one block */}
            <div className="overflow-hidden">
              <motion.div
                variants={firstNameVariants}
                initial="hidden"
                animate="visible"
                className="flex"
              >
                {firstName.split("").map((letter, i) => (
                  <span
                    key={`first-${i}`}
                    className="text-[11vw] md:text-[10vw] lg:text-[9vw] font-black text-white leading-none tracking-[-0.02em] inline-block"
                    style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
                  >
                    {letter}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Last name — outlined, letters float up individually */}
            <div className="flex overflow-hidden">
              {lastName.split("").map((letter, i) => (
                <motion.span
                  key={`last-${i}`}
                  custom={i}
                  variants={lastLetterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-[11vw] md:text-[10vw] lg:text-[9vw] font-black leading-none tracking-[-0.02em] inline-block"
                  style={{
                    fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                    color: "transparent",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* tagline + typewriter row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-8 gap-4">
            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-[#7C3AED] text-base md:text-lg font-light max-w-md leading-relaxed"
            >
              {tagline}
            </motion.p>

            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-mono text-sm text-right"
            >
              <TypeWriter phrases={[...typewriterPhrases]} />
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          className="relative z-10 px-8 md:px-12 pb-8 flex items-center justify-between border-t border-white/[0.05] pt-5 mt-6"
        >
          {/* left — tagline */}
          <div className="font-mono text-[10px] text-white/20 tracking-wider uppercase hidden md:block">
            Building with logic. Shipping with heart.
          </div>

          {/* center — social */}
          <div className="flex items-center gap-5">
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-white/35 hover:text-[#7C3AED] transition-colors duration-300 flex items-center gap-1.5"
            >
              <img
                src="/social/github.png"
                alt=""
                aria-hidden="true"
                className="h-3 w-3 opacity-60"
              />
              github
            </a>
            <span className="text-white/15 text-xs">·</span>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-white/35 hover:text-[#7C3AED] transition-colors duration-300 flex items-center gap-1.5"
            >
              <img
                src="/social/linkedin.png"
                alt=""
                aria-hidden="true"
                className="h-3 w-3 opacity-60"
              />
              linkedin
            </a>
            <span className="text-white/15 text-xs">·</span>
            <a
              href={`mailto:${contact.email}`}
              className="font-mono text-[11px] text-white/35 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
            >
              <Mail size={12} />
              mail
            </a>
          </div>

          {/* right — download resume button */}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 font-mono text-[11px] text-white/70 hover:text-white border border-[#7C3AED]/40 hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all duration-300 rounded-full px-4 py-2"
          >
            <Download size={11} />
            Download Resume
          </a>
        </motion.div>

        {/* bottom-right system info — slightly more visible */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-20 right-8 font-mono text-[9px] text-white/25 text-right leading-relaxed hidden lg:block"
        >
          <div>arati@ABS12-Bold-05Dhamu</div>
          <div>zsh 5.9 · Ubuntu 24.04.4</div>
          <div>uptime: 20 years, 5 months</div>
        </motion.div>
      </section>
    </>
  )
}
