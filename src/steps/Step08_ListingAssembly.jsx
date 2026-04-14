import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import promptTemplates from '../data/promptTemplates'

export default function Step08_ListingAssembly({ appState, onStateChange }) {
  const prompt = buildPrompt(promptTemplates['8'], appState)

  return (
    <CreativeStepShell
      stepId="8"
      nextStepId="9"
      description="Assemble the complete Etsy listing package with all fields populated. This combines your Product Brief, SEO Package, and all generated content into one listing-ready document."
      prompt={prompt}
      pasteLabel="Paste assembled listing"
      saveSubfolder="08-listing"
      saveFilename="etsy-listing-package.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
