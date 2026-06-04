import { useState } from "react"
import Hero from "./components/hero/Hero"
import ExperienceSelector from "./components/sections/ExperienceSelector"

function App() {
  const [mode, setMode] = useState<"landing" | "terminal" | "digitaltwin">("landing")

  const handleModeSelect = (selected: "terminal" | "digitaltwin") => {
    setMode(selected)
    // we'll build the actual mode transitions next
    console.log("Selected mode:", selected)
  }

  return (
    <main className="bg-[#080808]">
      <Hero />
      <ExperienceSelector onSelect={handleModeSelect} />
    </main>
  )
}

export default App
