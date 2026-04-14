/**
 * Reusable shell for Phase B prompt-copy-paste-save steps.
 * Used by Steps 5a-5e, 6a, 6b to avoid duplicating the workflow UI.
 */
import { useState } from 'react'
import PromptDisplay from './PromptDisplay'
import SaveToFolderButton from './SaveToFolderButton'
import SavePopup from './SavePopup'
import { saveAiOutput, completeStep, markSavedToFolder } from '../utils/storage'
import { saveToFolder } from '../utils/folderManager'

const PROVIDER_NAME = { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini' }

export default function CreativeStepShell({
  stepId,
  nextStepId,
  description,
  prompt,
  pasteLabel,
  saveSubfolder,
  saveFilename,
  appState,
  onStateChange,
  children,
}) {
  const stepState = appState.steps[stepId] || {}
  const isComplete = stepState.status === 'complete'
  const providerName = PROVIDER_NAME[appState.runMeta.aiProvider] || 'your AI tool'

  const [pasteValue, setPasteValue] = useState(stepState.aiOutput || '')
  const [showSavePopup, setShowSavePopup] = useState(false)
  const [responseSaved, setResponseSaved] = useState(!!stepState.aiOutput)

  function handleSaveResponse() {
    onStateChange(saveAiOutput(appState, stepId, pasteValue))
    setResponseSaved(true)
  }

  function handleComplete() {
    onStateChange(completeStep(appState, stepId, nextStepId))
  }

  async function confirmSaveToFolder() {
    await saveToFolder(null, saveSubfolder, saveFilename, pasteValue)
    onStateChange(markSavedToFolder(appState, stepId, saveFilename))
    setShowSavePopup(false)
  }

  return (
    <div className="p-5 space-y-5">
      <p className="text-sm text-dta-dark/70">{description}</p>

      {/* Extra content slot (e.g. provider-specific notes) */}
      {children}

      {/* Generated Prompt */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">Generated Prompt</h3>
        <PromptDisplay prompt={prompt} />
        <p className="text-xs text-dta-dark/40 mt-1.5">
          Copy this prompt into {providerName}, run it, and paste the result below.
        </p>
      </div>

      {/* Paste AI Response */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">
          {pasteLabel || 'Paste AI Response'}
        </h3>
        <textarea
          className={`w-full h-56 p-3 text-sm border border-dta-dark/20 rounded-lg bg-white resize-y focus:outline-none focus:ring-2 focus:ring-dta-green/50 font-mono ${
            isComplete ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          placeholder="Paste AI output here..."
          value={pasteValue}
          onChange={(e) => { setPasteValue(e.target.value); setResponseSaved(false) }}
          disabled={isComplete}
        />
      </div>

      {/* Save Response */}
      {!isComplete && !responseSaved && (
        <button
          onClick={handleSaveResponse}
          disabled={!pasteValue.trim()}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            pasteValue.trim() ? 'bg-dta-dark text-white hover:bg-dta-dark/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save AI Response
        </button>
      )}

      {/* Save to Product Folder */}
      {responseSaved && saveSubfolder && (
        <SaveToFolderButton
          onClick={() => setShowSavePopup(true)}
          saved={stepState.savedToFolder}
          filename={saveFilename}
        />
      )}

      {/* Mark Complete */}
      {!isComplete && responseSaved && (
        <button
          onClick={handleComplete}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-dta-orange text-white hover:bg-dta-orange/90 transition-colors"
        >
          Mark Complete & Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-sm text-dta-green font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Step complete
        </div>
      )}

      {showSavePopup && (
        <SavePopup
          filename={saveFilename}
          subfolder={saveSubfolder}
          content={pasteValue}
          onConfirm={confirmSaveToFolder}
          onCancel={() => setShowSavePopup(false)}
        />
      )}
    </div>
  )
}
