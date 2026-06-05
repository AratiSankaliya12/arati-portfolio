import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ExternalLink, Wifi } from "lucide-react"

interface DigitalTwinProps {
  onBack: () => void
}

const SSH_LINES = [
  "Connecting to digital-twin@arati-portfolio...",
  "Authenticating identity... ✓",
  "Loading knowledge base... ✓",
  "RAG vectors initialized... ✓",
  "LangChain agent ready... ✓",
  "",
  "Connection established.",
]

export default function DigitalTwin({ onBack }: DigitalTwinProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [ready, setReady] = useState(false)

  // type out SSH lines one by one
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < SSH_LINES.length) {
        setVisibleLines((prev) => [...prev, SSH_LINES[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setReady(true), 400)
      }
    }, 280)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9990] bg-[#080808]/96 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="w-full max-w-2xl flex flex-col rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl"
        style={{ background: "#0D0D0D" }}
      >
        {/* ── TITLE BAR ── */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "#161616", fontFamily: "'JetBrains Mono', monospace" }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/30 hover:text-[#7C3AED]/70 transition-colors text-xs group"
          >
            <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
            exit session
          </button>

          <div className="text-white/20 text-xs">digital-twin@arati — ssh session</div>

          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className="text-[#7C3AED]/50 text-[10px]">live</span>
          </div>
        </div>

        {/* ── SSH BOOT ANIMATION ── */}
        <div
          className="px-6 py-5 border-b border-white/[0.04] min-h-[160px]"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
        >
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`leading-relaxed ${
                line === "Connection established."
                  ? "text-[#7C3AED] font-semibold mt-1"
                  : line === ""
                    ? "h-2"
                    : "text-white/30"
              }`}
            >
              {line && line !== "Connection established." && (
                <span className="text-[#7C3AED]/40 mr-2">$</span>
              )}
              {line}
            </motion.div>
          ))}

          {/* blinking cursor while loading */}
          {!ready && (
            <span
              className="inline-block w-2 h-3 bg-[#7C3AED]/60 animate-pulse ml-1"
              style={{ verticalAlign: "middle" }}
            />
          )}
        </div>

        {/* ── MAIN CONTENT ── */}
        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 space-y-6"
            >
              {/* identity card */}
              <div
                className="flex items-start gap-4 p-4 rounded-xl border border-[#7C3AED]/15"
                style={{ background: "#111" }}
              >
                {/* avatar placeholder — online dot */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/20 flex items-center justify-center">
                    <span
                      className="text-[#7C3AED] font-bold text-lg"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                    >
                      AS
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#7C3AED] border-2 border-[#111]" />
                </div>

                <div style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <div className="text-white/70 text-sm font-medium mb-0.5">
                    Arati Sankaliya{" "}
                    <span className="text-[#7C3AED]/50 text-[12px] font-normal">
                      · digital twin
                    </span>
                  </div>
                  <div className="text-white/30 text-xs mb-2">
                    AI Engineer · Agentic Systems · Power Linux User
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi size={10} className="text-[#7C3AED]/50" />
                    <span className="text-[#7C3AED]/50 text-[12px]">
                      RAG · GPT-4o-mini · LangChain · ChromaDB
                    </span>
                  </div>
                </div>
              </div>

              {/* session info */}
              <div
                className="text-white/35 text-xs leading-relaxed px-1"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 300,
                }}
              >
                This is an AI version of me. Built with RAG so it actually knows my projects, my
                thinking, and my work. Ask it anything you'd ask me directly.
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <a
                  href="https://arati-digital-twin-agentic-rag.streamlit.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors text-white font-medium text-sm"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <ExternalLink size={14} />
                  Open Digital Twin
                </a>

                <button
                  onClick={onBack}
                  className="px-4 py-3 rounded-xl border border-white/[0.08] text-white/30 hover:text-white/50 hover:border-white/15 transition-colors text-sm"
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
                >
                  ← back
                </button>
              </div>

              {/* bottom note */}
              <div
                className="text-center text-white/15 text-[12px] pb-1"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                hosted at arati-digital-twin-agentic-rag.streamlit.app
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
