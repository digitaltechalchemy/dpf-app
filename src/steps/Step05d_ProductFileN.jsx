import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import { getProviderMods } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'

export default function Step05d_ProductFileN({ appState, onStateChange }) {
  const mods = getProviderMods(appState.runMeta.aiProvider)
  const rawPrompt = buildPrompt(promptTemplates['5d'], appState)
  const brandLine = appState.runMeta.brandKitName ? `\n${mods.brandRef(appState.runMeta.brandKitName, appState.runMeta.brandKitId)}` : ''
  const prompt = `${rawPrompt}${brandLine}\n\n${mods.fileInstruction}\n${mods.outputFormat}`

  return (
    <CreativeStepShell
      stepId="5d"
      nextStepId="5e"
      description="Create any remaining product files from your Build Manifest. If your product has only 2 deliverable files, paste a note confirming all files are complete and advance."
      prompt={prompt}
      pasteLabel="Paste confirmation or file reference"
      saveSubfolder="03-products"
      saveFilename="product-files-additional.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
