/**
 * Step configuration: titles, phases, Etsy mappings
 * Section 6 + Section 11.3 of build spec
 */

export const PHASES = {
  A: { name: 'Intelligence Hub', color: 'dta-green', steps: ['1', '2', '3', '4'] },
  B: { name: 'Creative Factory', color: 'dta-orange', steps: ['5a', '5b', '5c', '5d', '5e', '6a', '6b'] },
  C: { name: 'SEO & Listing Machine', color: 'dta-green', steps: ['7', '8'] },
  D: { name: 'Final QA & Publish', color: 'dta-dark', steps: ['9', '10', '11'] },
}

export const STEPS = {
  '1':   { title: 'Niche Identification',     phase: 'A', hasPrompt: false,  hasChecklist: false },
  '2':   { title: 'Prerequisites',            phase: 'A', hasPrompt: true,   hasChecklist: false },
  '3':   { title: 'PMT Research',             phase: 'A', hasPrompt: true,   hasChecklist: false },
  '4':   { title: 'Product Brief',            phase: 'A', hasPrompt: true,   hasChecklist: false },
  '5a':  { title: 'Build Manifest',           phase: 'B', hasPrompt: true,   hasChecklist: false },
  '5b':  { title: 'Product File 1',           phase: 'B', hasPrompt: true,   hasChecklist: false },
  '5c':  { title: 'Product File 2',           phase: 'B', hasPrompt: true,   hasChecklist: false },
  '5d':  { title: 'Product Files 3-N',        phase: 'B', hasPrompt: true,   hasChecklist: false },
  '5e':  { title: 'Buyer Instructions',       phase: 'B', hasPrompt: true,   hasChecklist: false },
  '6a':  { title: 'Thumbnail Creation',       phase: 'B', hasPrompt: true,   hasChecklist: false },
  '6b':  { title: 'Promo Video Script',       phase: 'B', hasPrompt: true,   hasChecklist: false },
  '7':   { title: 'SEO Package',              phase: 'C', hasPrompt: true,   hasChecklist: false },
  '8':   { title: 'Listing Assembly',         phase: 'C', hasPrompt: true,   hasChecklist: false },
  '9':   { title: 'Link & File Verify',       phase: 'D', hasPrompt: false,  hasChecklist: true },
  '10':  { title: 'Pricing & Settings',       phase: 'D', hasPrompt: false,  hasChecklist: true },
  '11':  { title: 'Etsy Listing Preview',     phase: 'D', hasPrompt: false,  hasChecklist: false },
}

export const STEP_ORDER = [
  '1', '2', '3', '4',
  '5a', '5b', '5c', '5d', '5e',
  '6a', '6b',
  '7', '8',
  '9', '10', '11',
]

export function getNextStep(currentStep) {
  const idx = STEP_ORDER.indexOf(currentStep)
  return idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null
}

export function getPrevStep(currentStep) {
  const idx = STEP_ORDER.indexOf(currentStep)
  return idx > 0 ? STEP_ORDER[idx - 1] : null
}
