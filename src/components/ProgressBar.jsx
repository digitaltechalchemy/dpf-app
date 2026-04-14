import { STEP_ORDER } from '../data/stepConfig'

export default function ProgressBar({ appState }) {
  const total = STEP_ORDER.length
  const completed = STEP_ORDER.filter(id => appState.steps[id]?.status === 'complete').length
  const pct = Math.round((completed / total) * 100)

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-dta-dark/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-dta-green rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-dta-dark/60 min-w-[3ch] text-right">{pct}%</span>
    </div>
  )
}
