export default function StepComplete({ onComplete, disabled, label }) {
  return (
    <button
      onClick={onComplete}
      disabled={disabled}
      className={`
        flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors
        ${disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-dta-orange text-white hover:bg-dta-orange/90 cursor-pointer'}
      `}
    >
      {label || 'Mark Complete & Next'}
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  )
}
