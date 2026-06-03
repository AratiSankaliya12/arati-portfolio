export const portfolioData = {
  name: "Arati Sankaliya",
  tagline:
    "I engineer agents, configure systems, and once built a version of myself.",
  typewriterPhrases: [
    "I build AI that feels human.",
    "Systems that think. Interfaces that breathe.",
    "Engineering with logic. Building with heart.",
  ],
  experienceSelectorCopy: {
    line1: "This isn't just a portfolio.",
    line2: "It's an interactive version of my mind.",
    line3: "How do you want to explore it?",
  },
  neofetch: {
    user: "arati",
    hostname: "ABS12-Bold-05Dhamu",
    os: "Heart 24.04.4 LTS x86_64",
    host: "#ABS12 Bold 05Dhamu REV:1.0",
    kernel: "6.8.0-90-not-generic",
    uptime: "20 years, 5 months, 22 days",
    packages: "Fun, Bold, Expressive (personality pack installed)",
    shell: "zsh 5.9",
    terminal: "gnome-terminal",
    cpu: "Brain — wired for ambition, clocked for aims",
    gpu: "No limits on what I can visualize",
    memory: "Holds enough dreams, yet always hungry for more",
  },
  projects: [
    {
      id: "digital-twin",
      name: "digital-twin",
      status: "complete",
      description:
        "An AI version of me. Built with LangChain, RAG, GPT-4o-mini. Ask it anything.",
      tech: ["LangChain", "ChromaDB", "OpenAI", "Streamlit"],
      link: "https://github.com/AratiSankaliya12/digital-twin-agentic-rag",
    },
    {
      id: "msme-underwriting-agent",
      name: "msme-underwriting-agent",
      status: "building",
      description:
        "Agentic loan underwriting for small businesses. Making finance less terrifying.",
      tech: ["LangGraph", "FastAPI", "Python"],
      link: "https://github.com/AratiSankaliya12/msme-underwriting-agent",
    },
    {
      id: "macos-transformation",
      name: "macOS-transformation",
      status: "complete",
      description:
        "Turned Ubuntu into a macOS-inspired dev environment. Dotfiles, themes, the works.",
      tech: ["Linux", "GNOME", "dotfiles", "Shell"],
      link: "https://github.com/AratiSankaliya12/macos-transformation",
    },
    {
      id: "linux-optimization",
      name: "linux-optimization",
      status: "complete",
      description:
        "Performance tuning, zsh config, custom prompt. Terminal as a philosophy.",
      tech: ["zsh", "starship", "boot-loader", "systemd"],
      link: "https://github.com/AratiSankaliya12/macos-inspired-linux-dev-environment",
    },
  ],
  internship: {
    role: "AI Engineer Intern",
    company: "AIGyde Solutions LLP",
    period: "2026 — present",
    work: "Evaluating and building on BizGyde — an AI-powered startup advisor. Research, product analysis, and agentic feature development.",
  },
  contact: {
    email: "aratisankaliya12@email.com",
    github: "https://github.com/AratiSankaliya12",
    linkedin: "https://www.linkedin.com/in/aratisankaliya/",
  },
  terminal: {
    user: "arati",
    hostname: "ABS12-Bold-05Dhamu",
    motd: "Built by Arati. Inspired by ambition. Fueled by purpose.",
  },
} as const;
