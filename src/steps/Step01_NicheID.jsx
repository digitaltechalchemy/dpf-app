import { useState, useRef } from 'react'
import { completeStep } from '../utils/storage'

export default function Step01_NicheID({ appState, onStateChange }) {
  const stepState = appState.steps['1'] || {}
  const inputs = stepState.inputs || {}
  const debounceRef = useRef(null)

  const [form, setForm] = useState({
    sellerIdentity: inputs.sellerIdentity || '',
    customerHypothesis: inputs.customerHypothesis || '',
    nicheKeywords: inputs.nicheKeywords || '',
    productType: inputs.productType || '',
  })

  function updateField(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const newState = {
        ...appState,
        steps: {
          ...appState.steps,
          '1': { ...stepState, inputs: next, status: stepState.status === 'available' ? 'in_progress' : stepState.status },
        },
        runMeta: {
          ...appState.runMeta,
          nicheName: next.nicheKeywords?.split(',')[0]?.trim() || appState.runMeta.nicheName,
        },
      }
      onStateChange(newState)
    }, 500)
  }

  const allFilled = form.sellerIdentity.trim() && form.customerHypothesis.trim() &&
                    form.nicheKeywords.trim() && form.productType.trim()
  const isComplete = stepState.status === 'complete'

  function handleComplete() {
    if (!allFilled) return
    onStateChange(completeStep(appState, '1', '2'))
  }

  return (
    <div className="p-5 space-y-5">
      <p className="text-sm text-dta-dark/70">
        Define your niche, target customer, and product idea. All fields are required before advancing.
      </p>

      <Field
        label="Seller Identity"
        hint="Who you are, your expertise, your brand"
        value={form.sellerIdentity}
        onChange={(v) => updateField('sellerIdentity', v)}
        disabled={isComplete}
        placeholder="e.g., I'm a corporate retirement coach with 15 years of HR experience..."
      />
      <Field
        label="Customer Hypothesis"
        hint="Who your ideal buyer is, their pain points"
        value={form.customerHypothesis}
        onChange={(v) => updateField('customerHypothesis', v)}
        disabled={isComplete}
        placeholder="e.g., Recently retired corporate professionals (55-70) overwhelmed by the transition..."
      />
      <Field
        label="Niche Keywords"
        hint="3-5 seed keywords for the niche, comma-separated"
        value={form.nicheKeywords}
        onChange={(v) => updateField('nicheKeywords', v)}
        disabled={isComplete}
        placeholder="e.g., retirement planning, personal organization, life transition, digital planner"
        multiline={false}
      />
      <Field
        label="Product Type Hypothesis"
        hint="Initial product format idea"
        value={form.productType}
        onChange={(v) => updateField('productType', v)}
        disabled={isComplete}
        placeholder="e.g., Digital planner bundle with spreadsheet tracker + PDF guide"
        multiline={false}
      />

      {!isComplete ? (
        <button
          onClick={handleComplete}
          disabled={!allFilled}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
            allFilled ? 'bg-dta-orange text-white hover:bg-dta-orange/90' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Mark Complete & Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      ) : (
        <CompleteBadge text="Step complete" />
      )}
    </div>
  )
}

function Field({ label, hint, value, onChange, disabled, placeholder, multiline = true }) {
  const Tag = multiline ? 'textarea' : 'input'
  return (
    <div>
      <label className="block text-sm font-semibold text-dta-dark mb-1">{label}</label>
      {hint && <p className="text-xs text-dta-dark/50 mb-1.5">{hint}</p>}
      <Tag
        className={`w-full p-3 text-sm border border-dta-dark/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-dta-green/50 focus:border-dta-green ${
          multiline ? 'resize-y h-24' : 'h-10'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  )
}

function CompleteBadge({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-dta-green font-medium">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
      {text}
    </div>
  )
}
