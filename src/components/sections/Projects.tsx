import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence, type Variants, type PanInfo } from "framer-motion"
import {
    ArrowUpRight, X, ChevronLeft, ChevronRight,
    Terminal, Bot, Cpu, Wrench, Play, ImageIcon,
} from "lucide-react"

// Custom GitHub icon as Lucide v0.400+ removed brand icons.
function Github({ size = 20 }: { size?: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-github"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}

// ── Animation variants ──────────────────────────────
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
    }),
}

// ── Types ────────────────────────────────────────────
interface ProjectData {
    id: string
    name: string
    status: "live" | "building"
    icon: React.ReactNode
    tagline: string
    overview: string
    problem: string
    approach: string
    impact: string
    stack: string[]
    github: string
    mediaSlides: { type: "video" | "screenshot"; caption: string }[]
}

// ── Project data — grounded in real READMEs / scripts ──
const projects: ProjectData[] = [
    {
        id: "digital-twin",
        name: "digital-twin",
        status: "live",
        icon: <Bot size={20} />,
        tagline: "An AI that talks as me — built on Agentic RAG.",
        overview:
            "A Digital Twin that answers as me in first person. Ask about my resume or projects and it searches my own knowledge base. Ask something current — like the latest Python version — and it reasons that it needs the internet, then searches live. It doesn't just retrieve. It reasons first, then acts.",
        problem:
            "Static chatbots either hallucinate personal facts or can't access live information. I needed an agent that knows the difference between 'ask Arati's files' and 'ask the internet' — without me hardcoding that logic anywhere.",
        approach:
            "Built a ReAct (Reason + Act) loop in LangChain with GPT-4o-mini. The agent has two tools — search_my_files (ChromaDB vector search over my resume/projects) and duckduckgo_search (live web). It decides which to call based on the question. Conversation memory persists via LangChain's FileChatMessageHistory.",
        impact:
            "Solved 3 real production issues: ghost data from deleted files (fixed with a full rebuild on every app start), hallucination on personal questions (fixed with a strict system prompt forcing tool use), and the 'lost in the middle' retrieval problem (fixed by tuning to top-5 chunks at 1000 chars). Deployed live on Streamlit Cloud.",
        stack: ["LangChain", "ChromaDB", "GPT-4o-mini", "DuckDuckGo", "Streamlit"],
        github: "https://github.com/AratiSankaliya12/digital-twin-agentic-rag",
        mediaSlides: [
            { type: "video", caption: "Live demo — asking about my projects and watching it reason" },
        ],
    },
    {
        id: "msme-underwriting-agent",
        name: "msme-underwriting-agent",
        status: "building",
        icon: <Cpu size={20} />,
        tagline: "Agentic loan underwriting — making finance less terrifying.",
        overview:
            "A 6-agent LangGraph system that reads a small business's bank statement and helps assess loan eligibility — automatically. Built agent by agent, with a strict learn-while-build framework so every line is understood, not copy-pasted.",
        problem:
            "Small business owners in India face opaque, slow loan underwriting. The documents that prove their creditworthiness — bank statements — are messy, inconsistent, and manually reviewed. That manual review is the bottleneck.",
        approach:
            "Multi-agent LangGraph pipeline: Document Ingestion (PDF parsing with confidence scoring) → Transaction Classification → Anomaly Detection → Financial Ratio calculation → Memo Generation → Orchestrator tying it together. Currently mid-build, with the ingestion and normalization agents complete.",
        impact:
            "Still in progress — and I'm building it in public rather than hiding the in-between mess. Ingestion agent handles 7 Indian date formats and lakh-notation parsing already. This is the project I'm most stretched by right now.",
        stack: ["LangGraph", "FastAPI", "Python"],
        github: "https://github.com/AratiSankaliya12/msme-underwriting-agent/tree/main",
        mediaSlides: [
            { type: "video", caption: "Walkthrough of the ingestion agent parsing a real bank statement" },
        ],
    },
    {
        id: "macos-transformation",
        name: "macOS-transformation",
        status: "live",
        icon: <Terminal size={20} />,
        tagline: "Engineered both worlds — Linux power, macOS calm.",
        overview:
            "Turned Ubuntu into a macOS-inspired developer environment — not by randomly installing themes, but by treating my own laptop like a system design problem. Every change had to pass four questions: does it improve performance, stay stable, allow recovery, and earn future-me's gratitude.",
        problem:
            "Linux is fast and flexible, but the default UI is what I call 'developer-default' — functional, not inviting. macOS feels calm and polished but locks you out of Linux's control. I didn't want to choose, so I engineered both.",
        approach:
            "Switched Bash → ZSH with Oh-My-Zsh for autosuggestions and syntax highlighting. Added the Starship prompt showing git branch and a custom message. Replaced core CLI tools: cat→bat, ls→exa, find→fd, grep→ripgrep. Added tmux for multi-pane workflows. macOS-style dock, transparent terminal, WhiteSur GTK theme.",
        impact:
            "Boot time reduced from ~30s to 18s by removing the GRUB boot-selector wait and disabling unnecessary services found via systemd-analyze blame. The result: a system that feels calm enough to actually want to open every morning — not just functional enough to tolerate.",
        stack: ["ZSH", "Starship", "GNOME", "WhiteSur", "tmux"],
        github: "https://github.com/AratiSankaliya12/macos-inspired-linux-dev-environment",
        mediaSlides: [
            { type: "screenshot", caption: "The desktop — macOS-style dock, transparent terminal" },
            { type: "screenshot", caption: "Terminal with bat, exa, and the Starship prompt" },
            { type: "screenshot", caption: "systemd-analyze blame — the boot optimization in action" },
        ],
    },
    {
        id: "linux-optimization",
        name: "linux-optimization",
        status: "live",
        icon: <Wrench size={20} />,
        tagline: "The 3 AM lesson in why backups aren't optional.",
        overview:
            "The performance and reproducibility half of my Linux environment work. This is where a single misclick at 3 AM — one click on a top-bar color setting — reset weeks of customization back to factory default in a fraction of a second.",
        problem:
            "A hand-tuned Linux environment is fragile. Not just from my own mistakes — even routine system updates can silently wipe UI customizations. I learned this the hard way, staring at a reset desktop at 3 AM.",
        approach:
            "Built a three-layer safety net: dotfiles (every config — ZSH, Starship, terminal colors — version controlled and shareable), backup/restore shell scripts that rebuild the entire environment with one command, and TimeShift snapshots taken before any genuinely risky change — like touching GRUB itself.",
        impact:
            "Took a calculated risk on optimizing GRUB and the login screen — the part that, if broken, means the laptop doesn't boot at all. Researched every change, tested in safe order, backup ready. The mindset this taught — stability and recovery before any change — now shapes how I build every system, not just my desktop.",
        stack: ["zsh", "dotfiles", "TimeShift", "systemd", "GRUB"],
        github: "https://github.com/AratiSankaliya12/macos-inspired-linux-dev-environment",
        mediaSlides: [
            { type: "screenshot", caption: "Dotfiles repo — the recipe for the entire environment" },
            { type: "screenshot", caption: "TimeShift snapshots — the safety net before risky changes" },
        ],
    },
]

