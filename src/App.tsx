import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Maximize2 } from "lucide-react"
import DigitalTwin from "./components/digitaltwin/DigitalTwin"
import Hero from "./components/hero/Hero"
import ExperienceSelector from "./components/sections/ExperienceSelector"
import About from "./components/sections/About"
import Navbar from "./components/navigation/Navbar"
import CursorSparkle from "./components/ui/CursorSparkle"
import Experience from "./components/sections/Experience"
import Projects from "./components/sections/Projects"

// ── TYPES ──────────────────────────────────────────
interface TerminalLine {
  id: number
  type: "input" | "output" | "error" | "system"
  content: string | string[]
}

interface SkillsMenuState {
  active: boolean
  selected: "technical" | "soft"
  confirmed: boolean
}

// ── TERMINAL COLOR MARKERS ─────────────────────────
const TERM_COLORS: Record<string, string> = {
  G: "#7CFC00", // lime green
  C: "#4FC3F7", // cyan
  W: "#ECEFF1", // white
  GR: "#5C6370", // gray
  Y: "#E5C07B", // yellow
  M: "#C678DD", // magenta
}

function parseColorLine(text: string): React.ReactNode {
  const parts = text.split(/(%%(?:GR|G|C|W|Y|M|R)%%)/g)
  let color: string | undefined
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^%%(GR|G|C|W|Y|M|R)%%$/)
        if (m) {
          color = m[1] === "R" ? undefined : TERM_COLORS[m[1]]
          return null
        }
        if (!part) return null
        return color ? (
          <span key={i} style={{ color }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      })}
    </>
  )
}

