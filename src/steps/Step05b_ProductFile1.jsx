import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import { getProviderMods } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'

const PROVIDER_NOTES = {
  claude: 'Claude will generate the file directly using its tools. Save the output file to your Product Folder.',
  chatgpt: 'ChatGPT will create the file and provide a download link. Download the file and save to your Product Folder.',
  gemini: 'Gemini will create the document in Google Sheets/Docs. Download or copy to your Product Folder.',
}

export default function Step05b_ProductFile1({ appState, onStateChange }) {
  const provider = appState.runMeta.aiProvider
  const mods = getProviderMods(provider)
  const rawPrompt = buildPrompt(promptTemplates['5b'], appState)
  const brandLine = appState.runMeta.brandKitName ? `\n${mods.brandRef(appState.runMeta.brandKitName, appState.runMeta.brandKitId)}` : ''
  const prompt = `${rawPrompt}${brandLine}\n\n${mods.fileInstruction}\n${mods.spreadsheetFormat}\n${mods.outputFormat}`

  return (
    <CreativeStepShell
      stepId="5b"
      nextStepId="5c"
      description="Create the primary product file. This prompt instructs the AI to generate the ACTUAL file content — complete spreadsheets with formulas, full PDF page copy, or finished documents — not a description."
      prompt={prompt}
      pasteLabel="Paste confirmation or file reference"
      saveSubfolder="03-products"
      saveFilename="product-file-1.md"
      appState={appState}
      onStateChange={onStateChange}
    >
      <div className="p-3 bg-dta-orange/10 border border-dta-orange/20 rounded-lg">
        <p className="text-xs text-dta-dark/80">
          <span className="font-semibold text-dta-orange">Provider note: </span>
          {PROVIDER_NOTES[provider]}
        </p>
      </div>
    </CreativeStepShell>
  )
}
