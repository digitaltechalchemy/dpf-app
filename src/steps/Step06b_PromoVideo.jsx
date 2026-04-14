import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import promptTemplates from '../data/promptTemplates'

export default function Step06b_PromoVideo({ appState, onStateChange }) {
  const prompt = buildPrompt(promptTemplates['6b'], appState)

  return (
    <CreativeStepShell
      stepId="6b"
      nextStepId="7"
      description="Generate a complete shot-by-shot promo video script for Etsy. The script includes exact timings, on-screen text, visual descriptions, transitions, and CapCut-specific instructions."
      prompt={prompt}
      pasteLabel="Paste video script"
      saveSubfolder="06-promo-video"
      saveFilename="video-script.md"
      appState={appState}
      onStateChange={onStateChange}
    >
      <div className="p-3 bg-dta-orange/10 border border-dta-orange/20 rounded-lg">
        <p className="text-xs text-dta-dark/80">
          <span className="font-semibold text-dta-orange">CapCut tip: </span>
          The script includes CapCut-specific instructions (text animations, zoom, pan) so you can execute it directly. Etsy recommends 5-15 second videos for autoplay.
        </p>
      </div>
    </CreativeStepShell>
  )
}
