import { STEP_ORDER } from '../data/stepConfig'

const PROVIDER_LABELS = {
  claude: { name: 'Claude', color: 'bg-amber-600' },
  chatgpt: { name: 'ChatGPT', color: 'bg-emerald-600' },
  gemini: { name: 'Gemini', color: 'bg-blue-600' },
}

export default function TopBar({ appState, onMenuClick }) {
  const { runMeta, steps } = appState
  const totalSteps = STEP_ORDER.length
  const completedSteps = STEP_ORDER.filter(id => steps[id]?.status === 'complete').length
  const progressPct = Math.round((completedSteps / totalSteps) * 100)
  const provider = PROVIDER_LABELS[runMeta.aiProvider] || PROVIDER_LABELS.claude

  return (
    <header className="h-12 bg-white border-b border-dta-dark/10 flex items-center px-4 gap-3 flex-shrink-0">
      {/* Mobile menu button */}
      <button onClick={onMenuClick} className="md:hidden p-1 text-dta-dark/60 hover:text-dta-dark">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Run Name */}
      <span className="text-sm font-semibold text-dta-dark truncate min-w-0">
        {runMeta.nicheName || 'New Run'}
      </span>

      {/* AI Provider Badge */}
      <span className={`${provider.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0`}>
        {provider.name}
      </span>

      {/* Product Folder */}
      {runMeta.productFolderPath && (
        <span className="text-xs text-dta-dark/50 truncate hidden lg:block" title={runMeta.productFolderPath}>
          <svg className="w-3 h-3 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          {runMeta.productFolderPath}
        </span>
      )}

      <div className="flex-1" />

      {/* Progress */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-20 sm:w-24 h-1.5 bg-dta-dark/10 rounded-full overflow-hidden">
          <div className="h-full bg-dta-green rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="text-xs font-mono text-dta-dark/60">{progressPct}%</span>
      </div>
    </header>
  )
}
