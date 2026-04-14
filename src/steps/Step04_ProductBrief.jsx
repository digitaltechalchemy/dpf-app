import { useState } from 'react'
import PromptDisplay from '../components/PromptDisplay'
import SaveToFolderButton from '../components/SaveToFolderButton'
import SavePopup from '../components/SavePopup'
import { saveAiOutput, completeStep, markSavedToFolder } from '../utils/storage'
import { buildPrompt } from '../utils/promptBuilder'
import { adaptPrompt } from '../utils/providerAdapter'
import promptTemplates from '../data/promptTemplates'
import { saveToFolder } from '../utils/folderManager'

export default function Step04_ProductBrief({ appState, onStateChange }) {
  const stepState = appState.steps['4'] || {}
  const isComplete = stepState.status === 'complete'

  const [pasteValue, setPasteValue] = useState(stepState.aiOutput || '')
  const [showSavePopup, setShowSavePopup] = useState(false)
  const [showGate, setShowGate] = useState(!!stepState.aiOutput && !isComplete)
  const [showRevision, setShowRevision] = useState(false)
  const [revisionNotes, setRevisionNotes] = useState('')

  const rawPrompt = buildPrompt(promptTemplates['4'], appState)
  const prompt = adaptPrompt(rawPrompt, appState.runMeta.aiProvider, appState.runMeta)

  const revisionPrompt = revisionNotes.trim()
    ? `${prompt}\n\n---\nPREVIOUS BRIEF (needs revision):\n${pasteValue}\n\n---\nREVISION NOTES:\n${revisionNotes}`
    : null

  function handleSaveResponse() {
    onStateChange(saveAiOutput(appState, '4', pasteValue))
    setShowGate(true)
    setShowRevision(false)
  }

  function handleApprove() {
    onStateChange(completeStep(appState, '4', '5a'))
  }

  function handleRequestRevision() {
    setShowRevision(true)
    setShowGate(false)
  }

  async function confirmSaveToFolder() {
    await saveToFolder(null, '02-brief', 'product-brief.md', pasteValue)
    onStateChange(markSavedToFolder(appState, '4', 'product-brief.md'))
    setShowSavePopup(false)
  }

  return (
    <div className="p-5 space-y-5">
      <p className="text-sm text-dta-dark/70">
        Generate a 10-section Product Brief from your PMT Research. Review carefully — this becomes the master blueprint for all downstream steps.
      </p>

      {/* Prompt */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">
          {showRevision ? 'Revision Prompt' : 'Generated Prompt'}
        </h3>
        <PromptDisplay prompt={showRevision && revisionPrompt ? revisionPrompt : prompt} />
        <p className="text-xs text-dta-dark/40 mt-1.5">
          Copy this prompt into your AI tool, run it, and paste the Product Brief below.
        </p>
      </div>

      {/* Revision Notes */}
      {showRevision && (
        <div>
          <h3 className="text-sm font-semibold text-dta-dark mb-2">Revision Notes</h3>
          <textarea
            className="w-full h-24 p-3 text-sm border border-dta-orange/30 rounded-lg bg-dta-orange/5 resize-y focus:outline-none focus:ring-2 focus:ring-dta-orange/50"
            placeholder="What should change? e.g., 'Add a tier structure with Basic and Pro versions'..."
            value={revisionNotes}
            onChange={(e) => setRevisionNotes(e.target.value)}
          />
          <p className="text-xs text-dta-dark/40 mt-1">
            The revision prompt above includes the original brief + your notes. Copy the full prompt for a second AI pass.
          </p>
        </div>
      )}

      {/* Paste AI Response */}
      <div>
        <h3 className="text-sm font-semibold text-dta-dark mb-2">Paste AI Response</h3>
        <textarea
          className={`w-full h-56 p-3 text-sm border border-dta-dark/20 rounded-lg bg-white resize-y focus:outline-none focus:ring-2 focus:ring-dta-green/50 font-mono ${isComplete ? 'opacity-60 cursor-not-allowed' : ''}`}
          placeholder="Paste the Product Brief here..."
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
        <SaveToFolderButton onClick={() => setShowSavePopup(true)} saved={stepState.savedToFolder} filename="product-brief.md" />
      )}

      {/* Approve / Revise Gate */}
      {showGate && !isComplete && (
        <div className="border border-dta-dark/10 rounded-lg p-4 bg-dta-ivory">
          <h3 className="text-sm font-semibold text-dta-dark mb-2">Product Brief Approval</h3>
          <p className="text-xs text-dta-dark/60 mb-3">
            Review the brief carefully. Approval locks it as the source of truth for all downstream steps. Request revisions before approving if needed.
          </p>
          <div className="flex gap-3">
            <button onClick={handleApprove}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-dta-green text-white rounded-lg hover:bg-dta-green/90">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              APPROVE — Lock Brief
            </button>
            <button onClick={handleRequestRevision}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-dta-orange text-dta-orange rounded-lg hover:bg-dta-orange/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              REQUEST REVISION
            </button>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="flex items-center gap-2 text-sm text-dta-green font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Product Brief approved and locked
        </div>
      )}

      {showSavePopup && (
        <SavePopup filename="product-brief.md" subfolder="02-brief" content={pasteValue}
          onConfirm={confirmSaveToFolder} onCancel={() => setShowSavePopup(false)} />
      )}
    </div>
  )
}
