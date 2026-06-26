import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion"
import { ArrowUpRight, Briefcase, MapPin, Calendar, ChevronDown } from "lucide-react"

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

const lineGrow: Variants = {
  hidden: { 
    scaleY: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  },
  visible: {
    scaleY: 1,
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
}

// ── Data ────────────────────────────────────────────
const experience = {
  role: "AI Engineer Intern",
  company: "AIGyde Solutions LLP",
  period: "2025 — Present",
  location: "Remote · Gujarat, India",
  type: "Internship",
  description:
    "Working on BizGyde — an AI-powered startup advisor platform. My work spans product evaluation, AI workflow analysis, and agentic feature research.",
  responsibilities: [
    "Evaluating BizGyde's AI workflows — testing context awareness, founder interactions, and response quality at a product level",
    "Giving structured feedback on UX, chatbot quality, and founder experience to improve the core product",
    "Researching founder pain points through podcasts and market analysis to identify better question flows and Red Team workflows",
    "Identifying mini-tool ideas that make BizGyde more practical and sellable for early-stage founders",
  ],
  stack: ["LangChain", "LangGraph", "FastAPI", "Agentic AI", "RAG"],
  link: "https://aigyde.com",
}

// ── Component ───────────────────────────────────────
export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-80px" })
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#080808] py-28 px-8 md:px-12 overflow-hidden"
    >
      {/* top border */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-white/[0.04]" />

      {/* ambient glow */}
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-[#7C3AED] opacity-[0.03] rounded-full blur-[180px] pointer-events-none" />

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
          <span className="text-[#7C3AED]/70 tracking-[0.3em] uppercase">03 · experience</span>
          <span className="flex-1 h-[1px] bg-white/[0.06]" />
        </motion.div>

        {/* ── Layout: heading left + timeline right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
          {/* LEFT — sticky heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.25}
            className="lg:sticky lg:top-32 self-start space-y-4"
          >
            <h2
              className="text-white leading-tight"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                letterSpacing: "0.04em",
                lineHeight: 1.0,
              }}
            >
              Where I've
              <br />
              <span
                style={{
                  WebkitTextStroke: "1.5px #7C3AED",
                  color: "transparent",
                }}
              >
                Been Building.
              </span>
            </h2>
            <p
              className="text-white/30 leading-relaxed"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.7,
              }}
            >
              Real work. Real feedback. Real systems. Every role shapes the engineer I'm becoming.
            </p>

            {/* open to work badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7C3AED]/20 mt-2"
              style={{ background: "rgba(124,58,237,0.05)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
              <span
                className="text-[#7C3AED]/60 text-[10px] tracking-widest uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                open to opportunities
              </span>
            </div>
          </motion.div>

          {/* RIGHT — timeline */}
          <div className="relative">
            {/* vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.04] origin-top">
              <motion.div
                variants={lineGrow}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full bg-gradient-to-b from-[#7C3AED]/40 via-[#7C3AED]/20 to-transparent origin-top h-full"
              />
            </div>

            <div className="space-y-8 pl-8">
              {/* ── CURRENT ROLE CARD ── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.75}
                className="relative"
              >
                {/* timeline dot */}
                <div className="absolute -left-[2.15rem] top-5 w-3 h-3 rounded-full border-2 border-[#7C3AED] bg-[#080808]">
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[-3px] rounded-full border border-[#7C3AED]/30"
                  />
                </div>

                {/* card */}
                <div
                  className="border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 rounded-2xl p-6 md:p-8 transition-all duration-500 group"
                  style={{ background: "#0D0D0D" }}
                >
                  {/* top row */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="text-[10px] text-[#7C3AED]/60 border border-[#7C3AED]/20 rounded-full px-2.5 py-0.5 tracking-widest uppercase"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          {experience.type}
                        </span>
                        <span
                          className="text-[10px] text-white/20 border border-white/[0.06] rounded-full px-2.5 py-0.5 tracking-widest uppercase"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          current
                        </span>
                      </div>
                      <h3
                        className="text-white text-xl font-semibold mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {experience.role}
                      </h3>
                      <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#7C3AED]/70 hover:text-[#7C3AED] transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}
                      >
                        {experience.company}
                        <ArrowUpRight size={12} />
                      </a>
                    </div>

                    {/* company icon */}
                    <div
                      className="w-12 h-12 rounded-xl border border-[#7C3AED]/20 flex items-center justify-center shrink-0 group-hover:border-[#7C3AED]/40 transition-colors"
                      style={{ background: "rgba(124,58,237,0.06)" }}
                    >
                      <Briefcase size={18} className="text-[#7C3AED]/50" />
                    </div>
                  </div>

                  {/* meta row */}
                  <div className="flex flex-wrap gap-4 mb-5">
                    <div
                      className="flex items-center gap-1.5 text-white/30"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                    >
                      <Calendar size={11} />
                      {experience.period}
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-white/30"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                    >
                      <MapPin size={11} />
                      {experience.location}
                    </div>
                  </div>

                  {/* description */}
                  <p
                    className="text-white/45 leading-relaxed mb-5"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 300,
                      lineHeight: 1.75,
                    }}
                  >
                    {experience.description}
                  </p>

                  {/* expandable responsibilities */}
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-[#7C3AED]/50 hover:text-[#7C3AED] transition-colors mb-4 group/btn"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
                  >
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                    <span>{expanded ? "hide details" : "show what I actually do"}</span>
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 mb-5 pt-1">
                          {experience.responsibilities.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.07, duration: 0.4 }}
                              className="flex items-start gap-3 text-white/40"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: "0.85rem",
                                fontWeight: 300,
                                lineHeight: 1.7,
                              }}
                            >
                              <span
                                className="text-[#7C3AED]/40 mt-1 shrink-0"
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "0.6rem",
                                }}
                              >
                                →
                              </span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* tech stack pills */}
                  <div className="flex flex-wrap gap-2">
                    {experience.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-[#7C3AED]/50 border border-[#7C3AED]/15 rounded-full px-3 py-1 hover:border-[#7C3AED]/35 hover:text-[#7C3AED]/70 transition-colors"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── NEXT ROLE — "coming soon" placeholder ── */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={1.3}
                className="relative"
              >
                {/* timeline dot — dimmed */}
                <div className="absolute -left-[2.15rem] top-5 w-3 h-3 rounded-full border-2 border-white/10 bg-[#080808]" />

                <div
                  className="border border-dashed border-white/[0.07] hover:border-[#7C3AED]/20 rounded-2xl p-6 md:p-8 transition-all duration-500 group cursor-default"
                  style={{ background: "rgba(255,255,255,0.01)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="text-[10px] text-white/15 border border-white/[0.06] rounded-full px-2.5 py-0.5 tracking-widest uppercase"
                          style={{ fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          next chapter
                        </span>
                      </div>
                      <h3
                        className="text-white/20 group-hover:text-white/30 transition-colors text-xl font-semibold mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        AI / GenAI Engineer
                      </h3>
                      <p
                        className="text-white/15 group-hover:text-white/20 transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem" }}
                      >
                        Mid-size product or AI-first startup
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl border border-dashed border-white/[0.07] flex items-center justify-center shrink-0">
                      <span
                        className="text-white/15"
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem" }}
                      >
                        ?
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4">
                    <div
                      className="flex items-center gap-1.5 text-white/15"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                    >
                      <MapPin size={11} />
                      India · Open to remote
                    </div>
                    <div
                      className="flex items-center gap-1.5 text-white/15"
                      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }}
                    >
                      <Calendar size={11} />6 – 12 LPA · 2026
                    </div>
                  </div>

                  <p
                    className="text-white/15 group-hover:text-white/20 transition-colors mt-4 leading-relaxed"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                    }}
                  >
                    Looking for a team that builds things that matter. Agentic systems, real-world
                    AI, product thinking — that's where I want to grow next.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
