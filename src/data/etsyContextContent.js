/**
 * Right-panel help text for each step — Section 7 of build spec
 */

const etsyContextContent = {
  '1': {
    heading: 'Where This Lands on Etsy: Category Selection',
    etsyFields: ['Category path'],
    sections: [
      {
        title: 'How Niche Selection Impacts Etsy',
        body: 'Your niche determines your Etsy category path, which directly affects search placement. Specific niches like "retirement digital organization for corporate professionals" place you in lower-competition categories compared to broad terms like "retirement planning."',
      },
      {
        title: 'Example Category Paths',
        body: 'Planner Templates > Digital Planners > Life Transition\nTemplates > Spreadsheet Templates > Organization\nDigital Products > Printable Planners',
      },
    ],
    tip: 'A well-defined niche means your product appears in specific, lower-competition Etsy categories rather than broad, saturated ones.',
  },
  '2': {
    heading: 'Setting Up Your Tools',
    etsyFields: [],
    sections: [
      {
        title: 'AI Provider Requirements',
        body: 'Claude Pro ($20/mo) — Best Canva MCP integration, direct file generation.\nChatGPT Plus ($20/mo) — Strong file generation, broad plugin ecosystem.\nGemini Advanced ($20/mo) — Google Workspace native integration.',
      },
      {
        title: 'Connecting Canva',
        body: 'For Claude: Settings > Connected Apps > Canva.\nFor ChatGPT: Settings > Connected Apps > Canva.\nFor Gemini: Settings > Extensions > Canva.\nA paid Canva Pro plan is required for Brand Kit access.',
      },
      {
        title: 'Brand Kit Confirmation',
        body: 'A Brand Kit in Canva stores your brand colors, fonts, and logos. It ensures all AI-created materials maintain consistent branding. Run the test prompt to verify your kit is accessible.',
      },
      {
        title: 'Product Folder',
        body: 'The Product Folder is created on your local drive and stores all artifacts from this pipeline run: research reports, product briefs, product files, thumbnails, and listing packages.',
      },
    ],
    tip: 'Each AI provider requires a paid plan for full file generation capabilities.',
  },
  '3': {
    heading: 'Understanding the Pain-Mining Triangle (PMT)',
    etsyFields: ['Tags (13 max)', 'Description copy'],
    sections: [
      {
        title: 'Language Mining',
        body: 'Finds exact phrases buyers use in Etsy searches, reviews, and competitor listings. These become your SEO keywords and emotional hooks.',
      },
      {
        title: 'Competitor Review Mining',
        body: 'Analyzes top 10 competitors for pricing patterns, feature gaps, review sentiment, and positioning weaknesses.',
      },
      {
        title: 'AI Synthesis Pass',
        body: 'Identifies underserved sub-niches, unmet needs, and the strongest product opportunity.',
      },
      {
        title: 'Why Niche Definition Matters',
        body: 'Vague niches produce generic PMT output. The more specific your niche, the sharper the competitor analysis and language mining results.',
      },
      {
        title: 'What the PMT Report Produces',
        body: 'A three-section report: Language Mining Results, Competitor Analysis Matrix, and Synthesis with Go/Stop Recommendation. This feeds directly into your Etsy Tags (13 max) and Description copy.',
      },
    ],
    tip: 'Strong language mining = strong SEO. The PMT report is the foundation for everything downstream.',
  },
  '4': {
    heading: 'What Is a Product Brief?',
    etsyFields: ['Title', 'Description opener', 'Description body', 'Price'],
    sections: [
      {
        title: 'The Master Blueprint',
        body: 'The Product Brief is the master blueprint for everything downstream. It defines what you are building, who it is for, what files are included, how it should look, and how it should be priced. Every subsequent step in the factory reads from this brief.',
      },
      {
        title: 'How the Brief Maps to Etsy',
        body: 'Product Name \u2192 Listing Title\nTarget Customer \u2192 Description opener\nFeature List \u2192 Description body & bullet points\nPricing Recommendation \u2192 Price field\nDesign Direction \u2192 Thumbnail style guide',
      },
      {
        title: 'Approving the Brief',
        body: 'Approval locks the brief as the source of truth. Revisions are encouraged before approval \u2014 use the "Request Revision" button to add notes and regenerate. After approval, changes require restarting from Step 4.',
      },
    ],
    tip: 'Take time to review all 10 sections. A strong brief means less rework in Phase B.',
  },
  '5a': {
    heading: 'Your Product File Pipeline',
    etsyFields: ['Digital files delivery section'],
    sections: [
      { title: 'What the Build Manifest Does', body: 'The manifest is your ordered list of every deliverable file to create. Each file gets its own prompt-copy-paste cycle in the following sub-steps, ensuring nothing is missed.' },
      { title: 'Etsy Digital File Requirements', body: 'Max 5 files per listing (bundle extras into a ZIP).\nSupported formats: PDF, XLSX, DOCX, ZIP, PNG, JPG, and more.\nMax file size varies by plan but typically 20MB per file.\nBuyers download files immediately after purchase.' },
      { title: 'Sub-Step Flow', body: 'Step 5b: Primary deliverable (spreadsheet/tracker)\nStep 5c: Secondary deliverable (PDF guide)\nStep 5d: Additional supporting files\nStep 5e: Buyer instructions (READ_ME_FIRST)' },
    ],
    tip: 'Etsy allows max 5 files per listing. Bundle extras into a ZIP.',
  },
  '5b': {
    heading: 'Building Product File 1: Primary Deliverable',
    etsyFields: ['Digital files list', 'File format guidance'],
    sections: [
      { title: 'Creating vs. Describing', body: 'CRITICAL CHANGE from v1: This prompt instructs the AI to CREATE the actual product file \u2014 not describe it. The AI generates real spreadsheets with formulas, complete PDFs with all pages, or finished documents with full content.' },
      { title: 'Spreadsheet Tips', body: 'Verify all tabs are present\nCheck formulas calculate correctly\nTest dropdown menus and data validation\nReview sample data for accuracy\nConfirm formatting (colors, fonts, borders)' },
      { title: 'Provider Differences', body: 'Claude: Generates .xlsx files directly via tools\nChatGPT: Creates files and provides a download link\nGemini: Creates in Google Sheets and shares a link' },
    ],
    tip: 'Save the AI-generated file directly to your Product Folder. Test it before advancing.',
  },
  '5c': {
    heading: 'Building Product File 2: Guide/PDF',
    etsyFields: ['Digital files list'],
    sections: [
      { title: 'PDF Guide Best Practices', body: 'Include a title page with product branding\nAdd a table of contents for navigation\nWrite complete body copy for every section\nUse callout boxes for key tips and warnings\nEnd with a closing page linking to your shop' },
      { title: 'Quality Checklist', body: 'All pages render correctly (no blank pages)\nText is readable and properly formatted\nImages/graphics are high resolution\nLinks within the document work\nFile size is under 20MB' },
    ],
    tip: 'Check that all pages render correctly. Blank pages are a common buyer complaint.',
  },
  '5d': {
    heading: 'Building Supporting Files',
    etsyFields: ['Digital files list'],
    sections: [
      { title: 'Supporting Deliverables', body: 'These are bonus or supplementary files from your Build Manifest: checklists, templates, resource lists, quick-start cards, or additional worksheets.' },
      { title: 'File Naming Convention', body: 'Use clear, descriptive filenames buyers can understand at a glance. Ensure filenames match what your buyer instructions reference. Example: "Weekly-Planner-Template.xlsx" not "file3.xlsx"' },
      { title: 'If No Additional Files', body: 'If your product has only 2 deliverable files, simply paste a note confirming all files are complete and advance to buyer instructions.' },
    ],
    tip: 'Ensure file names match what your buyer instructions reference.',
  },
  '5e': {
    heading: 'Buyer Instructions: READ_ME_FIRST',
    etsyFields: ['Item description (buyer-facing)', 'Digital file delivery'],
    sections: [
      { title: 'What Buyers See', body: 'The READ_ME_FIRST document is the first thing buyers open after purchase. It sets expectations, provides setup guidance, and reduces support requests. This is your chance to deliver an exceptional onboarding experience.' },
      { title: 'Required Sections', body: 'Page 1: Welcome + contents list\nPage 2: Getting started + setup steps\nPage 3: Customization guide\nPage 4: Implementation strategy\nPage 5: FAQ + support + thank you' },
      { title: 'Why This Matters', body: 'Good buyer instructions directly impact:\n\u2022 Star ratings (clear setup = happy buyers)\n\u2022 Refund rates (confusion = refund requests)\n\u2022 Review quality (specific praise vs. generic)' },
    ],
    tip: 'Good buyer instructions reduce refund requests and increase positive reviews.',
  },
  '6a': {
    heading: 'Etsy Thumbnail Requirements',
    etsyFields: ['Photo & Video section (20 photos max)'],
    sections: [
      { title: 'Image Specifications', body: '2000x2000px recommended (square format)\nJPG or PNG format\nUp to 20 images per listing\nFirst image = hero (shown in search results)\nRGB color mode, sRGB color space' },
      { title: 'Thumbnail Strategy', body: 'Image 1 (Hero): Most eye-catching, shows product title + main value prop\nImages 2-4: Feature showcase (individual pages/tabs)\nImages 5-7: Mockups on devices (laptop, tablet, phone)\nImages 8-10: Detail shots, testimonials, comparison charts' },
      { title: 'Canva Integration', body: 'Claude users: AI creates thumbnails directly in Canva via MCP\nOther providers: AI generates exact specs (text, colors, layout) that you execute manually in Canva using your Brand Kit' },
    ],
    tip: 'Your first thumbnail is the most important \u2014 it determines click-through rate in search.',
  },
  '6b': {
    heading: 'Etsy Video Specifications',
    etsyFields: ['Photo & Video section (1 video max)'],
    sections: [
      { title: 'Video Specs', body: '5-15 seconds recommended for autoplay in search\nMax 100MB file size\nSquare (1:1) or landscape (16:9) format\nSound is optional but adds engagement\nAutoplay is silent \u2014 on-screen text is critical' },
      { title: 'Script Structure', body: 'Opening hook (0-3s): Stop the scroll\nProblem statement (3-6s): Buyer pain point\nFeature showcase (6-18s): 3-4 product shots\nBenefit/social proof (18-22s): Transformation\nCTA with price (22-27s): Shop Now + urgency' },
      { title: 'CapCut Tips', body: 'The script includes CapCut-specific instructions: text animation styles, zoom percentages, pan directions, and speed ramps. Open CapCut and follow the shot list step by step.' },
    ],
    tip: 'Autoplay videos in search results significantly increase engagement and click-through rates.',
  },
  '7': {
    heading: 'Etsy SEO Mechanics',
    etsyFields: ['Title (140 chars)', 'Tags (13 max, 20 chars each)', 'Description (first 160 chars in search)'],
    sections: [
      { title: 'SEO Strategy', body: 'Long-tail keywords perform best on Etsy. Avoid repeated words across tags. Never use single-word tags. The first 160 characters of your description appear in search results.' },
    ],
    tip: 'The first 160 characters of your description appear in Etsy search results.',
  },
  '8': {
    heading: 'Listing Assembly',
    etsyFields: ['All Etsy listing fields'],
    sections: [
      { title: 'Final Assembly', body: 'Combines your Product Brief, SEO Package, and all generated content into a complete Etsy-ready listing with every field populated.' },
    ],
    tip: 'Review every field before publishing. Missing fields can hurt search visibility.',
  },
  '9': {
    heading: 'Digital File Delivery Testing',
    etsyFields: ['Digital file delivery'],
    sections: [
      { title: 'Verification Checklist', body: 'Verify all product files open correctly, formulas work, PDFs render, buyer instructions reference correct filenames, and ZIP bundles extract cleanly.' },
    ],
    tip: 'Test downloads on a different device if possible.',
  },
  '10': {
    heading: 'Pricing & Settings',
    etsyFields: ['Price', 'Quantity', 'Variations'],
    sections: [
      { title: 'Settings', body: 'Set quantity to 999 for digital products. Confirm pricing aligns with competitor research. Set renewal to Automatic.' },
    ],
    tip: 'Automatic renewal is recommended for digital products.',
  },
  '11': {
    heading: 'Final Etsy Listing Preview',
    etsyFields: ['All fields \u2014 full form preview'],
    sections: [
      { title: 'Final Review', body: 'Review every section of your Etsy listing before publishing. This preview mirrors the actual Etsy listing editor with all tabs populated from your factory data.' },
    ],
    tip: 'Use "Copy All to Clipboard" to paste directly into Etsy.',
  },
}

export default etsyContextContent
