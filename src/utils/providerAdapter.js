/**
 * AI provider prompt modifier — Section 8
 * Provides provider-specific file creation instructions for Phase B steps
 */

const PROVIDER_MODS = {
  claude: {
    fileInstruction: 'Generate the file directly using your tools.',
    canvaInstruction: 'Use Canva MCP to create designs in my Brand Kit.',
    spreadsheetFormat: 'Create an Excel (.xlsx) workbook with all tabs, formulas, and formatting.',
    pdfGeneration: 'Generate a formatted PDF document with complete layout.',
    brandRef: (name, id) => `Use Brand Kit: ${name}${id ? ` (ID: ${id})` : ''}`,
    outputFormat: 'Output the file directly. Do not wrap output in code blocks.',
  },
  chatgpt: {
    fileInstruction: 'Create the file and provide a download link.',
    canvaInstruction: 'Provide exact Canva specs I can execute manually.',
    spreadsheetFormat: 'Create an Excel (.xlsx) workbook with all tabs, formulas, and formatting.',
    pdfGeneration: 'Generate a formatted PDF document with complete layout.',
    brandRef: () => 'Apply brand colors from the Product Brief.',
    outputFormat: 'Generate the downloadable file. Do not wrap output in code blocks.',
  },
  gemini: {
    fileInstruction: 'Create in Google Sheets/Docs and share the link.',
    canvaInstruction: 'Provide exact Canva specs I can execute manually.',
    spreadsheetFormat: 'Create a Google Sheets document with all tabs, formulas, and formatting.',
    pdfGeneration: 'Create a Google Doc formatted as the final PDF with complete layout.',
    brandRef: () => 'Apply brand colors from the Product Brief.',
    outputFormat: 'Create the document and share the link when complete.',
  },
}

export function getProviderMods(provider) {
  return PROVIDER_MODS[provider] || PROVIDER_MODS.claude
}

export function adaptPrompt(prompt, provider, runMeta) {
  if (!prompt) return ''

  // Phase A/C/D prompts pass through unchanged
  // Phase B steps build their own provider-specific prompts using getProviderMods()
  // This function handles brand kit injection for Phase A prompts
  if (runMeta?.brandKitName) {
    const mods = getProviderMods(provider)
    return `${prompt}\n\n${mods.brandRef(runMeta.brandKitName, runMeta.brandKitId)}`
  }

  return prompt
}
