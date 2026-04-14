import { useState } from 'react'
import { STEP_ORDER } from '../data/stepConfig'
import { completeStep } from '../utils/storage'

const TABS = [
  { id: 'photos', label: 'Photo & Video' },
  { id: 'category', label: 'Category' },
  { id: 'details', label: 'Item Details' },
  { id: 'options', label: 'Item Options' },
  { id: 'pricing', label: 'Pricing & Shipping' },
  { id: 'made', label: "How It's Made" },
  { id: 'settings', label: 'Settings' },
]

export default function Step11_EtsyPreview({ appState, onStateChange }) {
  const [activeTab, setActiveTab] = useState('photos')
  const [etsyUrl, setEtsyUrl] = useState('')
  const [showCelebration, setShowCelebration] = useState(false)
  const isComplete = appState.steps['11']?.status === 'complete'

  const seo = appState.steps['7']?.aiOutput || ''
  const listing = appState.steps['8']?.aiOutput || ''
  const brief = appState.steps['4']?.aiOutput || ''
  const { steps, runMeta } = appState

  function extractField(text, label) {
    const re = new RegExp(`${label}[:\\s]*([^\\n]+)`, 'i')
    const m = text.match(re)
    return m ? m[1].trim() : ''
  }

  const title = extractField(seo, 'Title') || extractField(listing, 'Title') || extractField(brief, 'Product Name') || 'Untitled Product'
  const description = extractField(seo, 'Description') || extractField(listing, 'Description') || ''
  const price = extractField(brief, 'Pricing Recommendation') || extractField(listing, 'Price') || ''

  // Extract tags from SEO output
  const tagsRaw = seo.match(/tags?[:\s]*([^\n]+(?:\n(?!\n)[^\n]+)*)/i)?.[1] || ''
  const tags = tagsRaw.split(/[,\n]/).map(t => t.replace(/^\d+\.\s*/, '').trim()).filter(t => t && t.length <= 25).slice(0, 13)

  function copyAll() {
    const text = `ETSY LISTING PACKAGE\n\nTitle: ${title}\n\nTags: ${tags.join(', ')}\n\nDescription:\n${description}\n\nPrice: ${price}\n\nFull Listing:\n${listing}`
    navigator.clipboard.writeText(text)
  }

  function handleMarkComplete() {
    const newState = completeStep(appState, '11', null)
    newState.steps['11'].inputs = { etsyUrl }
    onStateChange(newState)
    setShowCelebration(true)
  }

  const completedSteps = STEP_ORDER.filter(id => steps[id]?.status === 'complete').length
  const totalSteps = STEP_ORDER.length

  const folderFiles = [
    { step: '3', folder: '01-research', file: 'pmt-research.md' },
    { step: '4', folder: '02-brief', file: 'product-brief.md' },
    { step: '5a', folder: '03-products', file: 'build-manifest.md' },
    { step: '5b', folder: '03-products', file: 'product-file-1' },
    { step: '5c', folder: '03-products', file: 'product-file-2' },
    { step: '5e', folder: '04-buyer-instructions', file: 'buyer-instructions.md' },
    { step: '6a', folder: '05-thumbnails', file: 'thumbnail-briefs.md' },
    { step: '6b', folder: '06-promo-video', file: 'video-script.md' },
    { step: '7', folder: '07-seo', file: 'seo-package.md' },
    { step: '8', folder: '08-listing', file: 'etsy-listing-package.md' },
  ]

  if (showCelebration) {
    return (
      <div className="p-8 text-center space-y-6">
        <div className="text-6xl">&#127881;</div>
        <h2 className="text-2xl font-bold text-dta-green">Run Complete!</h2>
        <p className="text-sm text-dta-dark/70 max-w-md mx-auto">
          Your Digital Product Factory run for <strong>{runMeta.nicheName || 'your product'}</strong> is complete.
          All {totalSteps} steps finished. Your Product Folder contains everything you need to publish on Etsy.
        </p>
        {etsyUrl && (
          <p className="text-xs text-dta-dark/50">Listing URL: {etsyUrl}</p>
        )}
        <button
          onClick={() => setShowCelebration(false)}
          className="px-4 py-2 text-sm text-dta-dark/50 hover:text-dta-dark"
        >
          Back to preview
        </button>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tab Bar */}
      <div className="flex border-b border-dta-dark/10 overflow-x-auto flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-dta-orange text-dta-orange'
                : 'border-transparent text-dta-dark/50 hover:text-dta-dark/70'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'photos' && (
          <TabSection title="Photo & Video">
            <FieldRow label="Thumbnails" value={steps['6a']?.savedToFolder ? 'Saved to 05-thumbnails/' : 'Not yet saved'} ok={steps['6a']?.savedToFolder} />
            <FieldRow label="Promo Video Script" value={steps['6b']?.savedToFolder ? 'Saved to 06-promo-video/' : 'Not yet saved'} ok={steps['6b']?.savedToFolder} />
            <p className="text-xs text-dta-dark/40 mt-2">Etsy allows up to 20 photos and 1 video per listing.</p>
          </TabSection>
        )}

        {activeTab === 'category' && (
          <TabSection title="Category">
            <FieldRow label="Category Path" value={extractField(seo, 'Category') || extractField(listing, 'Category') || 'See SEO Package'} />
            <FieldRow label="Item Type" value="Digital files" ok />
            <FieldRow label="When Made" value="Made to order / 2020-present" />
          </TabSection>
        )}

        {activeTab === 'details' && (
          <TabSection title="Item Details">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-medium text-dta-dark/50">Title</span>
                  <span className={`text-[10px] font-mono ${title.length > 140 ? 'text-red-500' : 'text-dta-dark/30'}`}>
                    {title.length}/140
                  </span>
                </div>
                <div className="p-3 bg-white border border-dta-dark/15 rounded-lg text-sm text-dta-dark">
                  {title}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-dta-dark/50 block mb-1">Tags ({tags.length}/13)</span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.length > 0 ? tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-dta-green/10 text-dta-green px-2 py-0.5 rounded-full border border-dta-green/20">
                      {tag} <span className="text-dta-green/40">{tag.length}</span>
                    </span>
                  )) : (
                    <span className="text-xs text-dta-dark/30 italic">Tags from SEO Package will appear here</span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-dta-dark/50 block mb-1">Description preview (first 160 chars)</span>
                <div className="p-3 bg-white border border-dta-dark/15 rounded-lg text-sm text-dta-dark/70">
                  {description ? description.slice(0, 160) : <span className="italic text-dta-dark/30">Description from listing assembly</span>}
                  {description.length > 160 && '...'}
                </div>
              </div>
            </div>
          </TabSection>
        )}

        {activeTab === 'options' && (
          <TabSection title="Item Options">
            <FieldRow label="Variations" value={extractField(brief, 'Variations') || 'None (single product)'} />
            <FieldRow label="Personalization" value="Not applicable" />
          </TabSection>
        )}

        {activeTab === 'pricing' && (
          <TabSection title="Pricing & Shipping">
            <FieldRow label="Price" value={price || 'See Product Brief'} />
            <FieldRow label="Quantity" value="999" ok />
            <FieldRow label="SKU" value={runMeta.nicheName ? runMeta.nicheName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'auto-generated'} />
            <div className="mt-3">
              <span className="text-xs font-medium text-dta-dark/50 block mb-1.5">Digital Files</span>
              {folderFiles.filter(f => ['5b','5c','5d','5e'].includes(f.step)).map(f => (
                <div key={f.step} className="flex items-center gap-2 text-xs mb-1">
                  <span className={steps[f.step]?.savedToFolder ? 'text-dta-green' : 'text-dta-dark/20'}>
                    {steps[f.step]?.savedToFolder ? '\u2713' : '\u25CB'}
                  </span>
                  <span className="text-dta-dark/60">{f.file}</span>
                </div>
              ))}
            </div>
          </TabSection>
        )}

        {activeTab === 'made' && (
          <TabSection title="How It's Made">
            <FieldRow label="Who made it" value="I did" ok />
            <FieldRow label="What is it" value="A finished product" ok />
          </TabSection>
        )}

        {activeTab === 'settings' && (
          <TabSection title="Settings">
            <FieldRow label="Shop Section" value={extractField(listing, 'Shop Section') || 'Assign in Etsy'} />
            <FieldRow label="Feature Listing" value="Optional" />
            <FieldRow label="Renewal" value="Automatic (recommended)" ok />
          </TabSection>
        )}
      </div>

      {/* Product Folder Summary */}
      <div className="border-t border-dta-dark/10 p-4 bg-dta-ivory/50 flex-shrink-0">
        <h3 className="text-xs font-semibold text-dta-dark/50 uppercase tracking-wider mb-2">Product Folder Readiness</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          {folderFiles.map(f => (
            <span key={f.step} className={`text-xs flex items-center gap-1 ${steps[f.step]?.savedToFolder ? 'text-dta-green' : 'text-dta-dark/25'}`}>
              {steps[f.step]?.savedToFolder ? '\u2713' : '\u25CB'} {f.file}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={copyAll}
            className="px-4 py-2 text-xs font-medium bg-dta-dark text-white rounded-lg hover:bg-dta-dark/90">
            Copy All to Clipboard
          </button>
          <a href="https://www.etsy.com/your/shops/me/listing-editor/create" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-medium bg-dta-orange text-white rounded-lg hover:bg-dta-orange/90 inline-flex items-center gap-1">
            Open Etsy Listing Editor
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Mark Run Complete */}
        {!isComplete && (
          <div className="mt-4 pt-3 border-t border-dta-dark/10">
            <label className="block text-xs font-medium text-dta-dark/50 mb-1">Etsy Listing URL (optional)</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-dta-dark/20 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-dta-green/50"
              placeholder="https://www.etsy.com/listing/..."
              value={etsyUrl}
              onChange={e => setEtsyUrl(e.target.value)}
            />
            <button onClick={handleMarkComplete}
              className="px-5 py-2.5 text-sm font-semibold bg-dta-green text-white rounded-lg hover:bg-dta-green/90">
              Mark Run Complete
            </button>
          </div>
        )}

        {isComplete && (
          <div className="mt-3 flex items-center gap-2 text-sm text-dta-green font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Run complete — {completedSteps}/{totalSteps} steps
          </div>
        )}
      </div>
    </div>
  )
}

function TabSection({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-dta-dark mb-3">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function FieldRow({ label, value, ok }) {
  return (
    <div className="flex items-start gap-3 p-2.5 bg-white border border-dta-dark/10 rounded-lg">
      {ok !== undefined && (
        <span className={`text-sm flex-shrink-0 mt-0.5 ${ok ? 'text-dta-green' : 'text-dta-dark/20'}`}>
          {ok ? '\u2713' : '\u25CB'}
        </span>
      )}
      <div className="min-w-0">
        <span className="text-xs text-dta-dark/50 block">{label}</span>
        <span className="text-sm text-dta-dark break-words">{value}</span>
      </div>
    </div>
  )
}
