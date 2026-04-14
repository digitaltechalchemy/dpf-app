import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import promptTemplates from '../data/promptTemplates'

export default function Step07_SEOPackage({ appState, onStateChange }) {
  const prompt = buildPrompt(promptTemplates['7'], appState)

  return (
    <CreativeStepShell
      stepId="7"
      nextStepId="8"
      description="Generate a complete SEO package: Etsy title (140 chars max), 13 tags, full description, recommended category path, and attribute recommendations. This step reads both the PMT Research and Product Brief."
      prompt={prompt}
      pasteLabel="Paste SEO Package"
      saveSubfolder="07-seo"
      saveFilename="seo-package.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
