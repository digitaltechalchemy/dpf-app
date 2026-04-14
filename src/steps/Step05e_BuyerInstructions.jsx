import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import { getProviderMods } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'

export default function Step05e_BuyerInstructions({ appState, onStateChange }) {
  const mods = getProviderMods(appState.runMeta.aiProvider)
  const rawPrompt = buildPrompt(promptTemplates['5e'], appState)
  const prompt = `${rawPrompt}\n\n${mods.fileInstruction}\n${mods.pdfGeneration}\n${mods.outputFormat}`

  return (
    <CreativeStepShell
      stepId="5e"
      nextStepId="6a"
      description="Generate the complete READ_ME_FIRST buyer instructions document. This is the full finished document copy — not an outline or brief. Buyers see this after purchase."
      prompt={prompt}
      pasteLabel="Paste buyer instructions content"
      saveSubfolder="04-buyer-instructions"
      saveFilename="buyer-instructions.md"
      appState={appState}
      onStateChange={onStateChange}
    />
  )
}
