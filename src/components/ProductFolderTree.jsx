export default function ProductFolderTree({ appState }) {
  const { steps, runMeta } = appState

  const folderStructure = [
    { folder: '01-research',          files: [{ name: 'pmt-research.md',         step: '3' }] },
    { folder: '02-brief',             files: [{ name: 'product-brief.md',        step: '4' }] },
    { folder: '03-products',          files: [
      { name: 'build-manifest.md', step: '5a' },
      { name: 'product-file-1',    step: '5b' },
      { name: 'product-file-2',    step: '5c' },
      { name: 'product-files-n',   step: '5d' },
    ]},
    { folder: '04-buyer-instructions', files: [{ name: 'buyer-instructions.md', step: '5e' }] },
    { folder: '05-thumbnails',        files: [{ name: 'thumbnail-briefs.md',     step: '6a' }] },
    { folder: '06-promo-video',       files: [{ name: 'video-script.md',         step: '6b' }] },
    { folder: '07-seo',              files: [{ name: 'seo-package.md',           step: '7' }] },
    { folder: '08-listing',          files: [{ name: 'etsy-listing-package.md',  step: '8' }] },
  ]

  return (
    <div className="text-xs font-mono">
      <div className="text-dta-dark font-semibold mb-1">
        {runMeta.productFolderPath || '[Product Folder]'}/
      </div>
      {folderStructure.map(({ folder, files }) => (
        <div key={folder} className="ml-3 mb-1">
          <div className="text-dta-dark/50">{folder}/</div>
          {files.map(({ name, step }) => {
            const saved = steps[step]?.savedToFolder
            return (
              <div key={step} className="ml-3 flex items-center gap-1.5">
                <span className={saved ? 'text-dta-green' : 'text-dta-dark/20'}>
                  {saved ? '\u2713' : '\u25CB'}
                </span>
                <span className={saved ? 'text-dta-dark/70' : 'text-dta-dark/30'}>{name}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
