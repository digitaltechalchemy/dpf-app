import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import { getProviderMods } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'

export default function Step05a_BuildManifest({ appState, onStateChange }) {
  const rawPrompt = buildPrompt(promptTemplates['5a'], appState)
  const mods = getProviderMods(appState.runMeta.aiProvider)
  const prompt = `${rawPrompt}\n\n${mods.fileInstruction}\n${mods.outputFormat}`

  return (
    <CreativeStepShell
      stepId="5a"
      nextStepId="5b"
      description="Generate a Build Manifest from your approved Product Brief. This manifest lists every deliverable file with format, purpose, and content summary. Each file will get its own creation step."
      prompt={prompt}
      pasteLabel="Paste Build Manifest"
      saveSubfolder="03-products"
      saveFilename="build-manifest.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
