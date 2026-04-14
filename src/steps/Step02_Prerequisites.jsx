import { useState } from 'react'
import PromptDisplay from '../components/PromptDisplay'
import { updateRunMeta, completeStep } from '../utils/storage'
import { selectProductFolder } from '../utils/folderManager'
import promptTemplates from '../data/promptTemplates'

const PROVIDERS = [
  { id: 'claude',  name: 'Claude',  plan: 'Claude Pro ($20/mo)', desc: 'Best Canva MCP integration, strong file generation' },
  { id: 'chatgpt', name: 'ChatGPT', plan: 'ChatGPT Plus ($20/mo)', desc: 'Strong file generation, broad plugin ecosystem' },
  { id: 'gemini',  name: 'Gemini',  plan: 'Gemini Advanced ($20/mo)', desc: 'Google Workspace integration, Sheets/Docs native' },
]

export default function Step02_Prerequisites({ appState, onStateChange }) {
  const { runMeta } = appState
  const stepState = appState.steps['2'] || {}
  const isComplete = stepState.status === 'complete'
  const [folderCreating, setFolderCreating] = useState(false)

  function setProvider(id) {
    if (isComplete) return
    onStateChange(updateRunMeta(appState, { aiProvider: id }))
  }

  function toggleCanva() {
    if (isComplete) return
    onStateChange(updateRunMeta(appState, { canvaConnected: !runMeta.canvaConnected }))
  }

  function setBrandKit(field, value) {
    if (isComplete) return
    onStateChange(updateRunMeta(appState, { [field]: value }))
  }

  async function handleCreateFolder() {
    setFolderCreating(true)
    try {
      const result = await selectProductFolder(runMeta.nicheName)
      if (result.path) {
        onStateChange(updateRunMeta(appState, {
          productFolderPath: result.path,
          startedAt: runMeta.startedAt || new Date().toISOString(),
        }))
      } else if (!result.supported) {
        alert('File System Access API not supported. Files will be downloaded individually.')
      }
    } catch (err) {
      console.error(err)
    }
    setFolderCreating(false)
  }

  const canComplete = runMeta.aiProvider && (runMeta.canvaConnected ? runMeta.brandKitName.trim() : true)

  return (
    <div className="p-5 space-y-6">
      <p className="text-sm text-dta-dark/70">
        Configure your tools before entering the pipeline. Select your AI provider, connect Canva, and create your Product Folder.
      </p>

      {/* AI Provider Selection */}
      <section>
        <h3 className="text-sm font-semibold text-dta-dark mb-3">AI Provider</h3>
        <div className="space-y-2">
          {PROVIDERS.map((p) => (
            <label
              key={p.id}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                runMeta.aiProvider === p.id ? 'border-dta-green bg-dta-green/5' : 'border-dta-dark/10 hover:border-dta-dark/20'
              } ${isComplete ? 'opacity-60 pointer-events-none' : ''}`}
            >
              <input type="radio" name="aiProvider" value={p.id} checked={runMeta.aiProvider === p.id}
                onChange={() => setProvider(p.id)} className="mt-1 accent-dta-green" disabled={isComplete} />
              <div>
                <span className="text-sm font-medium text-dta-dark">{p.name}</span>
                <span className="text-xs text-dta-dark/50 ml-2">{p.plan}</span>
                <p className="text-xs text-dta-dark/50 mt-0.5">{p.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Canva Connection */}
      <section>
        <h3 className="text-sm font-semibold text-dta-dark mb-3">Canva Connection</h3>
        <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
          runMeta.canvaConnected ? 'border-dta-green bg-dta-green/5' : 'border-dta-dark/10'
        } ${isComplete ? 'opacity-60 pointer-events-none' : ''}`}>
          <input type="checkbox" checked={runMeta.canvaConnected} onChange={toggleCanva}
            className="accent-dta-green w-4 h-4" disabled={isComplete} />
          <span className="text-sm text-dta-dark">
            I have connected my Canva Pro account to {PROVIDERS.find(p => p.id === runMeta.aiProvider)?.name}
          </span>
        </label>
      </section>

      {/* Brand Kit Validation */}
      {runMeta.canvaConnected && (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-dta-dark">Brand Kit Validation</h3>
          <p className="text-xs text-dta-dark/50">
            Copy this prompt into your AI tool to list your Canva Brand Kits, then record the name and ID below.
          </p>
          <PromptDisplay prompt={promptTemplates['2']} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-dta-dark mb-1">Brand Kit Name *</label>
              <input type="text" className="w-full p-2.5 text-sm border border-dta-dark/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-dta-green/50"
                placeholder="e.g., DTA Brand Kit 2026" value={runMeta.brandKitName}
                onChange={(e) => setBrandKit('brandKitName', e.target.value)} disabled={isComplete} />
            </div>
            <div>
              <label className="block text-xs font-medium text-dta-dark mb-1">Brand Kit ID <span className="text-dta-dark/30">(optional)</span></label>
              <input type="text" className="w-full p-2.5 text-sm border border-dta-dark/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-dta-green/50"
                placeholder="e.g., kAHAkfNk0vI" value={runMeta.brandKitId}
                onChange={(e) => setBrandKit('brandKitId', e.target.value)} disabled={isComplete} />
            </div>
          </div>
        </section>
      )}

      {/* Product Folder */}
      <section>
        <h3 className="text-sm font-semibold text-dta-dark mb-3">Product Folder</h3>
        {runMeta.productFolderPath ? (
          <div className="flex items-center gap-2 p-3 bg-dta-green/5 border border-dta-green/20 rounded-lg">
            <svg className="w-5 h-5 text-dta-green flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-dta-dark">Folder created</p>
              <p className="text-xs text-dta-dark/50 font-mono">{runMeta.productFolderPath}</p>
            </div>
          </div>
        ) : (
          <button onClick={handleCreateFolder} disabled={folderCreating || isComplete}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-dta-dark text-white rounded-lg hover:bg-dta-dark/90 transition-colors disabled:opacity-50">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            {folderCreating ? 'Selecting...' : 'Create Product Folder'}
          </button>
        )}
      </section>

      {/* Complete */}
      {!isComplete ? (
        <button onClick={() => canComplete && onStateChange(completeStep(appState, '2', '3'))}
          disabled={!canComplete}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
            canComplete ? 'bg-dta-orange text-white hover:bg-dta-orange/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
          Mark Complete & Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      ) : (
        <div className="flex items-center gap-2 text-sm text-dta-green font-medium">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Step complete
        </div>
      )}
    </div>
  )
}
