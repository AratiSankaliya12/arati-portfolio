import { useEffect, useRef, useState, useMemo } from "react"
import { motion, type Variants } from "framer-motion"
import { Mail, Download } from "lucide-react"
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



export default function Hero() {
  const { name, typewriterPhrases, contact } = portfolioData
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const [isAssembled, setIsAssembled] = useState(false)

  const firstName = name.split(" ")[0].toUpperCase()
  const lastName = name.split(" ")[1].toUpperCase()

  // Pre-calculate random fly-in positions for each letter of the last name
  const letterOffsets = useMemo(() =>
    lastName.split("").map(() => {
      const side = Math.floor(Math.random() * 4)
      const distance = 1500
      let x = 0, y = 0
      if (side === 0) { x = -distance; y = (Math.random() - 0.5) * distance }
      else if (side === 1) { x = distance; y = (Math.random() - 0.5) * distance }
      else if (side === 2) { y = -distance; x = (Math.random() - 0.5) * distance }
      else { y = distance; x = (Math.random() - 0.5) * distance }
      return { x, y, rotate: (Math.random() - 0.5) * 360, delay: Math.random() * 0.8 }
    })
    , [lastName])

  // Trigger assembly after a short delay (matches Dhruv's 600 ms)
  useEffect(() => {
    const timer = setTimeout(() => setIsAssembled(true), 600)
    return () => clearTimeout(timer)
  }, [])

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

        {/* ── MAIN CONTENT ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex-1 flex flex-col justify-center pt-20 md:pt-24">
          {/* identity label — purple */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-mono text-[11px] text-[#7C3AED] tracking-[0.25em] uppercase mb-6 flex items-center gap-3"
          >
            <span>AI Engineer</span>
            <span className="text-[#7C3AED]/80">·</span>
            <span>Agentic Systems</span>
            <span className="text-[#7C3AED]/80">·</span>
            <span>Power Linux User</span>
          </motion.div>

          {/* BIG NAME */}
          <div className="mb-2 leading-[0.85]">
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
                    style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900 }}
                  >
                    {letter}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Last name — letters fly in from random off-screen positions */}
            <div className="flex overflow-visible text-[11vw] md:text-[10vw] lg:text-[9vw] h-[1.1em]">
              {lastName.split("").map((letter, i) => (
                <span
                  key={`last-${i}`}
                  className="font-black leading-none tracking-[-0.02em] inline-block"
                  style={{
                    fontSize: "1em",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    WebkitTextStroke: "2.5px rgba(255,255,255,0.55)",
                    color: "transparent",
                    transition: "all 1.7s cubic-bezier(0.16, 1, 0.3, 1)",
                    transitionDelay: `${letterOffsets[i].delay}s`,
                    transform: isAssembled
                      ? "translate(0, 0) rotate(0deg) scale(1)"
                      : `translate(${letterOffsets[i].x}px, ${letterOffsets[i].y}px) rotate(${letterOffsets[i].rotate}deg) scale(0.5)`,
                    opacity: isAssembled ? 1 : 0,
                    filter: isAssembled ? "blur(0px)" : "blur(20px)",
                  }}
                >
                  {letter}
                </span>
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
              className="text-white/60 text-base md:text-lg font-light max-w-2xl lg:max-w-3xl leading-relaxed"
            >
              I{" "}
              <span className="text-white font-bold hover:text-[#7C3AED] transition-colors duration-300 cursor-default">
                engineer agents
              </span>
              ,{" "}
              <span className="text-white font-bold hover:text-[#7C3AED] transition-colors duration-300 cursor-default">
                configure systems
              </span>
              , and once{" "}
              <span className="text-white font-bold italic hover:text-[#7C3AED] transition-colors duration-300 cursor-default">
                built a version of myself.
              </span>
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
          className="relative z-10 w-full border-t border-white/[0.05] px-4 sm:px-6 md:px-8 pb-8 pt-5 mt-6"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
            {/* Left Column — Tagline */}
            <div className="flex justify-start">
              <div className="font-mono text-[10px] text-white/40 tracking-wider uppercase hidden md:block">
                Building with logic. Shipping with heart.
              </div>
            </div>

            {/* Center Column — Social */}
            <div className="flex justify-center items-center gap-5">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/80 hover:text-[#7C3AED] transition-colors duration-300 flex items-center gap-1.5"
              >
                <img
                  src="/social/github.png"
                  alt=""
                  aria-hidden="true"
                  className="h-3 w-3 opacity-100"
                />
                github
              </a>
              <span className="text-white/80 text-xs">·</span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-white/80 hover:text-[#7C3AED] transition-colors duration-300 flex items-center gap-1.5"
              >
                <img
                  src="/social/linkedin.png"
                  alt=""
                  aria-hidden="true"
                  className="h-3 w-3 opacity-1O0"
                />
                linkedin
              </a>
              <span className="text-white/80 text-xs">·</span>
              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-[11px] text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1.5"
              >
                <Mail size={12} />
                mail
              </a>
            </div>

            {/* Right Column — Download Resume */}
            <div className="flex justify-end">
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 font-mono text-[11px] text-white/70 hover:text-white border border-[#7C3AED]/40 hover:border-[#7C3AED] hover:bg-[#7C3AED]/10 transition-all duration-300 rounded-full px-4 py-2"
              >
                <Download size={11} />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>


      </section>
    </>
  )
}
