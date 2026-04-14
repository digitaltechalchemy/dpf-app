import { useState } from 'react'
import { completeStep } from '../utils/storage'

const CHECKLIST = [
  'Price confirmed (from Product Brief recommendation)',
  'Quantity set to 999 (digital products standard)',
  'Item type: Digital files (confirmed)',
  'When was it made: appropriate selection',
  'Who made it: I did (confirmed)',
  'What is it: A finished product (confirmed)',
  'Renewal option: Automatic (recommended)',
  'Shop section: assigned or created',
]

export default function Step10_PricingCheck({ appState, onStateChange }) {
  const stepState = appState.steps['10'] || {}
  const isComplete = stepState.status === 'complete'
  const [checked, setChecked] = useState(
    () => stepState.inputs?.checked || CHECKLIST.map(() => false)
  )

  function toggle(i) {
    if (isComplete) return
    const next = [...checked]
    next[i] = !next[i]
    setChecked(next)
  }

  const allChecked = checked.every(Boolean)

  function handleComplete() {
    if (!allChecked) return
    const newState = {
      ...appState,
      steps: {
        ...appState.steps,
        '10': { ...stepState, inputs: { checked } },
      },
    }
    onStateChange(completeStep(newState, '10', '11'))
  }

  return (
    <div className="p-5 space-y-5">
      <p className="text-sm text-dta-dark/70">
        Confirm all pricing and Etsy settings before publishing. Check every item below.
      </p>

      <div className="space-y-2">
        {CHECKLIST.map((item, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              checked[i] ? 'border-dta-green bg-dta-green/5' : 'border-dta-dark/10 hover:border-dta-dark/20'
            } ${isComplete ? 'opacity-70 pointer-events-none' : ''}`}
          >
            <input
              type="checkbox"
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-0.5 accent-dta-green w-4 h-4 flex-shrink-0"
              disabled={isComplete}
            />
            <span className="text-sm text-dta-dark">{item}</span>
          </label>
        ))}
      </div>

      {!isComplete ? (
        <button
          onClick={handleComplete}
          disabled={!allChecked}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
            allChecked ? 'bg-dta-orange text-white hover:bg-dta-orange/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
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
          Pricing & settings verified
        </div>
      )}
    </div>
  )
}
