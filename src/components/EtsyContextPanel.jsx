import etsyContextContent from '../data/etsyContextContent'

export default function EtsyContextPanel({ currentStep, appState }) {
  const content = etsyContextContent[currentStep]

  if (!content) {
    return (
      <div className="p-6 text-dta-dark/40 text-sm italic">
        No context available for this step.
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-dta-dark/10">
        <h2 className="text-base font-bold text-dta-dark">{content.heading}</h2>
      </div>

      {/* Etsy Fields */}
      {content.etsyFields?.length > 0 && (
        <div className="px-5 py-3 border-b border-dta-dark/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-dta-dark/50 mb-2">
            Etsy Fields This Step Produces
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {content.etsyFields.map((field) => (
              <span key={field}
                className="text-xs bg-dta-green/10 text-dta-green px-2 py-0.5 rounded-full border border-dta-green/20">
                {field}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sections (rich help text from Section 7) */}
      {content.sections?.map((section, i) => (
        <div key={i} className="px-5 py-3 border-b border-dta-dark/5 last:border-0">
          <h3 className="text-xs font-semibold text-dta-dark mb-1.5">{section.title}</h3>
          <p className="text-sm text-dta-dark/65 leading-relaxed whitespace-pre-line">{section.body}</p>
        </div>
      ))}

      {/* Tip Box */}
      {content.tip && (
        <div className="mx-5 my-4 p-3 bg-dta-orange/10 border border-dta-orange/20 rounded-lg">
          <p className="text-xs text-dta-dark/80">
            <span className="font-semibold text-dta-orange">Tip: </span>
            {content.tip}
          </p>
        </div>
      )}

      {/* Product Folder Status */}
      <ProductFolderMini appState={appState} />
    </div>
  )
}

function ProductFolderMini({ appState }) {
  const { steps } = appState
  const folderFiles = [
    { step: '3', folder: '01-research', file: 'pmt-research.md' },
    { step: '4', folder: '02-brief', file: 'product-brief.md' },
    { step: '5a', folder: '03-products', file: 'build-manifest.md' },
    { step: '5e', folder: '04-buyer-instructions', file: 'buyer-instructions.md' },
    { step: '6a', folder: '05-thumbnails', file: 'thumbnail-briefs.md' },
    { step: '6b', folder: '06-promo-video', file: 'video-script.md' },
    { step: '7', folder: '07-seo', file: 'seo-package.md' },
    { step: '8', folder: '08-listing', file: 'etsy-listing-package.md' },
  ]

  return (
    <div className="px-5 py-3 border-t border-dta-dark/10">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-dta-dark/50 mb-2">
        Product Folder
      </h3>
      <div className="space-y-1">
        {folderFiles.map(({ step, folder, file }) => {
          const saved = steps[step]?.savedToFolder
          return (
            <div key={step} className="flex items-center gap-2 text-xs">
              <span className={saved ? 'text-dta-green' : 'text-dta-dark/20'}>
                {saved ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                )}
              </span>
              <span className="text-dta-dark/40 font-mono">{folder}/</span>
              <span className={saved ? 'text-dta-dark/70' : 'text-dta-dark/30'}>{file}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
