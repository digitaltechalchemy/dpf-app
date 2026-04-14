import CreativeStepShell from '../components/CreativeStepShell'
import { buildPrompt } from '../utils/promptBuilder'
import promptTemplates from '../data/promptTemplates'

const PROVIDER_PROMPTS = {
  claude: (brandKitName, brandKitId) =>
    `Using my Brand Kit [${brandKitName}]${brandKitId ? ` (ID: ${brandKitId})` : ''}, create 10 Etsy product listing thumbnails for the product described in the Product Brief below. Each thumbnail should be 2000x2000px. Create them directly in Canva.

For each thumbnail:
- Apply brand colors and fonts from the Brand Kit
- Include product title text overlay
- Show mockup composition appropriate for a digital product
- Use professional, clean layout optimized for Etsy search results
- The first thumbnail should be the hero image (most eye-catching)

Generate all 10 in Canva now.`,

  chatgpt: () =>
    `Generate 10 thumbnail creative specifications for the product described in the Product Brief below. Each thumbnail should be designed for 2000x2000px on Etsy.

For each of the 10 thumbnails, provide:
1. EXACT title text overlay copy (the text that appears on the image)
2. EXACT subtitle text (secondary text on the image)
3. Background description (color, gradient, or image concept)
4. Layout composition (centered, left-aligned, split, grid, etc.)
5. Canva template search term to use as a starting point
6. Color hex codes from the brand palette to use
7. Mockup style (laptop screen, tablet, flat lay, etc.)

Format as a numbered list I can execute in Canva step by step. The first thumbnail should be the hero image for Etsy search results.`,

  gemini: () =>
    `Generate 10 thumbnail creative specifications for the product described in the Product Brief below. Each thumbnail should be designed for 2000x2000px on Etsy.

For each of the 10 thumbnails, provide:
1. EXACT title text overlay copy
2. EXACT subtitle text
3. Background description
4. Layout composition
5. Canva template search term
6. Color hex codes from the brand palette
7. Mockup style

Format as a numbered list. The first thumbnail is the hero image.`,
}

export default function Step06a_Thumbnails({ appState, onStateChange }) {
  const provider = appState.runMeta.aiProvider
  const { brandKitName, brandKitId } = appState.runMeta

  const contextPrompt = buildPrompt(promptTemplates['6a'], appState)
  const providerBlock = PROVIDER_PROMPTS[provider]
    ? (typeof PROVIDER_PROMPTS[provider] === 'function'
        ? PROVIDER_PROMPTS[provider](brandKitName, brandKitId)
        : PROVIDER_PROMPTS[provider])
    : PROVIDER_PROMPTS.chatgpt()

  const prompt = `${providerBlock}\n\nPRODUCT BRIEF:\n${contextPrompt}`

  return (
    <CreativeStepShell
      stepId="6a"
      nextStepId="6b"
      description={
        provider === 'claude'
          ? 'Claude will create 10 Etsy thumbnails directly in Canva using your Brand Kit. Paste confirmation when complete.'
          : 'Generate thumbnail specifications you can execute in Canva. Each spec includes exact text overlays, compositions, and Canva search terms.'
      }
      prompt={prompt}
      pasteLabel={provider === 'claude' ? 'Paste Canva confirmation' : 'Paste thumbnail specifications'}
      saveSubfolder="05-thumbnails"
      saveFilename="thumbnail-briefs.md"
      appState={appState}
      onStateChange={onStateChange}
    >
      {provider === 'claude' && (
        <div className="p-3 bg-dta-green/10 border border-dta-green/20 rounded-lg">
          <p className="text-xs text-dta-dark/80">
            <span className="font-semibold text-dta-green">Canva MCP: </span>
            Claude will use its Canva integration to create designs directly in your account using your Brand Kit.
          </p>
        </div>
      )}
      {provider !== 'claude' && (
        <div className="p-3 bg-dta-orange/10 border border-dta-orange/20 rounded-lg">
          <p className="text-xs text-dta-dark/80">
            <span className="font-semibold text-dta-orange">Manual Canva: </span>
            The AI will provide exact specifications. Open Canva and create each thumbnail following the specs.
          </p>
        </div>
      )}
    </CreativeStepShell>
  )
}
