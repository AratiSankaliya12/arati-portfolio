import { useRef, useState } from "react"
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  type Variants,
} from "framer-motion"

// ── Animation variants ──────────────────────────────
const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 32,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const photoCardVariants: Variants = {
  hidden: { 
    clipPath: "inset(100% 0% 0% 0%)", 
    opacity: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  visible: { 
    clipPath: "inset(0% 0% 0% 0%)", 
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  }
}

const currentlyCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 16,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.7 }
  }
}

const marqueeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
  }
}

// ── Data ────────────────────────────────────────────
const stats = [
  { value: "B.Tech", label: "AI & Data Science" },
  { value: "AI Intern", label: "@ AIGyde Solutions" },
  { value: "4th Year", label: "ADIT · CVM Uni" },
]

const currentItems = [
  { label: "building", value: "Agentic AI Workflows" },
  { label: "learning", value: "LangGraph · Multi Agent Systems · FastAPI" },
  { label: "obsessing", value: "agent internals · how they work under the hood" },
]

// ── Component ───────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(contentRef, { once: false, margin: "-80px" })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#080808] py-28 px-8 md:px-12 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-white/[0.04]" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#7C3AED] opacity-[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5B21B6] opacity-[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Section label ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center gap-3 mb-16"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
        >
          <span className="text-[#7C3AED]/70 tracking-[0.3em] uppercase">02 · about</span>
          <span className="flex-1 h-[1px] bg-white/[0.10]" />
        </motion.div>

        {/* ── Main grid: left content + right photo ── */}
        <div 
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start"
        >
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-10">
            {/* Heading — changed to I Build / Agents. */}
            <div className="overflow-hidden">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.05}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(2.8rem, 6vw, 5rem)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.0,
                }}
              >
                <span className="text-white">I Build</span>
                <br />
                <span
                  style={{
                    WebkitTextStroke: "1.5px #7C3AED",
                    color: "transparent",
                  }}
                >
                  Agents.
                </span>
              </motion.h2>
            </div>

            {/* One-liner bio */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.15}
              className="text-white/50 leading-relaxed max-w-md"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.05rem",
                fontWeight: 300,
                lineHeight: 1.75,
              }}
            >
              Break things. Understand why. Build them back smarter. That's my
              process — and it's how I approach every agent, every system, every
              workflow I touch.
            </motion.p>

            {/* Stat chips */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.22}
              className="flex flex-wrap gap-3"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="border border-[#7C3AED]/20 rounded-lg px-4 py-3 hover:border-[#7C3AED]/50 transition-all duration-300 hover:bg-[#7C3AED]/[0.05] group"
                >
                  <div
                    className="text-white/90 font-semibold group-hover:text-[#7C3AED] transition-colors"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-white/30 mt-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Currently block */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.3}
              className="border border-[#7C3AED]/30 rounded-xl p-5 space-y-3"
              style={{ background: "#0D0D0D" }}
            >
              <p
                className="text-[#7C3AED]/75 tracking-widest uppercase mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
              >
                currently
              </p>
              <div className="space-y-2.5">
                {currentItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline gap-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}
                  >
                    <span className="text-[#7C3AED]/65 w-20 shrink-0">{item.label}</span>
                    <span className="text-white/45">→</span>
                    <span className="text-white/90">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Photo with cyberpunk tilt ── */}
          <div className="flex flex-col gap-4">
            <PhotoCard isInView={isInView} />

            {/* ── CURRENTLY CARD — below photo ── */}
            <motion.div
              variants={currentlyCardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="rounded-xl p-4 border border-[#7C3AED]/25"
              style={{ background: "rgba(8,8,8,0.90)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
                <span
                  className="text-[#7C3AED]/60 uppercase tracking-widest"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                >
                  currently
                </span>
              </div>
              <p
                className="text-white/80 font-medium"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem" }}
              >
                AI Engineer Intern @ AIGyde
              </p>
              <p
                className="text-white/35 mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem" }}
              >
                LANGGRAPH · AGENTIC AI · FASTAPI
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── SKILLS MARQUEE ── */}
        <motion.div
          variants={marqueeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-6"
        >
          <SkillsMarquee />
        </motion.div>
      </div>
    </section>
  )
}

