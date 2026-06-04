import { useState, useEffect } from "react"

interface TypeWriterProps {
  phrases: string[]
  speed?: number
  pause?: number
}

export default function TypeWriter({ phrases, speed = 50, pause = 2000 }: TypeWriterProps) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // typing
          setCurrentText(currentPhrase.substring(0, currentText.length + 1))

          if (currentText === currentPhrase) {
            // finished typing — pause then delete
            setTimeout(() => setIsDeleting(true), pause)
          }
        } else {
          // deleting
          setCurrentText(currentPhrase.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentPhraseIndex, phrases, speed, pause])

  return (
    <span className="font-mono text-[#FFFFFF]">
      {currentText}
      <span className="animate-pulse">▌</span>
    </span>
  )
}
