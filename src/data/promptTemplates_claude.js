/**
 * Claude-specific prompt overrides for Phase B — Section 8
 * Claude generates files directly via tools and uses Canva MCP
 */

const claudeOverrides = {
  fileCreation: {
    instruction: 'Generate the file directly using your tools.',
    spreadsheet: 'Create an Excel (.xlsx) workbook with all tabs, formulas, dropdowns, and sample data.',
    pdf: 'Generate a formatted PDF document with all pages and content.',
    output: 'Output the file directly, no code blocks.',
  },
  canva: {
    instruction: 'Use Canva MCP to create designs directly in my Canva account.',
    brandKit: (name, id) => `Use Brand Kit: ${name}${id ? ` (ID: ${id})` : ''} for all designs.`,
    thumbnail: 'Create all 10 thumbnails directly in Canva at 2000x2000px using the Brand Kit.',
  },
}

export default claudeOverrides