// ── COMMAND OUTPUTS ─────────────────────────────────
const OUTPUTS: Record<string, string[]> = {
  whoami: [
    "%%G%%┌─────────────────────────────────────────────┐",
    "%%G%%│%%W%%  Arati Sankaliya                            %%G%%│",
    "%%G%%│%%C%%  AI Engineer · Agentic Systems Builder      %%G%%│",
    "%%G%%│%%GR%%  Power Linux User · Gujarat, India          %%G%%│",
    "%%G%%├─────────────────────────────────────────────┤",
    "%%G%%│%%W%%  I build agents that think and systems      %%G%%│",
    "%%G%%│%%W%%  that breathe. Human-first, always.         %%G%%│",
    "%%G%%│%%W%%                                             %%G%%│",
    "%%G%%│%%W%%  Currently @ %%C%%AIGyde Solutions LLP%%W%%           %%G%%│",
    "%%G%%│%%W%%  Building %%Y%%BizGyde's AI core%%W%%.                %%G%%│",
    "%%G%%└─────────────────────────────────────────────┘",
  ],

  neofetch: [
    "        .,-/+oossssoo+/-.,        %%M%%arati%%GR%%@ABS12-Bold-05Dhamu",
    "     ':+ssssssssssssssss+:'       %%GR%%───────────────────────────",
    "   -+ssssssssssssssssssyys+-      %%C%%OS      %%W%%: Heart 24.04.4 LTS x86_64",
    "  .osssssssssssssssssssdMMMy.     %%C%%Host    %%W%%: #ABS12 Bold 05Dhamu REV:1.0",
    " /ssssssssssshdmmNNmmyNMMMMh/     %%C%%Kernel  %%W%%: 6.8.0-90-not-generic",
    "+ssssssssshmydMMMMMMMNddddys+     %%C%%Uptime  %%W%%: 20 years, 5 months, 21 days",
    "/sssssssshNMMMyhhyyyyhmNMMMh/     %%C%%Packages%%W%%: Fun, Bold, Expressive",
    ".sssssssdMMMNhssssssssshNMMMd.              %%GR%%(personality pack installed)",
    "+sssshhhyNMMNyssssssssyNMMMys+    %%C%%Shell   %%W%%: zsh 5.9",
    "ossyNMMMNyMMhsssssssshmmmhsso     %%C%%Terminal%%W%%: gnome-terminal",
    "ossyNMMMNyMMhsssssssshmmmhsso     %%C%%CPU/GPU %%W%%: Brain — wired for ambition,",
    "+sssshhhyNMMNyssssssssyNMMMys+              %%w%% clocked for aims",
    ".sssssssdMMMNhssssssssshNMMMd.    %%C%%VRAM    %%W%%: No limits on what I can visualize",
    "/sssssssshNMMMyhhyyyyhmNMMMh/     %%C%%Memory  %%W%%: Holds enough dreams,",
    "+ssssssssshmydMMMMMMMNddddys+               %%w%% yet always hungry for more",
    " /ssssssssssshdmmNNmmyNMMMMh/   ",
    "  .osssssssssssssssssssdMMMy.   %%Y%%████ %%M%%████ %%C%%████ %%G%%████ %%W%%████ ████ ████ ████",
    "   -+ssssssssssssssssssyys+-   ",
    "     ':+ssssssssssssssss+:'   ",
    "        .,-/+oossssoo+/-.,   ",
  ],

  "ls projects/": [
    "%%GR%%drwxr-xr-x  %%C%%digital-twin/%%W%%           \x1b[complete\x1b[  ● live",
    "%%GR%%drwxr-xr-x  %%C%%msme-underwriting-agent/%%W%% \x1b[building\x1b[  ◌ in progress",
    "%%GR%%drwxr-xr-x  %%C%%macOS-transformation/%%W%%   \x1b[complete\x1b[  ● live",
    "%%GR%%drwxr-xr-x  %%C%%linux-optimization/%%W%%     \x1b[complete\x1b[  ● live",
    "",
    "%%GR%%4 directories  |  %%W%%type: cat <project-name>  to explore",
  ],

  "cat digital-twin": [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  File: digital-twin/README.md",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%W%%  # Digital Twin — An AI version of me",
    "",
    "  Built with LangChain, ChromaDB, GPT-4o-mini,",
    "  DuckDuckGoSearch, and Streamlit.",
    "",
    "  Ask it anything. It answers like I would.",
    "  RAG-powered. Agentic. Surprisingly human.",
    "",
    "%%C%%  Stack:%%W%% LangChain · ChromaDB · OpenAI · Streamlit",
    "%%C%%  Status:%%G%% ● Live",
    "",
    "%%C%%  → %%G%%https://arati-digital-twin-agentic-rag.streamlit.app",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  "cat msme-underwriting-agent": [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  File: msme-underwriting-agent/README.md",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%W%%  # MSME Loan Underwriting Agent",
    "",
    "  Agentic loan underwriting for small businesses.",
    "  Making finance less terrifying for the people",
    "  who need it most.",
    "",
    "%%C%%  Stack:%%W%% LangGraph · FastAPI · Python",
    "%%C%%  Status:%%Y%% ◌ Currently building...",
    "",
    "  'The most important things are never easy.'",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  "cat macos-transformation": [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  File: macOS-transformation/README.md",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%W%%  # macOS Transformation — Ubuntu Edition",
    "",
    "  Turned Ubuntu 24.04 into a macOS-inspired",
    "  developer environment. WhiteSur theme, GNOME",
    "  tweaks, custom dock, Apple cursor.",
    "",
    "  Because your environment shapes your thinking.",
    "",
    "%%C%%  Stack:%%W%% Linux · GNOME 46 · dotfiles · Shell",
    "%%C%%  Status:%%G%% ● Live — daily driver",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  "cat linux-optimization": [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  File: linux-optimization/README.md",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%W%%  # Linux Optimization — Terminal as Philosophy",
    "",
    "  zsh + starship prompt + bat + exa + fd + rg.",
    "  Every command replaced with something better.",
    "  TimeShift backups. Dotfiles backed to GitHub.",
    "",
    "  'Nothing is impossible when you master",
    "   the Terminal.' — mindset.txt",
    "",
    "%%C%%  Stack:%%W%% zsh · starship · GRUB(Bootloader) · systemd",
    "%%C%%  Status:%%G%% ● Live — always evolving",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  internship: [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  Role%%W%%    : AI Engineer Intern",
    "%%C%%  Company%%W%% : %%Y%%AIGyde Solutions LLP",
    "%%C%%  Period%%W%%  : 2025 — present",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "  Currently evaluating BizGyde's AI workflows —",
    "  testing context awareness, founder interactions,",
    "  and giving product-level feedback on response",
    "  quality and founder experience.",
    "",
    "  Also researching founder pain points through",
    "  podcasts and market analysis — identifying",
    "  better question flows, Red Team workflows,",
    "  and mini-tool ideas to make BizGyde more",
    "  practical and sellable.",
    "",
    "  BizGyde: AI-powered startup advisor platform.",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  contact: [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  # reach arati",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%C%%  GitHub%%W%%   → %%G%%github.com/AratiSankaliya12",
    "%%C%%  LinkedIn%%W%% → %%G%%linkedin.com/in/aratisankaliya",
    "%%C%%  Email%%W%%    → %%G%%aratisankaliya12@gmail.com",
    "",
    "%%W%%  Response time: usually within 24 hours.",
    "%%W%%  Preferred: email for work, LinkedIn for hello.",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  "cat arati.txt": [
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "%%C%%  File: arati.txt",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "%%W%%  # Arati Sankaliya",
    "%%W%%  # Me Beyond My Resume",
    "%%G%%  ─────────────────────────────────────────",
    "%%M%%  ## The actual me",
    "",
    "  I sing. Genuinely well.",
    "",
    "  I journal. Every thought that feels too",
    "  big for my head ends up on paper.",
    "  Writing is how I process the world.",
    "",
    "  I can walk up to a stranger and have",
    "  a conversation they'll remember.",
    "  People say I'm a pure soul.",
    "  I'm starting to believe them.",
    "",
    "%%G%%  ─────────────────────────────────────────",
    "%%M%%  ## How I actually think",
    "",
    "  I find something good in everything.",
    "  Even the bad things. Especially those.",
    "",
    "  I read people the way developers read",
    "  stack traces — carefully, without judgment,",
    "  looking for the root cause, not the error.",
    "",
    "  I believe my Guru,",
    "  His Holiness Mahant Swami Maharaj,",
    "  walks with me in everything I build.",
    "  That's not separate from my work.",
    "%%W%%  That's the Heart of it.",
    "",
    "%%G%%  ─────────────────────────────────────────",
    "%%M%%  ## Why this matters in my work",
    "",
    "  I don't build AI to replace humans.",
    "%%W%%  I build it to understand them better.",
    "",
    "  'Nothing is impossible when you",
    "   master the Terminal.' — mindset.txt",
    "",
    "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ],

  help: [
    "%%G%%┌─────────────────────────────────────────────┐",
    "%%G%%│%%C%%  Available commands%%W%%                         %%G%%│",
    "%%G%%├─────────────────────────────────────────────┤",
    "%%G%%│%%C%%  whoami%%W%%              who is arati           %%G%%│",
    "%%G%%│%%C%%  neofetch%%W%%            system info card       %%G%%│",
    "%%G%%│%%C%%  ls projects/%%W%%        list all projects      %%G%%│",
    "%%G%%│%%C%%  cat <project>%%W%%       explore a project      %%G%%│",
    "%%G%%│%%C%%  skills%%W%%              choose your loadout    %%G%%│",
    "%%G%%│%%C%%  bat resume.pdf%%W%%      view + download resume %%G%%│",
    "%%G%%│%%C%%  internship%%W%%          current role           %%G%%│",
    "%%G%%│%%C%%  cat arati.txt%%W%%       me beyond my resume    %%G%%│",
    "%%G%%│%%C%%  contact%%W%%             reach me               %%G%%│",
    "%%G%%│%%C%%  clear%%W%%               clear terminal         %%G%%│",
    "%%G%%│%%C%%  exit%%W%%                close terminal         %%G%%│",
    "%%G%%└─────────────────────────────────────────────┘",
    "",
    "  %%GR%%hint: some commands have secrets inside them.",
  ],
}

const TECHNICAL_SKILLS = [
  "%%C%%Languages%%W%%   : Python · SQL · Bash",
  "%%C%%AI/ML%%W%%       : LangChain · LangGraph · RAG · GPT-4o",
  "%%W%%             ChromaDB · Streamlit · Hugging Face",
  "%%C%%ML Stack%%W%%    : PyTorch · scikit-learn · pandas · numpy",
  "%%C%%Backend%%W%%     : FastAPI · REST APIs",
  "%%C%%Linux%%W%%       : Ubuntu · zsh · dotfiles · GNOME",
  "%%C%%Tools%%W%%       : Git · VSCode",
  "%%C%%Learning%%W%%    : Docker · AWS · MCP · DL/NLP",
]

const SOFT_SKILLS = [
  "%%C%%Communication%%W%%   : Clear, warm, memorable",
  "%%C%%Research%%W%%        : Deep-dive, podcast analysis,",
  "%%W%%                  market mapping",
  "%%C%%People reading%%W%%  : Understand humans like stack traces",
  "%%C%%Writing%%W%%         : Journaling, thoughtful expression",
  "%%C%%Conversations%%W%%   : Can befriend a stranger in 5 min",
  "%%C%%Core%%W%%            : Human-first. Always.",
]

const BAT_RESUME = [
  "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "%%C%%  File: resume.pdf%%GR%%                    [bat v0.24]",
  "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "%%GR%%   1%%G%% │ %%W%%Arati Sankaliya",
  "%%GR%%   2%%G%% │ %%W%%AI Engineer · Gujarat, India",
  "%%GR%%   3%%G%% │ %%W%%aratisankaliya12@gmail.com",
  "%%GR%%   4%%G%% │",
  "%%GR%%   5%%G%% │ %%C%%EXPERIENCE",
  "%%GR%%   6%%G%% │ %%GR%%─────────────────────────────────────",
  "%%GR%%   7%%G%% │ %%W%%AI Engineer Intern @ AIGyde Solutions",
  "%%GR%%   8%%G%% │ %%Y%%2026 — present",
  "%%GR%%   9%%G%% │ %%W%%BizGyde AI evaluation, product feedback,",
  "%%GR%%  10%%G%% │ %%W%%founder pain point research, Red Teaming",
  "%%GR%%  11%%G%% │",
  "%%GR%%  12%%G%% │ %%C%%PROJECTS",
  "%%GR%%  13%%G%% │ %%GR%%─────────────────────────────────────",
  "%%GR%%  14%%G%% │ %%W%%Digital Twin — LangChain + RAG + GPT-4o",
  "%%GR%%  15%%G%% │ %%W%%MSME Underwriting Agent — LangGraph",
  "%%GR%%  16%%G%% │ %%W%%macOS Transformation — Ubuntu + GNOME",
  "%%GR%%  17%%G%% │ %%W%%Linux Optimization — zsh + dotfiles",
  "%%GR%%  18%%G%% │",
  "%%GR%%  19%%G%% │ %%C%%EDUCATION",
  "%%GR%%  20%%G%% │ %%GR%%─────────────────────────────────────",
  "%%GR%%  21%%G%% │ %%W%%B.Tech AI & Data Science",
  "%%GR%%  22%%G%% │ %%W%%ADIT, CVM University · 2023-2027",
  "",
  "%%G%%━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "",
  "%%GR%%  ↓ download the full thing?",
  "%%C%%  → %%G%%type: download resume",
]

// ── COMPONENT ──────────────────────────────────────
interface TerminalProps {
  onClose: () => void
  onSwitchToDigitalTwin: () => void
}

function Terminal({ onClose, onSwitchToDigitalTwin }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lineId, setLineId] = useState(0)
  const [booting, setBooting] = useState(true)
  const [bootStep, setBootStep] = useState(0)
  const [skillsMenu, setSkillsMenu] = useState<SkillsMenuState>({
    active: false,
    selected: "technical",
    confirmed: false,
  })
  const [exitStep, setExitStep] = useState<"none" | "prompt" | "hint">("none")
  const inputRef = useRef<HTMLInputElement>(null)
  const skillsMenuJustOpened = useRef(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const nextId = () => {
    setLineId((p) => p + 1)
    return lineId
  }

  const addLines = (newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines])
  }

  // ── BOOT SEQUENCE ──
  const bootLines = [
    "  Initializing Arati OS v21.0...",
    "",
    "  %%C%% Built by Arati. Inspired by ambition. Fueled by purpose.",
    "",
    "  Welcome. Type %%G%%'help'%%R%% for available commands.",
  ]

  useEffect(() => {
    if (!booting) return
    if (bootStep < bootLines.length) {
      const timeout = setTimeout(
        () => {
          addLines([{ id: nextId(), type: "system", content: bootLines[bootStep] }])
          setBootStep((p) => p + 1)
        },
        bootStep === 0 ? 300 : 180
      )
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => {
        setBooting(false)
        inputRef.current?.focus()
      }, 400)
    }
  }, [booting, bootStep])

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines, skillsMenu])

  // focus on click
  const handleTerminalClick = () => {
    if (!booting) inputRef.current?.focus()
  }

  // ── SKILLS MENU KEYBOARD ──
  useEffect(() => {
    if (!skillsMenu.active || skillsMenu.confirmed) return
    // Mark the menu as just opened so we ignore the Enter that triggered it
    skillsMenuJustOpened.current = true
    const frameId = requestAnimationFrame(() => {
      skillsMenuJustOpened.current = false
    })
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault()
        setSkillsMenu((prev) => ({
          ...prev,
          selected: prev.selected === "technical" ? "soft" : "technical",
        }))
      }
      if (e.key === "Enter") {
        // Ignore the very Enter keypress that opened the menu
        if (skillsMenuJustOpened.current) return
        e.preventDefault()
        setSkillsMenu((prev) => ({ ...prev, confirmed: true }))
        const chosen = skillsMenu.selected
        const output = chosen === "technical" ? TECHNICAL_SKILLS : SOFT_SKILLS
        const header =
          chosen === "technical"
            ? ["", "  ── Technical Skills ──────────────────────", ""]
            : ["", "  ── Soft Skills ────────────────────────────", ""]
        addLines([{ id: nextId(), type: "output", content: [...header, ...output, ""] }])
        setTimeout(() => {
          setSkillsMenu({ active: false, selected: "technical", confirmed: false })
          inputRef.current?.focus()
        }, 100)
      }
    }
    window.addEventListener("keydown", handler)
    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("keydown", handler)
    }
  }, [skillsMenu])

  // ── COMMAND HANDLER ──
  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    setHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)

    // echo input
    addLines([{ id: nextId(), type: "input", content: cmd }])

    // exit flow
    if (cmd === "exit" || cmd === "quit") {
      setExitStep("prompt")
      addLines([
        {
          id: nextId(),
          type: "system",
          content: [
            "",
            "  Closing session...",
            "",
            "  Wait.",
            "",
            "  Before you go — curious people type one more command.",
            "  That's all I'll say.",
            "",
          ],
        },
      ])
      setTimeout(() => setExitStep("hint"), 4000)
      return
    }

    // ssh digital-twin
    if (cmd === "ssh digital-twin" || cmd === "ssh digital twin") {
      addLines([
        {
          id: nextId(),
          type: "system",
          content: [
            "",
            "  Establishing secure connection...",
            "  Authenticating with digital-twin server...",
            "  Connection established. ✓",
            "",
            "  Switching to Digital Twin mode...",
            "",
          ],
        },
      ])
      setTimeout(() => onSwitchToDigitalTwin(), 1500)
      return
    }

    // download resume
    if (cmd === "download resume") {
      addLines([
        {
          id: nextId(),
          type: "output",
          content: ["", "  Fetching resume.pdf...", "  Download started. ✓", ""],
        },
      ])
      const a = document.createElement("a")
      a.href = "/resume.pdf"
      a.download = "Arati_Sankaliya_Resume.pdf"
      a.click()
      return
    }

    // clear
    if (cmd === "clear") {
      setLines([])
      return
    }

    // skills — GRUB style
    if (cmd === "skills") {
      addLines([{ id: nextId(), type: "output", content: [""] }])
      setSkillsMenu({ active: true, selected: "technical", confirmed: false })
      return
    }

    // bat resume.pdf
    if (cmd === "bat resume.pdf" || cmd === "bat resume") {
      addLines([{ id: nextId(), type: "output", content: BAT_RESUME }])
      return
    }

    // ls
    if (cmd === "ls" || cmd === "ls projects" || cmd === "ls projects/") {
      addLines([{ id: nextId(), type: "output", content: OUTPUTS["ls projects/"] }])
      return
    }

    // known commands
    if (OUTPUTS[cmd]) {
      addLines([{ id: nextId(), type: "output", content: OUTPUTS[cmd] }])
      return
    }

    // unknown
    addLines([
      {
        id: nextId(),
        type: "error",
        content: [`  bash: ${cmd}: command not found`, `  Type 'help' to see available commands.`],
      },
    ])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (skillsMenu.active) return

    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(newIndex)
      setInput(history[newIndex] ?? "")
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setInput(newIndex === -1 ? "" : history[newIndex])
    }

    // Tab completion for ssh
    if (e.key === "Tab") {
      e.preventDefault()
      if (input.startsWith("ssh") && !input.includes("digital-twin")) {
        setInput("ssh digital-twin")
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9990] bg-[#080808]/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="w-full max-w-4xl h-[85vh] flex flex-col rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl"
        style={{ background: "#0D0D0D" }}
        onClick={handleTerminalClick}
      >
        {/* ── TITLE BAR ── */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]"
          style={{ background: "#161616" }}
        >
          {/* traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/80 transition-colors flex items-center justify-center group"
            >
              <X size={7} className="opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#FFBD2E] flex items-center justify-center group">
              <Minus size={7} className="opacity-0 group-hover:opacity-100 text-black" />
            </button>
            <button className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center group">
              <Maximize2 size={7} className="opacity-0 group-hover:opacity-100 text-black" />
            </button>
          </div>

          {/* title */}
          <div
            className="text-white/30 text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            arati@ABS12-Bold-05Dhamu — zsh
          </div>

          <div className="w-16" />
        </div>

        {/* ── TERMINAL BODY ── */}
        <div
          className="flex-1 overflow-y-auto p-5 space-y-0.5 cursor-text"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
              >
                {line.type === "input" && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[#7C3AED] font-semibold">arati</span>
                    <span className="text-white/25">~</span>
                    <span className="text-white/25">→</span>
                    <span className="text-white/80">{line.content as string}</span>
                  </div>
                )}
                {(line.type === "output" || line.type === "system") && (
                  <div
                    className={`mt-1 ${line.type === "system" ? "text-[#7CFC00]/35" : "text-[#7CFC00]/90"}`}
                  >
                    {Array.isArray(line.content) ? (
                      (line.content as string[]).map((l, i) => (
                        <div key={i} className="leading-relaxed whitespace-pre">
                          {l.includes("[complete]") ? (
                            <LineWithBadge line={l} badge="complete" />
                          ) : l.includes("[building]") ? (
                            <LineWithBadge line={l} badge="building" />
                          ) : (
                            parseColorLine(l)
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="leading-relaxed">
                        {parseColorLine(line.content as string)}
                      </div>
                    )}
                  </div>
                )}
                {line.type === "error" && (
                  <div className="mt-1 text-red-400/70">
                    {Array.isArray(line.content)
                      ? (line.content as string[]).map((l, i) => <div key={i}>{l}</div>)
                      : (line.content as string)}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── SKILLS GRUB MENU ── */}
          {skillsMenu.active && !skillsMenu.confirmed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="my-3 border border-[#7C3AED]/20 rounded-lg overflow-hidden"
              style={{ background: "#111" }}
            >
              <div className="px-4 py-2 border-b border-[#7C3AED]/10 text-white/25 text-[11px]">
                Select skill profile — ↑↓ navigate · Enter to load
              </div>
              <div className="p-3 space-y-1">
                {(["technical", "soft"] as const).map((opt) => (
                  <div
                    key={opt}
                    className={`px-3 py-2 rounded flex items-center gap-3 transition-colors ${skillsMenu.selected === opt
                        ? "bg-[#7C3AED]/20 text-[#7C3AED]"
                        : "text-white/30"
                      }`}
                  >
                    <span>{skillsMenu.selected === opt ? "►" : " "}</span>
                    <span>{opt === "technical" ? "Technical Skills" : "Soft Skills"}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── EXIT HINT ── */}
          {exitStep === "hint" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-[#7C3AED]/50"
            >
              hint: it starts with 'ssh' — try Tab
            </motion.div>
          )}

          {/* ── INPUT LINE ── */}
          {!booting && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#7C3AED] font-semibold">arati</span>
              <span className="text-white/25">~</span>
              <span className="text-white/25">→</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white/80 caret-[#7C3AED]"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem" }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                disabled={skillsMenu.active}
              />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </motion.div>
  )
}

// helper for ls output badges
function LineWithBadge({ line, badge }: { line: string; badge: "complete" | "building" }) {
  const clean = line.replace(`\x1b[${badge}\x1b[`, "")
  const beforeBadge = clean.split("●")[0].split("◌")[0]
  return (
    <span>
      {parseColorLine(beforeBadge)}
      <span className={badge === "complete" ? "text-[#7CFC00]" : "text-[#E5C07B]/80"}>
        {badge === "complete" ? "● live" : "◌ in progress"}
      </span>
    </span>
  )
}

// ── ROOT APP ────────────────────────────────────────
export default function App() {
  const [overlay, setOverlay] = useState<null | "terminal" | "digitaltwin">(null)

  const closeOverlay = () => {
    setOverlay(null)
    setTimeout(() => {
      document.getElementById("experience-selector")?.scrollIntoView({ behavior: "smooth" })
    }, 400) // wait for exit animation
  }

  return (
    <>
      {/* ── GLOBAL FX ── */}
      <Navbar />
      <CursorSparkle />
      {/* ── PORTFOLIO PAGE ── */}
      <Hero />
      <ExperienceSelector onSelect={(mode) => setOverlay(mode)} />
      <About />
      <Experience />
      <Projects />
      {/* ── OVERLAYS ── */}
      <AnimatePresence mode="sync">
        {overlay === "terminal" && (
          <Terminal
            key="terminal"
            onClose={closeOverlay}
            onSwitchToDigitalTwin={() => setOverlay("digitaltwin")}
          />
        )}
        {overlay === "digitaltwin" && <DigitalTwin key="digitaltwin" onBack={closeOverlay} />}
      </AnimatePresence>
    </>
  )
}
