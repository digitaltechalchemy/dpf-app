import { useState } from 'react'
import PromptDisplay from '../components/PromptDisplay'
import SaveToFolderButton from '../components/SaveToFolderButton'
import SavePopup from '../components/SavePopup'
import { saveAiOutput, completeStep, markSavedToFolder } from '../utils/storage'
import { buildPrompt } from '../utils/promptBuilder'
import { adaptPrompt } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'
import { saveToFolder } from '../utils/folderManager'

const PROVIDER_NAME = { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini' }

export default function Step03_PMTResearch({ appState, onStateChange }) {
  const stepState = appState.steps['3'] || {}
  const isComplete = stepState.status === 'complete'

  const [pasteValue, setPasteValue] = useState(stepState.aiOutput || '')
  const [showSavePopup, setShowSavePopup] = useState(false)
  const [showGate, setShowGate] = useState(!!stepState.aiOutput && !isComplete)

  const rawPrompt = buildPrompt(promptTemplates['3'], appState)
  const prompt = adaptPrompt(rawPrompt, appState.runMeta.aiProvider, appState.runMeta)

  function handleSaveResponse() {
    onStateChange(saveAiOutput(appState, '3', pasteValue))
    setShowGate(true)
  }

  function handleGo() {
    onStateChange(completeStep(appState, '3', '4'))
  }

  function handleStop() {
    const newState = {
      ...appState,
      currentStep: '1',
      steps: { ...appState.steps,
        '1': { ...appState.steps['1'], status: 'in_progress' },
        '3': { status: 'available', inputs: {}, aiOutput: null, savedToFolder: false, savedFilename: null, completedAt: null },
      },
    }
    onStateChange(newState)
  }

  async function confirmSaveToFolder() {
    await saveToFolder(null, '01-research', 'pmt-research.md', pasteValue)
    onStateChange(markSavedToFolder(appState, '3', 'pmt-research.md'))
    setShowSavePopup(false)
  }

  return (
    <div className="p-5 space-y-5">
      <p className="text-sm text-dta-dark/70">
        Copy the prompt below into {PROVIDER_NAME[appState.runMeta.aiProvider] || 'your AI tool'}. Paste the PMT Research report back, then decide whether to proceed or refine your niche.
      </p>

      {/* Generated Prompt */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">Generated Prompt</h3>
        <PromptDisplay prompt={prompt} />
        <p className="text-xs text-dta-dark/40 mt-1.5">
          Copy, run in {PROVIDER_NAME[appState.runMeta.aiProvider]}, and paste the result below.
        </p>
      </div>

      {/* Paste AI Response */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">Paste AI Response</h3>
        <textarea
          className={`w-full h-56 p-3 text-sm border border-dta-dark/20 rounded-lg bg-white resize-y focus:outline-none focus:ring-2 focus:ring-dta-green/50 font-mono ${isComplete ? 'opacity-60 cursor-not-allowed' : ''}`}
          placeholder="Paste the PMT Research report here..."
          value={pasteValue}
          onChange={(e) => setPasteValue(e.target.value)}
          disabled={isComplete}
        />
      </div>

      {/* Save Response */}
      {!isComplete && !showGate && (
        <button onClick={handleSaveResponse} disabled={!pasteValue.trim()}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            pasteValue.trim() ? 'bg-dta-dark text-white hover:bg-dta-dark/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
          Save AI Response
        </button>
      )}

      {/* Save to Folder */}
      {stepState.aiOutput && (
        <SaveToFolderButton onClick={() => setShowSavePopup(true)} saved={stepState.savedToFolder} filename="pmt-research.md" />
      )}

      {/* Go/Stop Gate */}
      {showGate && !isComplete && (
        <div className="border border-dta-dark/10 rounded-lg p-4 bg-dta-ivory">
          <h3 className="text-sm font-semibold text-dta-dark mb-2">PMT Assessment Gate</h3>
          <p className="text-xs text-dta-dark/60 mb-3">
            Review the PMT report. Does this niche show strong potential? If "Go," proceed to Product Brief. If "Stop," refine your niche in Step 1.
          </p>
          <div className="flex gap-3">
            <button onClick={handleGo}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-dta-green text-white rounded-lg hover:bg-dta-green/90">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              GO — Proceed to Product Brief
            </button>
            <button onClick={handleStop}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-dta-orange text-white rounded-lg hover:bg-dta-orange/90">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              STOP — Refine Niche
            </button>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-sm text-dta-green font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          PMT Research complete — GO decision recorded
        </div>
      )}

      {showSavePopup && (
        <SavePopup filename="pmt-research.md" subfolder="01-research" content={pasteValue}
          onConfirm={confirmSaveToFolder} onCancel={() => setShowSavePopup(false)} />
      )}
    </div>
  )
}
