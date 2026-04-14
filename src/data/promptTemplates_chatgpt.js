/**
 * ChatGPT-specific prompt overrides for Phase B — Section 8
 * ChatGPT creates files and provides download links
 */

const chatgptOverrides = {
  fileCreation: {
    instruction: 'Create the file and provide a download link.',
    spreadsheet: 'Create an Excel (.xlsx) workbook with all tabs, formulas, dropdowns, and sample data.',
    pdf: 'Generate a formatted PDF document with all pages and content.',
    output: 'Generate the downloadable file, no code blocks.',
  },
  canva: {
    instruction: 'Provide exact Canva specs I can execute manually.',
    thumbnail: 'Generate detailed thumbnail specifications with exact text, colors, and Canva template search terms.',
  },
}

export default chatgptOverrides
