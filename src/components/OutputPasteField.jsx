export default function OutputPasteField({ value, onChange, placeholder }) {
  return (
    <textarea
      className="w-full h-48 p-3 text-sm border border-dta-dark/20 rounded-lg bg-white resize-y focus:outline-none focus:ring-2 focus:ring-dta-green/50 focus:border-dta-green font-mono"
      placeholder={placeholder || 'Paste AI response here...'}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
