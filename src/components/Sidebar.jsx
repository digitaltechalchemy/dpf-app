import { PHASES, STEPS, STEP_ORDER } from '../data/stepConfig'

const STATUS_ICONS = {
  locked: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
  available: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  in_progress: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14V5z" />
    </svg>
  ),
  complete: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
}

const STATUS_COLORS = {
  locked: 'text-gray-500',
  available: 'text-dta-ivory',
  in_progress: 'text-dta-orange',
  complete: 'text-dta-green',
}

const PHASE_COLORS = { 'dta-green': 'border-dta-green', 'dta-orange': 'border-dta-orange', 'dta-dark': 'border-dta-dark' }
const PHASE_BG = { 'dta-green': 'bg-dta-green/20', 'dta-orange': 'bg-dta-orange/20', 'dta-dark': 'bg-dta-dark/20' }

export default function Sidebar({ appState, onStepSelect, onReset, onNewRun }) {
  const currentStep = appState.currentStep

  function getStepStatus(stepId) {
    return appState.steps[stepId]?.status || 'locked'
  }

  function handleClick(stepId) {
    const status = getStepStatus(stepId)
    if (status !== 'locked') onStepSelect(stepId)
  }

  const completedSteps = STEP_ORDER.filter(id => appState.steps[id]?.status === 'complete').length
  const pct = Math.round((completedSteps / STEP_ORDER.length) * 100)

  return (
    <aside className="w-[260px] min-w-[260px] bg-dta-dark text-white h-screen flex-col overflow-hidden hidden md:flex">
      {/* Brand */}
      <div className="p-4 border-b border-white/10">
        <h1 className="text-lg font-bold tracking-tight">
          <span className="text-dta-orange">DPF</span>{' '}
          <span className="text-dta-light text-sm font-normal">v2.0</span>
        </h1>
        <p className="text-xs text-white/50 mt-0.5">Digital Product Factory</p>
        {/* Mini progress */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-dta-green rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] text-white/40 font-mono">{pct}%</span>
        </div>
      </div>

      {/* Step List */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll py-2">
        {Object.entries(PHASES).map(([phaseKey, phase]) => (
          <div key={phaseKey} className="mb-1">
            <div className={`px-4 py-2 flex items-center gap-2 ${PHASE_BG[phase.color]}`}>
              <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center border ${PHASE_COLORS[phase.color]} text-white`}>
                {phaseKey}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/70">{phase.name}</span>
            </div>
            {phase.steps.map((stepId) => {
              const step = STEPS[stepId]
              const status = getStepStatus(stepId)
              const isActive = currentStep === stepId
              const isClickable = status !== 'locked'
              return (
                <button key={stepId} onClick={() => handleClick(stepId)} disabled={!isClickable}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2.5 text-sm transition-colors
                    ${isActive ? 'bg-white/10 border-r-2 border-dta-orange' : ''}
                    ${isClickable ? 'hover:bg-white/5 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}>
                  <span className={`flex-shrink-0 ${STATUS_COLORS[status]}`}>{STATUS_ICONS[status]}</span>
                  <span className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-white/40 text-xs font-mono flex-shrink-0">{stepId}</span>
                    <span className={`truncate ${isActive ? 'text-white font-medium' : 'text-white/80'}`}>{step.title}</span>
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <button onClick={() => { if (confirm('Start a new run? Current progress will be archived in localStorage.')) onNewRun() }}
          className="w-full text-xs text-white/50 hover:text-dta-light transition-colors py-1">
          New Run
        </button>
        <button onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) onReset() }}
          className="w-full text-xs text-white/30 hover:text-dta-orange transition-colors py-1">
          Reset Run
        </button>
      </div>
    </aside>
  )
}
