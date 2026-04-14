import { STEPS } from '../data/stepConfig'
import Step01_NicheID from '../steps/Step01_NicheID'
import Step02_Prerequisites from '../steps/Step02_Prerequisites'
import Step03_PMTResearch from '../steps/Step03_PMTResearch'
import Step04_ProductBrief from '../steps/Step04_ProductBrief'
import Step05a_BuildManifest from '../steps/Step05a_BuildManifest'
import Step05b_ProductFile1 from '../steps/Step05b_ProductFile1'
import Step05c_ProductFile2 from '../steps/Step05c_ProductFile2'
import Step05d_ProductFileN from '../steps/Step05d_ProductFileN'
import Step05e_BuyerInstructions from '../steps/Step05e_BuyerInstructions'
import Step06a_Thumbnails from '../steps/Step06a_Thumbnails'
import Step06b_PromoVideo from '../steps/Step06b_PromoVideo'
import Step07_SEOPackage from '../steps/Step07_SEOPackage'
import Step08_ListingAssembly from '../steps/Step08_ListingAssembly'
import Step09_LinkVerify from '../steps/Step09_LinkVerify'
import Step10_PricingCheck from '../steps/Step10_PricingCheck'
import Step11_EtsyPreview from '../steps/Step11_EtsyPreview'

const STEP_COMPONENTS = {
  '1': Step01_NicheID,
  '2': Step02_Prerequisites,
  '3': Step03_PMTResearch,
  '4': Step04_ProductBrief,
  '5a': Step05a_BuildManifest,
  '5b': Step05b_ProductFile1,
  '5c': Step05c_ProductFile2,
  '5d': Step05d_ProductFileN,
  '5e': Step05e_BuyerInstructions,
  '6a': Step06a_Thumbnails,
  '6b': Step06b_PromoVideo,
  '7': Step07_SEOPackage,
  '8': Step08_ListingAssembly,
  '9': Step09_LinkVerify,
  '10': Step10_PricingCheck,
  '11': Step11_EtsyPreview,
}

const PHASE_BADGES = {
  A: { label: 'Phase A', bg: 'bg-dta-green' },
  B: { label: 'Phase B', bg: 'bg-dta-orange' },
  C: { label: 'Phase C', bg: 'bg-dta-green' },
  D: { label: 'Phase D', bg: 'bg-dta-dark' },
}

const STATUS_PILLS = {
  locked: { label: 'Locked', cls: 'bg-gray-200 text-gray-500' },
  available: { label: 'Available', cls: 'bg-dta-light text-dta-dark' },
  in_progress: { label: 'In Progress', cls: 'bg-dta-orange/20 text-dta-orange' },
  complete: { label: 'Complete', cls: 'bg-dta-green/20 text-dta-green' },
}

export default function StepPanel({ currentStep, appState, onStateChange }) {
  const stepConfig = STEPS[currentStep]
  if (!stepConfig) return null

  const stepState = appState.steps[currentStep] || { status: 'locked' }
  const phase = PHASE_BADGES[stepConfig.phase]
  const statusPill = STATUS_PILLS[stepState.status] || STATUS_PILLS.locked
  const StepComponent = STEP_COMPONENTS[currentStep]

  // Step 11 uses full-width layout (no header)
  if (currentStep === '11' && StepComponent) {
    return (
      <div className="h-full overflow-hidden flex flex-col">
        <div className="p-5 border-b border-dta-dark/10 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`${phase.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>{phase.label}</span>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusPill.cls}`}>{statusPill.label}</span>
          </div>
          <h2 className="text-lg font-bold text-dta-dark">
            <span className="text-dta-dark/40 mr-1.5">Step 11:</span>Etsy Listing Preview
          </h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <StepComponent appState={appState} onStateChange={onStateChange} />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-5 border-b border-dta-dark/10">
        <div className="flex items-center gap-2 mb-2">
          <span className={`${phase.bg} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase`}>{phase.label}</span>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusPill.cls}`}>{statusPill.label}</span>
        </div>
        <h2 className="text-lg font-bold text-dta-dark">
          <span className="text-dta-dark/40 mr-1.5">Step {currentStep}:</span>
          {stepConfig.title}
        </h2>
      </div>
      {StepComponent ? (
        <StepComponent appState={appState} onStateChange={onStateChange} />
      ) : (
        <div className="p-5">
          <div className="bg-dta-light/50 border border-dta-green/20 rounded-lg p-6 text-center">
            <p className="text-sm text-dta-dark/60">Step content not available.</p>
          </div>
        </div>
      )}
    </div>
  )
}
