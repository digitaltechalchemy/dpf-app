/**
 * Gemini-specific prompt overrides for Phase B — Section 8
 * Gemini creates in Google Sheets/Docs and shares links
 */

const geminiOverrides = {
  fileCreation: {
    instruction: 'Create in Google Sheets/Docs and share the link.',
    spreadsheet: 'Create a Google Sheets document with all tabs, formulas, dropdowns, and sample data.',
    pdf: 'Create a Google Doc formatted as the final PDF with all pages and content.',
    output: 'Create the document and share the link when complete.',
  },
  canva: {
    instruction: 'Provide exact Canva specs I can execute manually.',
    thumbnail: 'Generate detailed thumbnail specifications with exact text, colors, and Canva template search terms.',
  },
}

export default geminiOverrides
