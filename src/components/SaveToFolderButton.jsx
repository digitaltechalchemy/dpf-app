export default function SaveToFolderButton({ onClick, saved, filename }) {
  return (
    <button
      onClick={onClick}
      disabled={saved}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors
        ${saved
          ? 'bg-dta-green/10 text-dta-green border border-dta-green/20 cursor-default'
          : 'bg-dta-green text-white hover:bg-dta-green/90 cursor-pointer'}
      `}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      {saved ? `Saved: ${filename}` : 'Save to Product Folder'}
    </button>
  )
}
