import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import { getProviderMods } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'

export default function Step05c_ProductFile2({ appState, onStateChange }) {
  const mods = getProviderMods(appState.runMeta.aiProvider)
  const rawPrompt = buildPrompt(promptTemplates['5c'], appState)
  const brandLine = appState.runMeta.brandKitName ? `\n${mods.brandRef(appState.runMeta.brandKitName, appState.runMeta.brandKitId)}` : ''
  const prompt = `${rawPrompt}${brandLine}\n\n${mods.fileInstruction}\n${mods.pdfGeneration}\n${mods.outputFormat}`

  return (
    <CreativeStepShell
      stepId="5c"
      nextStepId="5d"
      description="Create the second product file (e.g., PDF guide, secondary document). The AI generates the complete file content with all pages, sections, and formatting."
      prompt={prompt}
      pasteLabel="Paste confirmation or file reference"
      saveSubfolder="03-products"
      saveFilename="product-file-2.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