// ── HUD corner bracket ──────────────────────────────
function HudCorner({
  pos,
  visible,
}: {
  pos: "tl" | "tr" | "bl" | "br"
  visible: boolean
}) {
  const isTop = pos[0] === "t"
  const isLeft = pos[1] === "l"
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.7 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="absolute w-5 h-5 pointer-events-none"
      style={{
        top: isTop ? -6 : undefined,
        bottom: !isTop ? -6 : undefined,
        left: isLeft ? -6 : undefined,
        right: !isLeft ? -6 : undefined,
        borderTop: isTop ? "2px solid #7C3AED" : undefined,
        borderBottom: !isTop ? "2px solid #7C3AED" : undefined,
        borderLeft: isLeft ? "2px solid #7C3AED" : undefined,
        borderRight: !isLeft ? "2px solid #7C3AED" : undefined,
        boxShadow: visible ? "0 0 8px #7C3AED88" : "none",
      }}
    />
  )
}

// ── PhotoCard — cyberpunk 3D tilt ───────────────────
function PhotoCard({ isInView }: { isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const spring = { stiffness: 160, damping: 24, mass: 0.6 }

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [11, -11]), spring)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-11, 11]), spring)

  const shineX = useTransform(rawX, [-0.5, 0.5], [20, 80])
  const shineY = useTransform(rawY, [-0.5, 0.5], [20, 80])
  const shineOpacity = useSpring(0, spring)

  const shineBg = useMotionTemplate`radial-gradient(circle at ${shineX}% ${shineY}%, rgba(124,58,237,0.28) 0%, rgba(91,33,182,0.10) 40%, transparent 70%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
    shineOpacity.set(1)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    shineOpacity.set(0)
    setIsHovered(false)
  }

  return (
    <div
      style={{ perspective: "900px" }}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {/* ── 3-D rotating shell ── */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        variants={photoCardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative w-full"
      >
        {/* Outer glow border */}
        <motion.div
          animate={{
            borderColor: isHovered ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.18)",
            boxShadow: isHovered
              ? "0 0 30px rgba(124,58,237,0.2), 0 0 80px rgba(124,58,237,0.08), inset 0 0 24px rgba(124,58,237,0.06)"
              : "none",
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: "1px solid rgba(124,58,237,0.18)",
            background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Photo area */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: "3/4", background: "#0e0e0e" }}
        >
          <img
            src="/images/arati.jpg"
            alt="Arati Sankaliya"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = "none"
              const parent = target.parentElement
              if (parent && !parent.querySelector(".placeholder-content")) {
                const el = document.createElement("div")
                el.className =
                  "placeholder-content w-full h-full flex flex-col items-center justify-center"
                el.innerHTML = `
                  <div style="
                    width:120px;height:120px;border-radius:50%;
                    background:linear-gradient(135deg,#7C3AED22,#5B21B622);
                    border:2px dashed #7C3AED44;
                    display:flex;align-items:center;justify-content:center;
                    font-family:'Bebas Neue',sans-serif;font-size:2.5rem;
                    color:#7C3AED66;margin-bottom:16px;
                  ">AS</div>
                  <p style="
                    font-family:'JetBrains Mono',monospace;font-size:0.65rem;
                    color:rgba(255,255,255,0.2);text-align:center;
                    letter-spacing:0.15em;text-transform:uppercase;
                  ">Photo coming soon</p>
                `
                parent.appendChild(el)
              }
            }}
          />

          {/* Mouse-follow shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: shineBg, opacity: shineOpacity }}
          />

          {/* Scan lines on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
            }}
          />

          {/* HUD data overlay on hover */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-4 left-4 space-y-1 pointer-events-none"
          >
            {["// IDENTITY_VERIFIED", "ROLE: AI_ENGINEER_v2.1", "LOC: GUJARAT · INDIA"].map(
              (line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.55rem",
                    color: i === 0 ? "#7C3AED" : "rgba(255,255,255,0.35)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {line}
                </div>
              )
            )}
          </motion.div>
        </div>

        {/* HUD corners */}
        <HudCorner pos="tl" visible={isHovered} />
        <HudCorner pos="tr" visible={isHovered} />
        <HudCorner pos="bl" visible={isHovered} />
        <HudCorner pos="br" visible={isHovered} />
      </motion.div>
      {/* NOTE: ambient corner glow removed as requested */}
    </div>
  )
}

// ── Skills data ─────────────────────────────────────
const row1 = [
  { name: "Python", avatar: "Py", color: "#3776AB", iconUrl: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "LangChain", avatar: "LC", color: "#7C3AED", iconUrl: "https://cdn.simpleicons.org/langchain/7C3AED" },
  { name: "LangGraph", avatar: "LG", color: "#9F5FFF", iconUrl: "/social/langgraph.svg" },
  { name: "RAG", avatar: "R", color: "#C084FC", iconUrl: "/social/rag.svg" },
  { name: "ChromaDB", avatar: "Cr", color: "#E95420", iconUrl: "/social/chromadb.svg" },
  { name: "OpenAI", avatar: "AI", color: "#412991", iconUrl: "/social/openai.svg" },
  { name: "Streamlit", avatar: "St", color: "#FF4B4B", iconUrl: "https://cdn.simpleicons.org/streamlit/FF4B4B" },
  { name: "FastAPI", avatar: "FA", color: "#009688", iconUrl: "https://cdn.simpleicons.org/fastapi/009688" },
]

const row2 = [
  { name: "Linux", avatar: "Li", color: "#FCC624", iconUrl: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "zsh", avatar: "Z", color: "#7C3AED", iconUrl: "/social/zsh.svg" },
  { name: "TypeScript", avatar: "TS", color: "#3178C6", iconUrl: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Git", avatar: "G", color: "#F05032", iconUrl: "https://cdn.simpleicons.org/git/F05032" },
  { name: "PyTorch", avatar: "PT", color: "#EE4C2C", iconUrl: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
  { name: "Hugging Face", avatar: "HF", color: "#FFD21E", iconUrl: "https://cdn.simpleicons.org/huggingface/FFD21E" },
  { name: "Docker", avatar: "Do", color: "#2496ED", iconUrl: "https://cdn.simpleicons.org/docker/2496ED" },
]

// ── SkillPill ────────────────────────────────────────
function SkillPill({
  name, avatar, color, iconUrl,
}: { name: string; avatar: string; color: string; iconUrl?: string }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showIcon = iconUrl && !imgFailed

  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2 rounded-full shrink-0 mx-2.5 select-none"
      style={{
        border: "1px solid rgba(124,58,237,0.22)",
        background: "rgba(124,58,237,0.05)",
        backdropFilter: "blur(8px)",
      }}
    >
      {showIcon ? (
        <img
          src={iconUrl}
          alt={name}
          className="w-[18px] h-[18px] object-contain shrink-0"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="w-[22px] h-[22px] rounded-full flex items-center justify-center font-bold shrink-0"
          style={{
            background: color + "22",
            color: color,
            border: `1px solid ${color}44`,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.5rem",
          }}
        >
          {avatar}
        </span>
      )}
      <span
        className="text-white/70 whitespace-nowrap"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}
      >
        {name}
      </span>
    </div>
  )
}

// ── SkillsMarquee ────────────────────────────────────
function SkillsMarquee() {
  const [paused, setPaused] = useState(false)

  const track1 = [...row1, ...row1]
  const track2 = [...row2, ...row2]

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #080808 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #080808 0%, transparent 100%)" }}
        />

        <div
          className="flex mb-3"
          style={{
            animation: "marquee-left 35s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track1.map((skill, i) => (
            <SkillPill key={i} {...skill} />
          ))}
        </div>

        <div
          className="flex"
          style={{
            animation: "marquee-right 28s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {track2.map((skill, i) => (
            <SkillPill key={i} {...skill} />
          ))}
        </div>
      </div>
    </>
  )
}