// ── Status badge colors ─────────────────────────────
function StatusBadge({ status }: { status: "live" | "building" }) {
    return (
        <span
            className={`flex items-center gap-1.5 text-[10px] tracking-widest uppercase rounded-full px-2.5 py-1 ${status === "live"
                ? "text-[#7C3AED]/70 border border-[#7C3AED]/25"
                : "text-white/30 border border-white/[0.08]"
                }`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${status === "live" ? "bg-[#7C3AED] animate-pulse" : "bg-white/25"}`} />
            {status === "live" ? "live" : "building"}
        </span>
    )
}

// ── Project Card (grid item) ────────────────────────
function ProjectCard({
    project, index, isInView, onOpen,
}: { project: ProjectData; index: number; isInView: boolean; onOpen: () => void }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.15 + index * 0.12}
            onClick={onOpen}
            className="group relative border border-white/[0.07] hover:border-[#7C3AED]/40 rounded-2xl p-6 md:p-7 cursor-pointer transition-all duration-400 overflow-hidden"
            style={{ background: "#0D0D0D" }}
            whileHover={{ y: -4 }}
        >
            {/* hover glow */}
            <div className="absolute inset-0 bg-[#7C3AED]/0 group-hover:bg-[#7C3AED]/[0.03] transition-colors duration-400 pointer-events-none" />

            <div className="relative flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl border border-[#7C3AED]/20 flex items-center justify-center text-[#7C3AED]/50 group-hover:text-[#7C3AED] group-hover:border-[#7C3AED]/40 transition-all duration-300"
                    style={{ background: "rgba(124,58,237,0.05)" }}>
                    {project.icon}
                </div>
                <StatusBadge status={project.status} />
            </div>

            <h3
                className="text-white text-lg font-semibold mb-2 group-hover:text-[#7C3AED] transition-colors duration-300"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
                {project.name}
            </h3>

            <p
                className="text-white/40 leading-relaxed mb-5"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6 }}
            >
                {project.tagline}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
                {project.stack.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] text-white/25 border border-white/[0.06] rounded-full px-2 py-0.5"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {t}
                    </span>
                ))}
                {project.stack.length > 3 && (
                    <span className="text-[9px] text-white/15" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        +{project.stack.length - 3}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 text-[#7C3AED]/50 group-hover:text-[#7C3AED] transition-colors duration-300"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
                <span>View case study</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
        </motion.div>
    )
}

// ── Modal — swipeable detail view ───────────────────
function ProjectModal({ project, onClose }: { project: ProjectData; onClose: () => void }) {
    const totalSlides = 1 + project.mediaSlides.length // content slide + media slides
    const [slide, setSlide] = useState(0)

    const goTo = (i: number) => setSlide(Math.max(0, Math.min(totalSlides - 1, i)))

    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.x < -80) goTo(slide + 1)
        else if (info.offset.x > 80) goTo(slide - 1)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-[#080808]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl rounded-2xl border border-[#7C3AED]/20 overflow-hidden"
                style={{ background: "#0D0D0D", maxHeight: "88vh" }}
            >
                {/* close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-white/10 hover:border-[#7C3AED]/50 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                    style={{ background: "rgba(8,8,8,0.6)" }}
                >
                    <X size={14} />
                </button>

                {/* swipeable track */}
                <motion.div
                    className="flex cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={handleDragEnd}
                    animate={{ x: `-${slide * 100}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* ── SLIDE 0 — content ── */}
                    <div className="w-full shrink-0 overflow-y-auto p-7 md:p-9" style={{ maxHeight: "88vh" }}>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-xl border border-[#7C3AED]/25 flex items-center justify-center text-[#7C3AED]"
                                style={{ background: "rgba(124,58,237,0.08)" }}>
                                {project.icon}
                            </div>
                            <div>
                                <h2 className="text-white text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                    {project.name}
                                </h2>
                                <StatusBadge status={project.status} />
                            </div>
                        </div>

                        <p className="text-[#7C3AED]/70 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", fontStyle: "italic" }}>
                            {project.tagline}
                        </p>

                        {[
                            { label: "Overview", body: project.overview },
                            { label: "The Problem", body: project.problem },
                            { label: "Approach & Stack", body: project.approach },
                            { label: "Impact", body: project.impact },
                        ].map((section) => (
                            <div key={section.label} className="mb-5">
                                <p className="text-[#7C3AED]/50 tracking-widest uppercase mb-1.5"
                                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem" }}>
                                    {section.label}
                                </p>
                                <p className="text-white/55 leading-relaxed"
                                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.75 }}>
                                    {section.body}
                                </p>
                            </div>
                        ))}

                        <div className="flex flex-wrap gap-2 mb-7">
                            {project.stack.map((t) => (
                                <span key={t} className="text-[10px] text-[#7C3AED]/60 border border-[#7C3AED]/20 rounded-full px-3 py-1"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                    {t}
                                </span>
                            ))}
                        </div>

                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors text-white font-medium"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}
                        >
                            <Github size={16} />
                            View Source Code
                        </a>

                        {totalSlides > 1 && (
                            <p className="text-center text-white/15 mt-5" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem" }}>
                                swipe or use arrows for demo →
                            </p>
                        )}
                    </div>

                    {/* ── MEDIA SLIDES ── */}
                    {project.mediaSlides.map((media, i) => (
                        <div key={i} className="w-full shrink-0 p-7 md:p-9 flex flex-col" style={{ maxHeight: "88vh" }}>
                            <div className="flex-1 rounded-xl border border-dashed border-[#7C3AED]/20 flex flex-col items-center justify-center gap-3 min-h-[320px]"
                                style={{ background: "rgba(124,58,237,0.03)" }}>
                                {media.type === "video" ? (
                                    <>
                                        <div className="w-14 h-14 rounded-full border border-[#7C3AED]/30 flex items-center justify-center">
                                            <Play size={20} className="text-[#7C3AED]/50 ml-0.5" />
                                        </div>
                                        <p className="text-white/25" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
                                            Loom demo — coming soon
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <ImageIcon size={32} className="text-[#7C3AED]/30" />
                                        <p className="text-white/25" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>
                                            Screenshot — coming soon
                                        </p>
                                    </>
                                )}
                            </div>
                            <p className="text-center text-white/35 mt-5 leading-relaxed"
                                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 300 }}>
                                {media.caption}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* ── NAV ARROWS ── */}
                {slide > 0 && (
                    <button
                        onClick={() => goTo(slide - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/10 hover:border-[#7C3AED]/50 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 z-10"
                        style={{ background: "rgba(8,8,8,0.7)" }}
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
                {slide < totalSlides - 1 && (
                    <button
                        onClick={() => goTo(slide + 1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/10 hover:border-[#7C3AED]/50 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 z-10"
                        style={{ background: "rgba(8,8,8,0.7)" }}
                    >
                        <ChevronRight size={16} />
                    </button>
                )}

                {/* ── DOT INDICATORS ── */}
                {totalSlides > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className="transition-all duration-300 rounded-full"
                                style={{
                                    width: slide === i ? "18px" : "6px",
                                    height: "6px",
                                    background: slide === i ? "#7C3AED" : "rgba(255,255,255,0.15)",
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

// ── Component ───────────────────────────────────────
export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" })
    const [openProject, setOpenProject] = useState<ProjectData | null>(null)

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-[#080808] py-28 px-8 md:px-12 overflow-hidden"
        >
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-white/[0.04]" />
            <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-[#7C3AED] opacity-[0.03] rounded-full blur-[180px] pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* section label */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0}
                    className="flex items-center gap-3 mb-6"
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}
                >
                    <span className="text-[#7C3AED]/70 tracking-[0.3em] uppercase">04 · projects</span>
                    <span className="flex-1 h-[1px] bg-white/[0.06]" />
                </motion.div>

                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0.05}
                    className="text-white mb-3"
                    style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                        letterSpacing: "0.04em",
                    }}
                >
                    Things I've Actually Built.
                </motion.h2>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={0.1}
                    className="text-white/30 mb-14 max-w-lg leading-relaxed"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", fontWeight: 300 }}
                >
                    Click any card for the full story — the problem, the approach, the proof.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={i}
                            isInView={isInView}
                            onOpen={() => setOpenProject(project)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {openProject && (
                    <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
                )}
            </AnimatePresence>
        </section>
    )
}