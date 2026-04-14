export default function SavePopup({ filename, subfolder, content, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        <div className="p-5 border-b border-dta-dark/10">
          <h3 className="text-base font-bold text-dta-dark">Save to Product Folder</h3>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-dta-dark/50">Folder:</span>
            <span className="font-mono text-dta-dark">{subfolder}/</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-dta-dark/50">File:</span>
            <span className="font-mono text-dta-dark">{filename}</span>
          </div>
          <div>
            <span className="text-xs text-dta-dark/50">Preview:</span>
            <pre className="mt-1 bg-dta-ivory p-3 rounded text-xs font-mono max-h-40 overflow-y-auto text-dta-dark/70 whitespace-pre-wrap">
              {content?.slice(0, 500)}{content?.length > 500 ? '...' : ''}
            </pre>
          </div>
        </div>

        <div className="p-5 border-t border-dta-dark/10 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-dta-dark/60 hover:text-dta-dark"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-dta-green text-white rounded-lg hover:bg-dta-green/90"
          >
            Save File
          </button>
        </div>
      </div>
    </div>
  )
}
