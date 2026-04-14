import { useState, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import StepPanel from './components/StepPanel'
import EtsyContextPanel from './components/EtsyContextPanel'
import { loadState, saveState, markStepInProgress, resetState, initState } from './utils/storage'

const ARCHIVE_PREFIX = 'dpf_run_archive_'

export default function App() {
  const [appState, setAppState] = useState(() => loadState())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleStateChange = useCallback((newState) => {
    saveState(newState)
    setAppState(newState)
  }, [])

  const handleStepSelect = useCallback((stepId) => {
    const newState = markStepInProgress(appState, stepId)
    setAppState(newState)
    setSidebarOpen(false)
  }, [appState])

  const handleReset = useCallback(() => {
    const fresh = resetState()
    setAppState(fresh)
  }, [])

  const handleNewRun = useCallback(() => {
    // Archive current state
    const ts = new Date().toISOString().replace(/[:.]/g, '-')
    const key = `${ARCHIVE_PREFIX}${appState.runMeta.nicheName || 'run'}_${ts}`
    localStorage.setItem(key, JSON.stringify(appState))
    // Start fresh
    const fresh = initState()
    setAppState(fresh)
  }, [appState])

  return (
    <div className="flex h-screen overflow-hidden bg-dta-ivory">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-[260px] h-full" onClick={e => e.stopPropagation()}>
            <Sidebar appState={appState} onStepSelect={handleStepSelect} onReset={handleReset} onNewRun={handleNewRun} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <Sidebar appState={appState} onStepSelect={handleStepSelect} onReset={handleReset} onNewRun={handleNewRun} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar appState={appState} onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex-1 flex overflow-hidden">
          {/* AI Workflow Panel (~60%) */}
          <div className="flex-1 md:flex-[3] border-r border-dta-dark/10 overflow-hidden">
            <StepPanel currentStep={appState.currentStep} appState={appState} onStateChange={handleStateChange} />
          </div>

          {/* Etsy Context Panel (~40%) — hidden on mobile */}
          <div className="hidden lg:block flex-[2] bg-white overflow-hidden">
            <EtsyContextPanel currentStep={appState.currentStep} appState={appState} />
          </div>
        </div>
      </div>
    </div>
  )
}
