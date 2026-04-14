import { useState } from 'react'

export default function PromptDisplay({ prompt }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const ta = document.createElement('textarea')
      ta.value = prompt
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!prompt) return null

  return (
    <div className="relative">
      <pre className="bg-dta-dark text-dta-light text-sm p-4 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-64 overflow-y-auto">
        {prompt}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2.5 py-1 text-xs font-medium rounded bg-dta-orange text-white hover:bg-dta-orange/80 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}
