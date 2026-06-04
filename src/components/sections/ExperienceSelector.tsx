import { useState } from "react"
import { motion, type Variants } from "framer-motion"
import { Terminal, Bot, ArrowRight } from "lucide-react"

interface ExperienceSelectorProps {
  onSelect: (mode: "terminal" | "digitaltwin") => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ExperienceSelector({ onSelect }: ExperienceSelectorProps) {
  const [hovered, setHovered] = useState<"terminal" | "digitaltwin" | null>(null)

  const getCardMotion = (card: "terminal" | "digitaltwin") => {
    if (hovered === null || hovered === card) return { x: 0, filter: "blur(0px)", opacity: 1 }
    const direction = card === "terminal" ? -14 : 14
    return { x: direction, filter: "blur(2.5px)", opacity: 0.4 }
  }

  return (
    <section
      id="experience-selector"
      className="relative min-h-screen bg-[#080808] flex flex-col items-center justify-center px-8 md:px-12 py-24 overflow-hidden"
    >
      {/* ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#7C3AED] opacity-[0.035] rounded-full blur-[200px] pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* section label */}
        <motion.div
          variants={itemVariants}
          className="text-[12px] text-[#7C3AED]/50 tracking-[0.3em] uppercase mb-10 flex items-center gap-3"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="w-8 h-[1px] bg-[#7C3AED]/30 inline-block" />
          choose your experience
        </motion.div>

        {/* heading */}
        <motion.div variants={itemVariants} className="mb-4 space-y-1">
          <p
            className="text-white/50 leading-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            This isn't just a portfolio.
          </p>
          <p
            className="text-white leading-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.0rem, 5.0vw, 4rem)",
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            It's an interactive version of my mind.
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-white/25 mb-16 tracking-widest uppercase"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.9rem",
          }}
        >
          — How do you want to explore it?
        </motion.p>

        {/* cards — equal height via grid rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:grid-rows-1">
          {/* Terminal Mode Card */}
          <motion.div
            variants={itemVariants}
            animate={getCardMotion("terminal")}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onMouseEnter={() => setHovered("terminal")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect("terminal")}
            className="cursor-pointer h-full"
          >
            <div
              className={`
                relative h-full border rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden
                transition-colors duration-300
                ${
                  hovered === "terminal"
                    ? "border-[#7C3AED]/60 bg-[#7C3AED]/[0.06]"
                    : "border-white/[0.07] bg-white/[0.02]"
                }
              `}
            >
              {hovered === "terminal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#7C3AED]/[0.03] pointer-events-none rounded-2xl"
                />
              )}

              {/* top section */}
              <div className="flex-1">
                <div
                  className="text-white/15 tracking-widest mb-6"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}
                >
                  01
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                    ${hovered === "terminal" ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "bg-white/[0.05] text-white/30"}`}
                >
                  <Terminal size={22} />
                </div>

                <h3
                  className={`mb-4 transition-colors duration-300 leading-tight
                    ${hovered === "terminal" ? "text-white" : "text-white/75"}`}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Command the Terminal.
                </h3>

                <p
                  className="text-white/45 leading-relaxed mb-8"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                >
                  Navigate me like a filesystem ; type commands, get answers.
                </p>

                {/* terminal preview */}
                <div
                  className="bg-black/50 rounded-lg p-4 border border-white/[0.05] mb-8"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#7C3AED]/80 font-medium">arati</span>
                    <span className="text-white/20">~</span>
                    <span className="text-white/20">→</span>
                    <span className="text-white/45">help</span>
                  </div>
                  <div className="text-white/20 leading-relaxed space-y-0.5">
                    <div>whoami · skills · projects</div>
                    <div>bat resume.pdf · neofetch</div>
                    <div className="text-[#7C3AED]/35 mt-2">+ secret commands...</div>
                  </div>
                </div>
              </div>

              {/* CTA — pinned to bottom */}
              <div
                className={`flex items-center gap-2 transition-colors duration-300
                  ${hovered === "terminal" ? "text-[#7C3AED]" : "text-white/20"}`}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}
              >
                <span>Open Terminal</span>
                <ArrowRight
                  size={14}
                  className={`transition-transform duration-300 ${hovered === "terminal" ? "translate-x-1" : ""}`}
                />
              </div>
            </div>
          </motion.div>

          {/* Digital Twin Mode Card */}
          <motion.div
            variants={itemVariants}
            animate={getCardMotion("digitaltwin")}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onMouseEnter={() => setHovered("digitaltwin")}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect("digitaltwin")}
            className="cursor-pointer h-full"
          >
            <div
              className={`
                relative h-full border rounded-2xl p-8 md:p-10 flex flex-col overflow-hidden
                transition-colors duration-300
                ${
                  hovered === "digitaltwin"
                    ? "border-[#7C3AED]/60 bg-[#7C3AED]/[0.06]"
                    : "border-white/[0.07] bg-white/[0.02]"
                }
              `}
            >
              {hovered === "digitaltwin" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#7C3AED]/[0.03] pointer-events-none rounded-2xl"
                />
              )}

              <div className="flex-1">
                <div
                  className="text-white/15 tracking-widest mb-6"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}
                >
                  02
                </div>

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                    ${hovered === "digitaltwin" ? "bg-[#7C3AED]/20 text-[#7C3AED]" : "bg-white/[0.05] text-white/30"}`}
                >
                  <Bot size={22} />
                </div>

                <h3
                  className={`mb-4 transition-colors duration-300 leading-tight
                    ${hovered === "digitaltwin" ? "text-white" : "text-white/75"}`}
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    letterSpacing: "0.05em",
                  }}
                >
                  Meet Another Me.
                </h3>

                <p
                  className="text-white/45 leading-relaxed mb-8"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                  }}
                >
                  An AI version of myself. Ask it anything. It thinks like I do.
                </p>

                {/* chat preview */}
                <div
                  className="bg-black/50 rounded-lg p-4 border border-white/[0.05] mb-8 space-y-3"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
                >
                  <div className="flex gap-3 items-start">
                    <span className="text-white/25 shrink-0">you</span>
                    <span className="text-white/35">what are you building right now?</span>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-[#7C3AED] shrink-0 font-medium">arati</span>
                    <span className="text-white/55">
                      An MSME loan agent — making finance less terrifying for small businesses...
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 transition-colors duration-300
                  ${hovered === "digitaltwin" ? "text-[#7C3AED]" : "text-white/20"}`}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}
              >
                <span>Talk to my Digital Twin</span>
                <ArrowRight
                  size={14}
                  className={`transition-transform duration-300 ${hovered === "digitaltwin" ? "translate-x-1" : ""}`}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom note */}
        <motion.p
          variants={itemVariants}
          className="text-center text-white/15 mt-10 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.70rem" }}
        >
          or keep scrolling to explore the traditional way ↓
        </motion.p>
      </motion.div>
    </section>
  )
}
